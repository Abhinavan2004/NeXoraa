import React, { useState , useEffect} from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
import { toast } from 'react-hot-toast'; // Add toast import
import { useNavigate } from 'react-router';
import {
StreamVideo,
StreamVideoClient,
StreamCall,
CallControls,
SpeakerLayout,
StreamTheme,
CallingState,
useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import CallLOader from '../components/CallLOader';
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;



const CallPage = () => {

  const {id:targetId} = useParams();
  const [client , setClient] = useState(null);
  const [call , setCall] = useState(null);
  const [connecting , isConnecting] = useState(true);
  
   const { data: authData, isLoading: isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false
  });
  
  const authUser = authData?.user;
  
   const { data: tokenData } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      const res = await axiosInstance.get("/chat/token");
      return res.data;
    },
    enabled: !!authUser    // ye isliye use kiya bcoz first authUser authenticate hoga then hi ye chat ka function chalega bcoz authquery direct chal deti hai bina kuch hue toh phle authuser check then hi chalega aisa 
  })

  useEffect(() =>{
     if (!authUser || !tokenData?.token || !targetId) {
      return;
    }
    const initCall = async () =>{
      try{
        console.log("Initializing the Stream Video client....");

        const user = {
          id: authUser._id,
          name:authUser.name,
          image:authUser.profilepic 
        }

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token:tokenData.token
        })
        
        const callInstance = videoClient.call("default", targetId);
        await callInstance.join({create:true})
        console.log("Joined call successfully")
        setClient(videoClient);
        setCall(callInstance);
      }
      catch(err){
         console.log("Error in initialising channel" + err);
        toast.error("Could not connect to call. Please try again!!");
        navigate("/");
      }
      finally{
        isConnecting(false);
      }
    }
    initCall() ;
  },[tokenData,authUser, targetId])

 if(isLoading || connecting)return <CallLOader />

  return (
    
<div className="h-screen flex flex-col items-center justify-center">
<div className="relative">
{client && call ? (
<StreamVideo client={client}>
<StreamCall call={call}>
  <CallContent />
</StreamCall>
</StreamVideo>
) : (
<div className="flex items-center justify-center h-full">
<p>Could not initialize call. Please refresh or try again later.</p>
</div>
)}
</div>
</div>  
)
}


const CallContent = () => {
const { useCallCallingState } = useCallStateHooks();
const callingState = useCallCallingState();

const navigate = useNavigate();

if (callingState === CallingState.LEFT) return navigate("/");

return (
<StreamTheme>
<SpeakerLayout />
<CallControls />
</StreamTheme>
);
}
export default CallPage
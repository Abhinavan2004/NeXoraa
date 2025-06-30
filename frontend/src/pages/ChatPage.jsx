import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosInstance from '../lib/axios';
import { StreamChat } from 'stream-chat'; // Use ES6 import instead of require
import ChatLoader from '../components/ChatLoader';
import CallButton from '../components/CallIcon';
import { 
  Channel, 
  Window, 
  MessageInput, 
  Chat, 
  Thread,
  ChannelHeader, 
  MessageList 
} from 'stream-chat-react'; // Import from stream-chat-react, not stream-chat
import { toast } from 'react-hot-toast'; // Add toast import
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {

  const { id: targetId } = useParams();
  const [chatClient, setChatClient] = useState(null);   // for forming connection with stream chat
  const [isLoading, setIsLoading] = useState(true);      // for showing loading animation
  const [channel, setChannel] = useState(null);         // for storing chat channel

  const { data: authData, isLoading: isAuthLoading } = useQuery({
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

  useEffect(() => {
    const inichat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing the Stream chat client....");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser({
          id: authUser._id,
          name: authUser.name,
          image: authUser.profilepic,
        }, tokenData.token)

        
        const channelId = [authUser._id, targetId].sort().join("-"); //authUser._id == first user id && targetId == second user id && we are sorting them to make sure that channel id is always same for both users
                                                                     // mtlb if tu chalu kr ya woh chalu kre toh chat toh same hi khulegi na hogi toh same hi loggo ki beech mein conversation isiliye sorting taki same chat open ho ske

        const currChannel = client.channel("messaging", channelId, {
         members: [authUser._id, targetId],
        });          // for creating a messgaing channel btw two users using that above channelId

await currChannel.watch();

setChatClient(client);
setChannel(currChannel);
                                                                    }
      catch (err) {
        console.log("Error in initialising channel" + err);
        toast.error("Could not connect to chat. Please try again!!");
      }
      finally{
        setIsLoading(false);
      }
    };

    inichat();
  }, [tokenData , authUser , targetId]);

  const handleVideoCall =() =>{
    if(channel){
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      
      channel.sendMessage({
        text: `I have started a Video Call. Join it!!! ${callUrl}`
      });

      toast.success("Video Call link sent successfully");
    }
  };

  if (isLoading || !channel || !chatClient) return <ChatLoader />
  return (
<div className="h-[93vh]">
<Chat client={chatClient}>
<Channel channel={channel}>
<div className="w-full relative">
<CallButton handleVideoCall={handleVideoCall}/>
<Window>
<ChannelHeader />
<MessageList />
<MessageInput focus />
</Window>
</div>
</Channel>
</Chat>
</div>
  )
}

export default ChatPage
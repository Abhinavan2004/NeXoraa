import { QueryClient, useQuery , useMutation } from '@tanstack/react-query';
import React, { useState , useEffect} from 'react';
import { UserIcon } from 'lucide-react';
import axiosInstance from '../lib/axios';
import { Link } from 'react-router';

const HomePage = () => {

  const queryClient = new QueryClient ;
  const [outGoingRequestIDs , setOutGoingRequestIDS] = useState(new Set());


  const { data: friends=[], isLoading: LoadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/friends");
      return response.data;
    }
  });


  const { data: recommendedUsers=[], isLoading: LoadingRecommendedUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/users");
      return response.data;
    }
  });


  const { data: OutGoingFriendReqs=[], isLoading: LoadingOutGoingFriendReqs } = useQuery({
    queryKey: ['OutGoingFriendReqs'],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/users/outgoing-friends-requests");
      return response.data;
    }
  });



  const {mutate:sendRequestMutation , isLoading: LoadingSendRequest} = useMutation({
     mutationFn: async (userId) =>{
      const response = await axiosInstance.post(`/users/friend-request/${userId}`);
      return response.data ;
     }
     })


     

useEffect(() => {
const outgoingIds = new Set()
if(OutGoingFriendReqs && OutGoingFriendReqs. length > 0){
  OutGoingFriendReqs.forEach((req) => {
outgoingIds.add(req.id)
})
  setOutGoingRequestIDS(outgoingIds)
}
}, [OutGoingFriendReqs])

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UserIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>
        
{LoadingFriends ? (
<div className="flex justify-center py-12">
<span className="loading loading-spinner loading-lg" />
</div>
) : friends. length === 0 ? (

<div className="card bg-base-200 p-6 text-center">
<h3 className="font-semibold text-lg mb-2">No friends yet</h3>
<p className="text-base-content opacity-70">
Connect with language partners below to start practicing together!
</p>
</div>

) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
{friends.map((friend) => (
<FriendCard key={friend._id} friend={friend} />
))}

</div>
)}
      </div>
    </div>
  );
};

export default HomePage;
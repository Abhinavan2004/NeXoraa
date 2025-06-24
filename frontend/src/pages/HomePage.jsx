import { QueryClient, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import axiosInstance from '../lib/axios';

const HomePage = () => {

  // const queryClient = QueryClient ;
  // const [outGoingRequestIDs , setOutGoingRequestIDS] = useState({});


  // const { data: friends=[], isLoading: LoadingFriends } = useQuery({
  //   queryKey: ['friends'],
  //   queryFn: async () => {
  //     const response = await axiosInstance.get("/auth/friends");
  //     return response.data;
  //   }
  // });


  // const { data: recommendedUsers=[], isLoading: LoadingRecommendedUsers } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: async () => {
  //     const response = await axiosInstance.get("/auth/users");
  //     return response.data;
  //   }
  // });


  // const { data: OutGoingFriendReqs=[], isLoading: LoadingOutGoingFriendReqs } = useQuery({
  //   queryKey: ['OutGoingFriendReqs'],
  //   queryFn: async () => {
  //     const response = await axiosInstance.get("/auth/users/outgoing-friends-requests");
  //     return response.data;
  //   }
  // });



  // const {mutate:sendRequestMutation , isLoading: LoadingSendRequest} = useMutation({
  //    mutationFn: async (userId) =>{
  //     const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  //     return response.data ;
  //    }
  //    })
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <p>Welcome to the Home Page!</p>
    </div>
  );
};

export default HomePage;
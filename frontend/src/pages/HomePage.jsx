import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { UserIcon, CheckCircleIcon, UserPlusIcon } from 'lucide-react';
import axiosInstance from '../lib/axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outGoingRequestIDs, setOutGoingRequestIDS] = useState(new Set());

  const { data: friends = [], isLoading: LoadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/friends");
      return response.data;
    }
  });

  // FIXED: Remove duplicate query - keep only the better one
  const { data: recommendedUsers = [], isLoading: LoadingRecommendedUsers, error } = useQuery({
    queryKey: ['recommendedUsers'],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/users");
      return response.data;
    },
    onError: (error) => {
      console.error("Error fetching recommended users:", error);
    }
  });

  const { data: OutGoingFriendReqs = [], isLoading: LoadingOutGoingFriendReqs } = useQuery({
    queryKey: ['OutGoingFriendReqs'],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/users/outgoing-friends-requests");
      return response.data;
    }
  });

  const { mutate: sendRequestMutation, isPending: LoadingSendRequest } = useMutation({
    mutationFn: async (userId) => {
      const response = await axiosInstance.post(`/users/friend-request/${userId}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch outgoing requests
      queryClient.invalidateQueries({ queryKey: ['OutGoingFriendReqs'] });
    }
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (OutGoingFriendReqs && OutGoingFriendReqs.length > 0) {
      OutGoingFriendReqs.forEach((req) => {
        // FIXED: Use the correct property name for user ID
        outgoingIds.add(req._id || req.id);
      });
      setOutGoingRequestIDS(outgoingIds);
    }
  }, [OutGoingFriendReqs]);

  const handleSendRequest = (userId) => {
    sendRequestMutation(userId);
    // Optimistically update the UI
    setOutGoingRequestIDS(prev => new Set([...prev, userId]));
  };

  // FriendCard component
  const FriendCard = ({ friend }) => (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300">
      <div className="card-body p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="avatar size-16 rounded-full overflow-hidden">
            <img 
              src={friend.profilepic || "https://avatar.iran.liara.run/public/1"} 
              alt={friend.fullName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{friend.fullName}</h3>
            <p className="text-sm opacity-70">{friend.location}</p>
          </div>
        </div>
        {friend.bio && (
          <p className="text-sm opacity-80">{friend.bio}</p>
        )}
        <div className="flex gap-2 text-xs">
          <span className="badge badge-outline">{friend.nativeLanguage}</span>
          <span className="badge badge-primary">{friend.learningLanguage}</span>
        </div>
      </div>
    </div>
  );

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
        ) : friends.length === 0 ? (
          <div className="card bg-base-200 p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">No Friends yet</h3>
            <p className="text-base-content opacity-70">
              Connect with partners below to start together!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Partners</h2>
                <p className="opacity-70">
                  Discover perfect partners based on your profile
                </p>
              </div>
            </div>
          </div>
          
          {LoadingRecommendedUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"/>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
              <p className="text-base-content opacity-70">
                Check back later for new partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outGoingRequestIDs.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full overflow-hidden">
                          <img 
                            src={user.profilepic || "https://avatar.iran.liara.run/public/1"} 
                            alt={user.fullName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{user.fullName}</h3>
                          <p className="text-sm opacity-70">{user.location}</p>
                        </div>
                      </div>
                      
                      {user.bio && (
                        <p className="text-sm opacity-80 line-clamp-2">{user.bio}</p>
                      )}
                      
                      <div className="flex gap-2 text-xs">
                        <span className="badge badge-outline">{user.nativeLanguage}</span>
                        <span className="badge badge-primary">{user.learningLanguage}</span>
                      </div>
                      
                      <div className="card-actions">
                        {/* FIXED: Use handleSendRequest instead of direct mutation call */}
                        <button
                          className={`btn w-full mt-2 ${
                            hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                          }`}
                          onClick={() => handleSendRequest(user._id)}
                          disabled={hasRequestBeenSent || LoadingSendRequest}
                        >
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon className="size-4 mr-2" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-4 mr-2" />
                              Send Friend Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
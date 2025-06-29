import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
import { UserCheckIcon, BellIcon } from 'lucide-react';

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading, error } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/getFriendRequests");
      return response.data;
    },
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: async (requestId) => {
      const response = await axiosInstance.put(`/user/sendFriendRequests/${requestId}/accept`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingrequest = friendRequests?.incomingreqs || [];
  const acceptedrequest = friendRequests?.acceptedreqs || [];

  console.log("Incoming Requests:", incomingrequest);
  console.log("Accepted Requests:", acceptedrequest);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notifications</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {/* Show message if no requests */}
            {incomingrequest.length === 0 && acceptedrequest.length === 0 && !isLoading && (
              <div className="text-center py-8 text-gray-500">
                <p>No notifications found.</p>
              </div>
            )}

            {/* INCOMING FRIEND REQUESTS */}
            {incomingrequest.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">{incomingrequest.length}</span>
                </h2>

                <div className="space-y-3">
                  {incomingrequest.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="avatar w-14 h-14 rounded-full bg-base-300 flex items-center justify-center">
                              {request.sender?.profilepic ? (
                                <img 
                                  src={request.sender.profilepic} 
                                  alt={request.sender.name || 'User'} 
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-lg font-bold">
                                  {request.sender?.name?.charAt(0) || request.sender?.name?.charAt(0) || '?'}
                                </span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {request.sender?.ame || request.sender?.name || 'Unknown User'}
                              </h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className="badge badge-secondary badge-sm">
                                  Native: {request.sender?.native_language || 'N/A'}
                                </span>
                                <span className="badge badge-outline badge-sm">
                                  Learning: {request.sender?.learning_language || 'N/A'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                          >
                            {isPending ? 'Accepting...' : 'Accept'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACCEPTED REQUESTS NOTIFICATIONS */}
            {acceptedrequest.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                  <span className="badge badge-success ml-2">{acceptedrequest.length}</span>
                </h2>

                <div className="space-y-3">
                  {acceptedrequest.map((notification) => (
                    <div key={notification._id} className="card bg-base-200 shadow-sm">
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          <div className="avatar w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                            {notification.recipient?.profilepic ? (
                              <img
                                src={notification.recipient.profilepic}
                                alt={notification.recipient.name || 'User'}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-bold">
                                {notification.recipient?.name?.charAt(0) || '?'}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {notification.recipient?.name || 'Unknown User'}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.recipient?.name || 'Someone'} accepted your friend request
                            </p>
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
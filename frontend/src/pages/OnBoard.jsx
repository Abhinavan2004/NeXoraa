import { Link, useNavigate } from 'react-router-dom';
import { useMutation , useQueryClient , useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios.js';
import React from 'react'
import { useState } from 'react';
import { CameraIcon } from 'lucide-react';


const OnBoard = () => {
 
const getAuthUser = async () => {
const res = await axiosInstance.get("/auth/me");
return res.data;
}

 const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false
  });

  const [formdata , setFormData] = useState({
    name: authUser? authUser.name : "",
    bio : authUser? authUser.bio : "",
    nativeLanguage: authUser? authUser.nativeLanguage : "",
    learningLanguage: authUser? authUser.learningLanguage : "", 
    location : authUser? authUser.location : "",
    profilepic : authUser? authUser.profilepic : "",
  })


  
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const {mutate:onboard_mutation , isPending ,error} = useMutation({
    mutationFn : async(userData) => {
      const response = await axiosInstance.post("/auth/onboarding", userData);
      return response.data;
    },
    onSuccess : (data) =>{
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      navigate('/'); // Redirect to home page after successful onboarding
    }
  })


  const handleonboard = (e) => {
    e.preventDefault();
    onboard_mutation(formdata);
  }


  if (isLoading) return <PageLoader />;


  return (
<div className="min-h-screen flex justify-center items-center p-4" data-theme="night">
  <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
    <div className="card-body p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>
      <form onSubmit={handleonboard} className="space-y-6">

        {/* PROFILE_PICTURE_BOX */}
        <div className="flex flex-col items-center justify-center space-y-4">
{/* IMAGE PREVIEW */}
<div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formdata.profilepic ? (
                  <img
                    src={formdata.profilepic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>

)}
</div>
</div>
    
            {/* NAME FIELD */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formdata.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* BIO FIELD */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formdata.bio}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full"
                placeholder="Tell us about yourself"
                rows="3"
              />
            </div>

            {/* NATIVE LANGUAGE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Native Language</span>
              </label>
              <input
                type="text"
                name="nativeLanguage"
                value={formdata.nativeLanguage}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Your native language"
                required
              />
            </div>

            {/* LEARNING LANGUAGE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Language You're Learning</span>
              </label>
              <input
                type="text"
                name="learningLanguage"
                value={formdata.learningLanguage}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Language you want to learn"
                required
              />
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={formdata.location}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Your location"
              />
            </div>

            {/* PROFILE PICTURE URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Picture URL</span>
              </label>
              <input
                type="url"
                name="profilepic"
                value={formdata.profilepic}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="https://example.com/your-photo.jpg"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="form-control mt-8">
              <button 
                type="submit" 
                className={`btn btn-primary w-full ${isPending ? 'loading' : ''}`}
                disabled={isPending}
              >
                {isPending ? 'Setting up your profile...' : 'Complete Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnBoard;
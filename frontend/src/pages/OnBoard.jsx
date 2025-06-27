import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios.js';
import React from 'react'
import { useState , useEffect } from 'react';
import { CameraIcon, LoaderIcon, ShipWheelIcon } from 'lucide-react';
import { LANGUAGES } from '../constants/constants.js';
import toast from 'react-hot-toast';



const OnBoard = () => {
 
  const { data: authData, isLoading: isAuthLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry:false
  });

  const authUser = authData?.user; 

  const [formdata, setFormData] = useState({
    name: authUser?.name || "",
    bio: authUser?.bio || "",
    native_Language: authUser?.native_Language || "",
    learning_Language: authUser?.learning_Language || "", 
    location: authUser?.location || "",
    profilepic: authUser?.profilepic || "",
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: onboard_mutation, isPending, error } = useMutation({
    mutationFn: async (userData) => {
      console.log("Sending Data...");
      const response = await axiosInstance.post("/auth/onboarding", userData);
      return response.data;
    },
    
    onSuccess: async (data) => {
      console.log("Onboarding successful:", data);
      toast.success('Profile completed successfully!');     
      // Navigate immediately
      navigate('/');
      
      // Also invalidate to ensure fresh data from server
      // This happens in background after navigation
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      console.log("Error Occurred:" + error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  });

    const [avatarUrl, setAvatarUrl] = useState("");
    const [isAvatarLoading, setIsAvatarLoading] = useState(true);

 useEffect(() => {
    // Generate a random avatar URL
    const randomId = Math.floor(Math.random()*100) + 1;
    const url = `https://avatar.iran.liara.run/public/${randomId}`;
    setAvatarUrl(url);
    setIsAvatarLoading(false);
  }, []);


  const handleonboard = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!formdata.name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!formdata.native_Language) {
      toast.error('Native language is required');
      return;
    }
    if (!formdata.learning_Language) {
      toast.error('Learning language is required');
      return;
    }

    // Check if native and learning languages are the same
    if (formdata.native_Language === formdata.learning_Language) {
      toast.error('Native and learning languages cannot be the same');
      return;
    }

      // Transform the data to match server expectations
    const transformedData = {
      fullName: formdata.name,
      bio: formdata.bio,
      nativeLanguage: formdata.native_Language,
      learningLanguage: formdata.learning_Language,
      location: formdata.location,
      profilepic: formdata.profilepic
    };

    console.log('Form data being submitted:', transformedData); // Debug log
    onboard_mutation(transformedData);
  }
  

  if (isAuthLoading) return <PageLoader />;

  return (
    <div className="min-h-screen flex justify-center items-center p-4" data-theme="night">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>
          <form className="space-y-6">

            {/* PROFILE_PICTURE_BOX */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
 <div className="size-32 rounded-full bg-base-300 overflow-hidden flex items-center justify-center">
{isAvatarLoading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-content opacity-40"></div>
        ) : (
          <img 
            src={avatarUrl} 
            alt="Profile Avatar" 
            className="w-full h-full object-cover" />
        )}
      </div>
      </div>

            {/* NAME FIELD */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formdata.name}
                onChange={(e) => setFormData({ ...formdata, name: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* BIO FIELD */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formdata.bio}
                onChange={(e) => setFormData({ ...formdata, bio: e.target.value })}
                className="textarea textarea-bordered w-full"
                placeholder="Tell us about yourself"
                rows="2"
              />
            </div>

            {/*LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="font-bold label-text">Native Language</span>
                </label>
                <select
                  name="native_Language"
                  value={formdata.native_Language}
                  onChange={(e) => setFormData({ ...formdata, native_Language: e.target.value })}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Your Language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="font-bold label-text">Language You're Learning</span>
                </label>
                <select
                  name="learning_Language"
                  value={formdata.learning_Language}
                  onChange={(e) => setFormData({ ...formdata, learning_Language: e.target.value })}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Your Language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={formdata.location}
                onChange={(e) => setFormData({ ...formdata, location: e.target.value })}
                className="input z-10 input-bordered w-full"
                placeholder="Your location"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="form-control mt-8">
              <button 
                type="button" 
                onClick={handleonboard}
                className={`btn btn-primary w-full ${isPending ? 'loading' : ''}`}
                disabled={isPending}
              >
                {!isPending ? 
                  (<>
                    <ShipWheelIcon className='size-5 mr-2'/>
                    Complete OnBoarding
                  </>) :
                  (<>
                    <LoaderIcon className='size-5 mr-2 animate-spin'/>
                    OnBoarding...
                  </>) 
                }
              </button>
            </div>
  
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnBoard;
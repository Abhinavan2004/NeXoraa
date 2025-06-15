import { Link, useNavigate } from 'react-router-dom';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../lib/axios.js';
import React from 'react'

const OnBoard = () => {
 
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
      const response = await axiosInstance.post("/auth/onboard", userData);
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



  return (
<div>
  
</div>
  );
}

export default OnBoard
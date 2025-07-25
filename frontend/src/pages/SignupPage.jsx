import React from 'react'
import { useState } from 'react'
import { SunSnowIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../lib/axios.js';



const SignupPage = () => {
  const [datacollect, setdatacollect] = useState({
    name: "",
    email: "",
    password: ""
  });


  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate:signup_mutation , isPending , error} = useMutation({
    mutationFn: async (userData) => {
      const response = await axiosInstance.post("/auth/signup", userData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      navigate('/onboarding');
    }
  })

  
  const handSignup = (e) => {
    e.preventDefault();
    signup_mutation(datacollect);
  }

  
  return (
    <div className='h-screen flex justify-center items-center p-4 sm:p-6 md:p-8' data-theme="night">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LEFT SIDE */}

        <div className='w-full lg:w-1/2 p-6 flex flex-col sm:p-8'>
        {/* LOGO */}
        <div className='mb-4 flex justify-start items-center gap-2'>
          <SunSnowIcon className='size-9 text-primary' />
          <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'> NeXoraa</span>       
        </div>

        {/* SIGNUP FORM */}
        <div className='w-full'>
          <form onSubmit={handSignup}>
            <div className='space-y-4'>
              <div>
                <h2 className='text-2xl font-semibold mb-2'>Create an Account</h2>
                <p className='text-sm opacity-80'>Join us to connect with friends and family.</p>
              </div>

              <div className="space-y-3">
                {/* FULL_NAME */}

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Full-Name</span>
                  </label>

                  <input type="text"
                    placeholder="Enter your Full Name"
                    className="input input-bordered w-full"
                    value={datacollect.name}
                    onChange={(e) => setdatacollect({ ...datacollect, name: e.target.value })}
                    required></input>
                </div>

                {/* EMAIL */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>

                  <input type="email"
                    placeholder="Enter your Email"
                    className="input input-bordered w-full"
                    value={datacollect.email}
                    onChange={(e) => setdatacollect({ ...datacollect, email: e.target.value })}
                    required></input>
                </div>

                {/* PASSWORD */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>

                  <input type="password"
                    placeholder="Enter your Password"
                    className="input input-bordered w-full"
                    value={datacollect.password}
                    onChange={(e) => setdatacollect({ ...datacollect, password: e.target.value })}
                    required></input>
                    <p className='text-xs opacity-70 mt-1'>Password must be at least 6 characters long.</p>
                </div>


                {/* ERROR */}
                {error &&
                <div className='alert alert-error mb-4'>
                  <span className='text-sm'>{error.response?.data || "An error occurred. Please try again."}</span>
                </div>
}

                {/* PRIVACY_POLICY*/}
                <div className="form-control w-full">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm" required />
                    <span className="text-xs leading-tight">I agree to the {" "}
                      <span className='text-primary hover:underline'>terms of service</span> and {" "}
                      <span className='text-primary hover:underline'>privacy policy</span>
                    </span>
                  </label>
                </div>
              </div>
              <button className='btn btn-primary w-full' type='submit' disabled={isPending} >{isPending ? "Signing Up..." : "Create Account"}</button>

              <div className='text-center mt-4'>
                <p className='text-sm'>
                  Already have an account?{" "}
                  <Link to="/login" className='text-primary hover:underline'>Login</Link>
                </p>
            </div>
            </div>
          </form>
        </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
<div className="max-w-md p-8">
{/* Illustration */}
<div className="relative aspect-square max-w-sm mx-auto">
 <img src="/signup.png" alt="Language connection illustration" className="w-full h-full" />
</div>

<div className="text-center space-y-3 mt-6">
<h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
<p className=" text-sm opacity-70">
Practice conversations, make friends, and improve your language skills together
</p>
</div>
</div>
</div>
      </div>
    </div>
  )
}

export default SignupPage
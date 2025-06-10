import React from 'react';
import { Routes, Route , Navigate } from 'react-router-dom'; 
import HomePage from './pages/HomePage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import OnBoardPage from './pages/OnBoard.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import toast ,{ Toaster } from 'react-hot-toast';
import axiosInstance from './lib/axios.js';
import { useQuery } from '@tanstack/react-query';


const App = () => {

  const {data:authData, isLoading , error} = useQuery({
      queryKey: ['authUser'],
    queryFn:async () =>{
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    }
  })

const authUser = authData?.user; //(user hi rakha bcoz backend mein bhi user hi hai


  return (
    <div className="text-5xl h-screen" data-theme="dark">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> :<Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/onboard" element={authUser ? <OnBoardPage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={authUser ? <NotificationsPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
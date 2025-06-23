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
import PageLoader from './components/PageLoader.jsx';
import Layout from './components/Layout.jsx';


const App = () => {

  const {data:authData, isLoading} = useQuery({
      queryKey: ['authUser'],
    queryFn:async () =>{
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
  })

const authUser = authData?.user; //(user hi rakha bcoz backend mein bhi user hi hai

if (isLoading) return <PageLoader />;

const isAuthenticated = authUser? true : false;
const isOnboarded = authUser?.isOnBoard; 


  return (
    <div className="h-screen" data-theme="night">
      <Routes>

        <Route path="/" element={
          isAuthenticated && isOnboarded ? 
          (<Layout showSidebars={true}><HomePage /></Layout>) :
           (<Navigate to={!isAuthenticated? "/login" : "/onboarding"}/>) 
          } 
          />


        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />


<Route path="/login" element={
  !isAuthenticated ? <LoginPage /> : 
  (isOnboarded ? <Navigate to="/" /> : <Navigate to="/onboarding" />)
} />     

<Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />


   <Route path="/onboarding" element={
          isAuthenticated ? 
          (!isOnboarded ?
             (<OnBoardPage />) 
              : (<Navigate to="/" />)
              ) : <Navigate to="/login" />} />
        <Route path="/notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />} />
        
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
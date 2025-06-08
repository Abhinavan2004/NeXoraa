import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import OnBoardPage from './pages/OnboardPAge.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import toast, { Toaster } from 'react-hot-toast';


const App = () => {
  const notify = () => toast('Here is your toast.');

  return (
    <div className="text-5xl h-screen" data-theme="valentine">
      App
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboard" element={<OnBoardPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
        <Toaster />
      </Routes>
    </div>
  );
};

export default App;
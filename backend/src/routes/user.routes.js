const express = require('express');
const app = express();
const { myRecommendations, myFriends , sendFriendRequests , acceptFriendRequests , getFriendRequests , OutgoingFriendRequests} = require("../controllers/user.controller.js");
const { authmiddleware } = require('../middleware/auth.middleware.js'); // Changed from 'protected' to 'authMiddleware'
const Router = express.Router();

// Apply the auth middleware to all routes in this router  
Router.use(authmiddleware); 

// Get recommended users
Router.get('/users', myRecommendations);

// Get user's friends - Fixed path to match frontend call
Router.get("/myFriends", myFriends);

// Send friend request
Router.post("/sendFriendRequests/:id", sendFriendRequests);

// Accept friend request
Router.put("/sendFriendRequests/:id/accept", acceptFriendRequests);

// Get incoming friend requests
Router.get("/getFriendRequests", getFriendRequests);

// Get outgoing friend requests - Fixed typo
Router.get("/outgoingFriendRequests", OutgoingFriendRequests);

module.exports = Router;
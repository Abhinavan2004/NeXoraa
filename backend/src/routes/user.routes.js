const express = require('express');
const app = express();
const { myReccommendations, myFriends , sendFriendRequests , acceptFriendRequests , getFriendRequests , OutgoingFriendRequests} = require("../controllers/user.controller.js");
const { authmiddleware } = require('../middleware/auth.middleware.js'); // Changed from 'protected' to 'authMiddleware'
const Router = express.Router();

// Apply the auth middleware to all routes in this router  
app.use(authmiddleware); 

Router.get("/", myReccommendations);

Router.get("/myFriends", myFriends);

Router.post("/sendFriendRequests/:id", sendFriendRequests);

Router.put("/sendFriendRequests/:id/accept", acceptFriendRequests);

Router.get("/getFriendRequests", getFriendRequests);

Router.get("/outgouingFriendRequests" , OutgoingFriendRequests);

module.exports = Router; 
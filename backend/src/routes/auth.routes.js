const express = require('express');
const {logout , login , signup , onboard} = require("../controllers/auth.controller.js");
const router = express.Router();
const { authmiddleware } = require('/Abhinav_Projects/Abhinav_Node/VIDEO_CHAT_SCREEN_APP/backend/middleware/auth.middleware.js'); // Changed from 'protected' to 'authMiddleware'
router.post("/login" , login);

router.post("/logout" , logout);

router.post("/signup" , signup) ;

router.post("/onboarding" , authmiddleware ,onboard);


module.exports = router ;




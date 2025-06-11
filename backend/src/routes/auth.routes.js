const express = require('express');
const {logout , login , signup , onboard} = require("../controllers/auth.controller.js");
const router = express.Router();
const { authmiddleware } = require('../middleware/auth.middleware.js'); // Changed from 'protected' to 'authMiddleware'


router.post("/login" , login);

router.post("/logout" , logout);

router.post("/signup" , signup) ;

router.post("/onboarding" , authmiddleware ,onboard);

router.get("/me" , authmiddleware , (req,res) =>{
    res.status(200).json({success:true , user:req.user});
})

module.exports = router ;




const express = require('express');
const {logout , login , signup} = require("../controllers/auth.controller.js");
const router = express.Router();

router.get("/login" , login);

router.get("/logout" , logout);

router.get("/signup" , signup) ;

module.exports = router ;



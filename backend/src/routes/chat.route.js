const express = require('express');
const Router = express.Router();
const {authmiddleware} = require('../middleware/auth.middleware.js');


Router.get("/token" , authmiddleware, getStreamToken );


module.exports = Router;
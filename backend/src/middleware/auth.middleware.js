const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const authmiddleware = async (req,res,next) => {
    try{
    const token = req.cookies.jwt ;
    if(!token){
        return res.status(400).send({message:"Unauthorised Access - No Token Provided"});
    }

    const decoder = jwt.verify(token , process.env.JWT_SECRET_KEY)

    if(!decoder){
        res.status(401).send({message: "Unauthorised Access - No Token Provided"});
    }

    const user = await User.findById(decoder.userId).select("-password");
        
    if(!user){
            return res.status(401).send({message:"Unauthorised Access - No Token Provided"});

    }
     req.user = user;

    next();
    
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ message: "Unauthorised Access - Invalid Token" });
    }
}

   

module.exports= { authmiddleware };
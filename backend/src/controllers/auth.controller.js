const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Upstreamer = require("../../lib/stream");







async function signup(req , res){
const {name , email , password} = req.body ;

try{
if(!name || !email || !password){
    return res.status(400).send("Please enter the required fields!!!");
}

if(password.length < 6){
   return  res.status(400).send("Password must be of atleast 6 characters");
}

const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!email_regex.test(email)){
    return res.status(400).send("Enter the valid email id");
}

const existinguser = await User.findOne({email:email});
if(existinguser){
    return res.status(400).json({message:"User with email already exists!!!"});
}

//for creation of Profile_pic 
const idx = Math.floor(Math.random()*100) + 1;
const random_profile_pic = `https://avatar.iran.liara.run/public/${idx}.png`;

const newUser = await User.create({
    name,
    email,
    password,
    profile_pic:random_profile_pic
})


// for creation of Stream Profile 
try{
await Upstreamer({
    id : newUser._id.toString(),
    name : newUser.name,
    image : newUser.profilePic || ""
});
console.log("Stream User created successfully");

}
catch(err){
    console.log("Error in Creating Stream User : " + err);
}



//token creation process 
const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
    expiresIn:"7d"
})

res.cookie("jwt" , token,{
    maxAge:7*24*60*60*1000,
    httpOnly:true, //it helps in preventing XSS Attack
    sameSite:"strict",  //preventCSRF attack
    secure:process.env.NODE_ENV === "production"
})

res.status(201).json({success:true , user:newUser , message:"User Signup Successfully !!"});
}
catch(error){
    console.log("Error in signup");
    res.status(500).json({message:"Internal Server Error"});
}
}








async function login(req , res){
const {email , password} = req.body;

try{
    
    if(!email || !password){
    return res.status(400).send("Please enter the required fields!!!");
    }

    const user_login = await User.findOne({email:email});
    if(!user_login){
        return res.status(400).send({message:"Invalid Email id."});
    }
 
        const isMatch = await bcrypt.compare(password,user_login.password);
        if(!isMatch){
            return res.status(400).send({message:"Invalid Password."});
    }
    const token = jwt.sign({userId:user_login._id},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })

    res.cookie("jwt" , token,{
    maxAge:7*24*60*60*1000,
    httpOnly:true, //it helps in preventing XSS Attack
    sameSite:"strict",  //preventCSRF attack
    secure:process.env.NODE_ENV === "production"
})

res.status(201).json({success:true , user_login , message:"User Logged in Successfully!!!"});
}
catch(err){
    return res.status(500).send({message:"Internal Server Error"});
}
}












async function logout(req , res){
    res.clearCookie("jwt");
    return res.status(200).json({success:true , message:"User Logout successfully"})

}

module.exports={logout , login , signup}; 
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {Upstreamer} = require("../lib/stream.js");


//SIGNUP  API  REQUEST 

async function signup(req , res){
const {name , email , password} = req.body ;

try{
if(!name || !email || !password){
    return res.status(400).json("Please enter the required fields!!!");
}

if(password.length < 6){
   return  res.status(400).json("Password must be of atleast 6 characters");
}

const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!email_regex.test(email)){
    return res.status(400).json("Enter the valid email id");
}

const existinguser = await User.findOne({email:email});
if(existinguser){
    return res.status(400).json({message:"User with email already exists!!!"});
}

// FOR CREATION OF PROFILE_PIC FROM AVATAR

const idx = Math.floor(Math.random()*100) + 1;
const random_profile_pic = `https://avatar.iran.liara.run/public/${idx}.png`;

const newUser = await User.create({
    name,
    email,
    password,
    profilepic:random_profile_pic
})


// FOR CREATION OF STREAM PROFILE 
try{
await Upstreamer({
    id : newUser._id.toString(),
    name : newUser.name,
    image : newUser.profilepic || ""
});
console.log("Stream User created successfully");

}
catch(err){
    console.log("Error in Creating Stream User : " + err);
}


//TOKEN CREATION PROCESS 
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






// LOGIN   API  REQUEST


async function login(req , res){
const {email , password} = req.body;

try{
    
    if(!email || !password){
    return res.status(400).json("Please enter the required fields!!!");
    }

    const user_login = await User.findOne({email:email});
    if(!user_login){
        return res.status(400).json({message:"Invalid Email id."});
    }
 
        const isMatch = await bcrypt.compare(password,user_login.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password."});
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






//  LOGOUT   API  REQUEST


async function logout(req , res){
    res.clearCookie("jwt");
    return res.status(200).json({success:true , message:"User Logout successfully"})

}



// ONBOARD API REQUEST 
async function onboard(req, res) {
    try {
        const userId = req.user._id;

        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                ].filter(Boolean)
            });
        }

        const update_user = await User.findByIdAndUpdate(
            userId,
            {
                name: fullName,                   
                bio: bio,
                native_language: nativeLanguage,  
                learning_language: learningLanguage, 
                location: location,
                isOnBoard: true
            },
            { new: true }
        );

        if (!update_user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User onboarded successfully",
            user: update_user
        });

    } catch (error) {
        console.error("Onboard error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



module.exports = { logout, login, signup, onboard };
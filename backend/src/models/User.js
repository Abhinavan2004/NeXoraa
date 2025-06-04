const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
 name: {
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 password:{
    type:String ,
    required:true,
    minlength:8
 },
 bio:{
    type:String,
    default:"",
 },
 native_language:{
    type:String,
    default:"",
 },
 learning_language:{
    type:String,
    default:""
 },
 location:{
    type:String,
 },
 isOnBoard:{
    type:Boolean,
    default:false
 },
 profilepic:{
    type:String,
    default:""
},
 friends:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
 }
]
} , {timestamps: true});


userSchema.pre("save", async function(next){
   if(!this.isModified("password")) return next ;
   try{
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password , salt);
      next();
   }
   catch(error){
      next(error);
   }
})


const User = mongoose.model("User" , userSchema);

module.exports = User ;
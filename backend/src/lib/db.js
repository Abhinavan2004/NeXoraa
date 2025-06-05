const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB is connected Successfully");
    }
    catch(error){
        console.log("MONGODB is not connected" + error.message);
        process.exit(1);
    }
}

module.exports = connectDB ;
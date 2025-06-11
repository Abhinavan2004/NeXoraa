const {StreamChat} = require("stream-chat");
require("dotenv").config({ path: "../.env" }); 

const apikey = process.env.STREAM_API_SECRET_KEY ;
const apikey_secret = process.env.STREAM_API_SECRET ;

if( !apikey || !apikey_secret){
    console.log("Missing API_key or API_key_Secret");
}

const StreamClient = StreamChat.getInstance(apikey, apikey_secret)
 
const Upstreamer = async (userData) =>{
    try{
        await StreamClient.upsertUsers([userData]);  // Upsert helps in creting users in Stream if not present but if present then helps in Updating them ..
        return userData;
    }
    catch(err){
        console.log("Error in Upserting Stream User" + err);
        throw err;  // Throwing error to be handled in the calling function
    }
}


const generateStreamToken = (userId) => {
    try{
        const token = StreamClient.createToken(userId.toString());
        return token;
    }
    catch(err){
        console.log("Error in Generating Stream Token: " + err);
        throw err ;
    }
}

module.exports = {Upstreamer , generateStreamToken};
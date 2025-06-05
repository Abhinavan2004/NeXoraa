const {generateStreamToken} = require('../lib/stream.js');

async function getStreamToken(req, res) {
    try{
        const token = generateStreamToken(req.user.id);
        res.status(200).json({token}) ;
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"});
        console.error("Error in getStreamToken:", err);
    }
}

module.exports = getStreamToken;

const { default: FriendRequest } = require("../models/FriendRequests");
const User = require("../models/User");


async function myRecommendations(req, res) {
    try {
        const userID = req.user.id;
        const user = req.user;

        const myRecommendations = await User.find({
            $and: [
                { _id: { $ne: userID } },
                { _id: { $nin: user.friends } },
                { isOnBoard: true },
            ]
        }).select('-password'); // Exclude password field for security

        // Return the array directly, not wrapped in an object
        return res.status(200).json(myRecommendations);
    } catch(err) {
        console.error("Error in myRecommendations:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}




async function myFriends(req, res) {
    try{
        const user = await User.findById(req.user.id).select("friends").populate("friends","fullname native_language learning_language profilepic");
        res.status(200).json(user.friends);
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"});
        console.error("Error in myFriends:", err);
    }
}





async function sendFriendRequests(req, res) {
    try {
        const user = req.user.id;
        const { id: recipient_id } = req.params;

        if (user === recipient_id) {
            return res.status(400).json({ message: "You cannot send friend request to yourself" });
        }

        const recipient = await User.findById(recipient_id);
        if (!recipient) {
            return res.status(400).json({ message: "User Not Found !!" });
        }

        if (recipient.friends.includes(user)) {
            return res.status(400).json({ message: "You are already Friend with this User" });
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: user, recipient: recipient_id },
                { sender: recipient_id, recipient: user },
            ],
        });

        if (existingRequest) {
            return res.status(400).json({ message: "A Friend Request Already Exists from this user!!!" });
        }

        // Fixed: Use a different variable name
        const newFriendRequest = await FriendRequest.create({
            sender: user,
            recipient: recipient_id,
        });

        return res.status(200).json({ friendRequest: newFriendRequest });

    } catch (err) {
        console.error("Error in sendFriendRequests:", err); // Move this before return
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



async function acceptFriendRequests(req, res) {
    try{
        const user = req.user.id ;
        const {id:request_id} = req.params;

        const FriendRequest = await FriendRequest.findById(request_id);

        if(!FriendRequest){
            return res.status(400).json({message:"Friend Request Not Found"});
        }

        if(FriendRequest.recipient.toString() !== user){
            return res.status(400).json({message:"You are not the recipient of this Friend Request"});
        }


        // to change the status of the Friend Request to accepted
        FriendRequest.status = "accepted";
        await FriendRequest.save();


        // to update the both reciepient and sender  friends list 
        await User.findByIdAndUpdate( user,
            {$addToSet:{frineds:FriendRequest.sender}},
        );

        await User.findByIdAndUpdate( FriendRequest.sender,
            {$addToSet:{friends:user}},
        );

        return res.status(200).json({message:"Friend Request Accepted Successfully"});

    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"});
        console.error("Error in acceptFriendRequests:", err);
    }
}


async function getFriendRequests(req , res) {
    try{
        const user = req.user.id ;

        const incomingreqs = await FriendRequest.find({
            recipient:user,
            status:"pending",
        }).populate("sender" , "fullName profilepic native_language learning_language");
    
    
       const acceptedreqs = await FriendRequest.find({
        recipient: user,
        status: "accepted",
       }).populate("recipient", "fullName profilepic");

       return res.status(200).json({
            incomingreqs,
            acceptedreqs
        });

    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"});
        console.error("Error in getFriendRequests:", err);
    }
}


async function OutgoingFriendRequests(req, res) {
    try{

        const user = req.user.id ;

       const outgoingreqs =  await FriendRequest.find({
        sender:user,
        status:"pending",
       }).populate("sender", "fullname profilepic native_language learning_language");

       return res.status(200).json({outgoingreqs});
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"});
        console.error("Error in OutgouingFriendRequests:", err);
    }
}



module.exports= {myRecommendations , myFriends , sendFriendRequests , acceptFriendRequests , getFriendRequests , OutgoingFriendRequests} ; 

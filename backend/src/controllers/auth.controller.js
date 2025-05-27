 async function logout(req , res){
    res.send("logout Route")
}

async function login(req , res){
    res.send("login Route")
}

async function signup(req , res){
    res.send("Signup Route")
}

module.exports={logout , login , signup};
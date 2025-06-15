const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const chatRoutes = require("./routes/chat.routes.js");
const Database = require("./lib/db.js");
const cookieParser = require("cookie-parser");
// const { protected } = require('../middleware/auth.middleware');
const cors = require('cors');


Database();

const PORT = process.env.PORT ;
app.get("/", (req,res) =>{
    res.send("Hello World");
})

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL        
  withCredentials: true, // This allows cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods 
}));

app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth" , authRoutes);
app.use("/api/user" , userRoutes);
app.use("/api/chat" , chatRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
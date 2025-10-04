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

const PORT = process.env.PORT || 4000;
app.get("/", (req,res) =>{
    res.send("Hello World");
})


app.use(cors({
  origin: [
    'http://localhost:5173', // For local development
    'https://nexoraa-frontend.onrender.com' // Replace with your actual frontend URL
  ],
  credentials: true, // This allows cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE' ,'OPTIONS'], // Allowed HTTP methods 
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']

}));


app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth" , authRoutes);
app.use("/api/user" , userRoutes);
app.use("/api/chat" , chatRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

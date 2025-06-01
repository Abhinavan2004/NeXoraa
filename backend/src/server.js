const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require("./routes/auth.routes.js");
const Database = require("../lib/db.js");
const cookieParser = require("cookie-parser");
// const { protected } = require('../middleware/auth.middleware');

Database();

const PORT = process.env.PORT ;
app.get("/", (req,res) =>{
    res.send("Hello World");
})

app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth" , authRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
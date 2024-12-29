require("dotenv").config();  
const express = require("express");
const app=express();
const {createServer} = require("node:http");
const {Server}=require("socket.io");
const cors=require("cors");
const connectToSocket= require("./controllers/socketmanager.js");       // Connect To Socket Server
const userRoute=require("./routes/user.js");                                 // User Routes.
const mongoose=require("mongoose");

// To Connect Two Servers (App And Socket) we need Create Server.

const server= createServer(app);
const io= connectToSocket(server);

app.set("port",(process.env.port || 8080))
const db= process.env.MONGO_URI;

app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({extended:true , limit:"40kb"}));

app.use("/user",userRoute);


server.listen(app.get("port"),(req,res)=>{
    console.log("Server Started on Port : "+app.get("port")+"...");
});

const main = async()=>{

    const dbc= await mongoose.connect(db);
    return dbc.connection.host;

}

main().then( (dbc)=>{

    console.log("DataBase Conected Successfully.... : "+dbc);
}
).catch((err)=>{
    console.log("Error : "+err);
})

app.get("/",(req,res)=>{

    res.json({Hello:"World"});
});




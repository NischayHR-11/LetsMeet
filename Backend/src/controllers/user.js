const user= require("../models/user");    // User Model.
const httpStatus =require("http-status");
const bcrypt =require("bcrypt");  // For Hashing The Passward.
const {hash}=require("bcrypt");

const crypto =require("crypto");  // For Token.



const login = async (req,res)=>{

    try{

        const {username,password} =req.body;

        if(!username || !password){

            return res.status(400).json({message:"Enter Valid Username Or Passwaord"});
        }

        const curuser= await user.findOne({username});

        if(!curuser){

            return res.status(httpStatus.status.NOT_FOUND).json({message:"No Such User Found .."});
        }

        const curpassword= await bcrypt.compare(password,curuser.password);

        if(!curpassword){

            return res.status(httpStatus.status.NON_AUTHORITATIVE_INFORMATION).json({message:"Invalid Password , Try Again !!"});
        }

        if(curpassword){

            const token =crypto.randomBytes(20).toString("hex");
            curuser.token=token;
            await curuser.save();

            return res.status(httpStatus.status.OK).json({token:token});
        }

    }catch(err){

        res.status(500).json({message : "Something Went Wrong !! : "+err});
    }
}

const register= async (req,res)=>{


    const {name,username,password}= req.body;

    try{

        if (!name || !username || !password) {
            return res.status(400).json({ message: "All fields are required: name, username, password" });
        }

        const exsistinguser= await user.findOne({username});

        if(exsistinguser){

          return  res.status(httpStatus.status.FOUND).json({message:"UserName Already Exists !!! "});
        }

        const updtpassword= await bcrypt.hash(password,10); // 10 is salt.

        const newuser= new user({

            name:name,
            username:username,
            password:updtpassword
        })

        await newuser.save();

        return res.status(httpStatus.status.CREATED).json({message : "User Registered Successfully..."});

    }catch(err){

        res.status(500).json({message : "Something Went Wrong !! : "+err});
    }
}


module.exports ={login,register};


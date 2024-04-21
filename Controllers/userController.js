const { response } = require('express');
const users=require('../Models/userSchema')
const jwt=require('jsonwebtoken')
// logic for register
exports.register=async(req,res)=>{

const {username,email,password}=req.body;


try{
    const existingUser=await users.findOne({email})
    if(existingUser)
    {
       res.status(404).json("user already registered")
    }
    else{
        const newuser=new users({username,email,password})

        await newuser.save()
        res.status(200).json(newuser)
    }


}
catch(err)
{
    response.status(404).json(err)
}
}

exports.login=async(req,res)=>{

    const {email,password}=req.body;
    try{
const existinguser=await users.findOne({email,password})
if(existinguser)
{
    const token=jwt.sign({userId:existinguser._id},process.env.JWTKEY)
    res.status(200).json({existinguser,token})
    console.log(token);
}
else{
    res.status(402).json("Incorrect Email or password")
}
    }
    catch(err)
    {
        res.status(404).json(err)
    }
}

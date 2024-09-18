import User from "../models/userMode.js";
import bcryptjs from 'bcryptjs';

export const singup = async (req,res)=>{
    const {username,email,password} = req.body;
    const hashedPassword = await bcryptjs.hash(password,10);
    const user = new User({username,email,password:hashedPassword});
    try{
        await user.save();
            res.status(201).json({message:"User created successfully"});
        }catch(err){
            res.status(400).json({message:err.message});
        }
}
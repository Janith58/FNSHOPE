import User from "../models/userMode.js";
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const singup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = await bcryptjs.hash(password,10);
    const user = new User({username,email,password:hashedPassword});
    try{
        await 
            user.save();
            res.status(201).json({message:"User created successfully"});
        }catch(err){
            next(err)
        }
}

export const singin =async (req,res,next)=>{
    const {email,password} = req.body;
    try {
        const validUser=await User.findOne({email});
    if(!validUser){
        return next(errorHandler(404,'user not found!'))
    }
    const validPassword=bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
        return next(errorHandler(401,'invalid password'));
    }
    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    const {password : pass,...rest} = validUser._doc;
    res
    .cookie('access_token',token,{httpOnly:true})
    .status(200)
    .json(rest)   
    } catch (error) {
        next(error);
    }
    
}
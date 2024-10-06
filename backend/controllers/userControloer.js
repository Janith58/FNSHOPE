import Listing from "../models/listingModel.js";
import User from "../models/userMode.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test =  (req,res) => {
    res.send("Hello World")
}

export const updateUser = async (req,res,next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(404,'you can only update your own acount'))
        
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
    const updateUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar
        }
    },{new:true})
    const {password, ...rest} =updateUser._doc;
    res.status(200).json(rest);
    } catch (error) {
        next(error)  
    }
};

export const deleteUser = async (req,res,next) => {
    if(req.user.id !== req.params.id)
        return next(errorHandler(404,'you can only delete your ow acount'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({message:'user deleted successfully'});
    } catch (error) {
        next(error);
    }
}

export const getUserListing = async (req,res,next) => {
    if (req.user.id === req.params.id) {
        try {
            const listing = await Listing.find({userRef:req.params.id});
            res.status(200).json(listing);

        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(404,'you can only view your own listing'))
    }
}
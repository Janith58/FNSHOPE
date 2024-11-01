import mongoose from "mongoose";

const reviewSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    },
    
},{
    timestamps:true,
})

const listingSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        },
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        imageUrls:{
            type:Array,
            required:true
        },
        userRef:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        brand:{
            type:String,
        },
        offer:{
            type:Boolean,
            default:false
        },
        reviews:[reviewSchema]

    },{timestamps:true}
)
const Listing = mongoose.model("Listing", listingSchema);
export default Listing;


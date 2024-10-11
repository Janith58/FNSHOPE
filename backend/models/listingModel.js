import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
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
        quintity:{
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
        }

    },{timestamps:true}
)
const Listing = mongoose.model("Listing", listingSchema);
export default Listing;


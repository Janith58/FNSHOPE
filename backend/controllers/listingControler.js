import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req,res,next) =>{
   try {
    const listing =await Listing.create(req.body);
    return res.status(201).json(listing);

   } catch (error) {
    next(error);
   } 
}

export const deleteListing = async (req, res, next) => {
   try {
       const listing = await Listing.findById(req.params.id);
       if (!listing) {
           return next(errorHandler(404, 'Listing not found'));
       }

       if (req.user.isAdmin) {
           await Listing.findByIdAndDelete(req.params.id);
           return res.status(200).json({ message: 'Listing deleted successfully by admin' });
       }

       if (req.user.id === listing.userRef.toString()) {
           await Listing.findByIdAndDelete(req.params.id);
           return res.status(200).json({ message: 'Listing deleted successfully' });
       } else {
           return next(errorHandler(403, 'You are not authorized to delete this listing'));
       }
   } catch (error) {
       next(error);
   }
};

export const updateListing = async(req,res,next) => {
  const listing = await Listing.findById(req.params.id);
  if(!listing) {
   return next(errorHandler(404, 'Listing not found'))
   }
   try {
      if(req.user.isAdmin) {
         const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true})
         return res.status(200).json(updatedListing)
      }
      if(req.user.id === listing.userRef.toString()) {
         const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true})
         return res.status(200).json(updatedListing)
      }
   } catch (error) {
      next(error)
   }

}

export const getListing = async(req,res,next) => {
   try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
         return next(errorHandler(404, 'Listing not found'))
      }
      return res.status(200).json(listing)
   } catch (error) {
      next(error)
   }
}

export const searchListing = async (req,res,next) =>{
   try {
      const limit =parseInt(req.query.limit);
      const startIndex = parseInt(req.query.startIndex);
      let offer = req.query.offer;
      if(offer === undefined || offer==='false'){
         offer = {$in : [true ,false]}
      }

      const searchTerm= req.query.searchTerm || '';
      const sort=req.query.sort || 'createdAt';
      const order=req.query.order || 'desc';
      const category = req.query.category || '';
      const brand = req.query.brand || '';

      const listing =await Listing.find({
         name : {$regex : searchTerm,$options:'i'},
         offer,
         category: { $regex: category, $options: 'i' },
         brand: { $regex: brand, $options: 'i' },
      })
      .sort({[sort]:order})
      .limit(limit)
      .skip(startIndex)

      return res.status(200).json(listing)
      
   } catch (error) {
      next(error)
   }

} 

export const sendReview = async (req, res, next) => {
   try {
      console.log(req.body)
       const { comment,user,name,avatar} = req.body;
       if (!comment) {
           return res.status(400).json({ message: 'Comment is required' });
       }
       const listing = await Listing.findById(req.params.id);
       if (!listing) {
           return res.status(404).json({ message: 'Listing not found' });
       }
       const review = {
           name: req.body.name, 
           comment,
           user: req.body.user,
           avatar:req.body.avatar     
       };
       console.log(user)
       listing.reviews.push(review);
       await listing.save();
       res.status(201).json({ message: 'Review added',comment,user,name});
   } catch (error) {
       console.error(error);
       res.status(500).json({ success: false, statusCode: 500, message: error.message });
   }
};



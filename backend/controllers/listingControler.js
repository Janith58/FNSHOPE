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

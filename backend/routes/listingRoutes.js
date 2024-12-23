import express from 'express';
import { createListing, deleteListing, getListing, searchListing, updateListing,sendReview } from '../controllers/listingControler.js';
import { verifyToken } from '../utils/verifyUser.js';

const router =express.Router();

router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updateListing);
router.get('/get/:id',getListing);
router.get('/get',searchListing);
router.post('/:id/review',verifyToken,sendReview);

export default router;
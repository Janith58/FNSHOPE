import express from 'express';
import { singup } from '../controllers/authControler.js';

const router =express.Router();

router.post("/signup",singup);

export default router
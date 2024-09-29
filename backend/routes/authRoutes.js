import express from 'express';
import { singup } from '../controllers/authControler.js';
import { singin } from '../controllers/authControler.js';

const router =express.Router();

router.post("/signup",singup);
router.post("/signin",singin)

export default router
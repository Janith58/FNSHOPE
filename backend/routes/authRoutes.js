import express from 'express';
import { google, signout, singup } from '../controllers/authControler.js';
import { singin } from '../controllers/authControler.js';

const router =express.Router();

router.post("/signup",singup);
router.post("/signin",singin);
router.post("/google",google);
router.get('/signout',signout);

export default router
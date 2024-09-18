import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js'

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const app=express();
app.use(express.json());

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
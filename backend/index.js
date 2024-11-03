import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import listingRouter from './routes/listingRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const app=express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);
app.use('/api/order', orderRoutes);



app.use((err,req,res,next)=>{
    const statuscode= err.statuscode || 500;
    const message=err.message || 'internal saerver error';
    return res.status(statuscode).json({
        success :false,
        statuscode,
        message,
    });
});
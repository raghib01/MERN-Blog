import express from 'express'
import mongoose from 'mongoose'
import dotenv  from 'dotenv';
import userRoutes from './routes/user.route.js' ;
import authRoutes from './routes/auth.route.js';
//.js extention mendatory

dotenv.config();

mongoose.connect(
    process.env.MONGODB
).then(()=>{
    console.log('MongoDB is Connected')
}).catch((err)=>{
    console.log(err);
});

const app = express();

app.use(express.json());

app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


// middlewere creating

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || `Internal server error`;
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});
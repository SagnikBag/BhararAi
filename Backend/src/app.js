import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

//Home route
app.get('/',(req,res)=>{
    res.json({message:'Welcome to the BharatAi'})
});


//Auth routes

app.use('/api/auth',authRouter);


export default app;
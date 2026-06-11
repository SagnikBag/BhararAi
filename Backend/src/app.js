import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import chatRouter from './routes/chat.route.js'
import morgan from 'morgan';
import cors from 'cors'; 

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors({
    origin: ['http://localhost:5173',
          'https://bhararai-1.onrender.com'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use(express.static('./public'));
//Home route
app.get('/',(req,res)=>{
    res.json({message:'Welcome to the BharatAi'})
});


//Auth routes

app.use('/api/auth',authRouter);

// Chat routes
app.use("/api/chats",chatRouter);
export default app;
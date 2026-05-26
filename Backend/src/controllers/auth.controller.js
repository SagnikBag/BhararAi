import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";



// @desc Register a new user
// @route POST /api/auth/register
// @access Public 
// @body { username, email, password }
export async function register(req,res){

    const {username,email,password} = req.body;
    
    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {email},
            {username}
            
        ]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User with this email or username already exists",
            success: false,
            err:"User already exists"
        })
    }

    const user = await userModel.create({
        username,
        email,
        password
    })

    const emailVeificationToken = jwt.sign({
        email:user.email
    },process.env.JWT_SECRET)

    await sendEmail({
        to: email,
        subject: "Welcome to BHARATAI",
        html: `<h1>Welcome to BHARATAI, ${username}!</h1>
        <p>Thank you for registering with us. We're excited to have you on board.</p>
        <p>Please click on the link below to verify your email address:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVeificationToken}">Verify Email</a>

        <p>Best regards,<br/>The BHARATAI Team</p>`
    })

    res.status(201).json({
        message:"User registered successfully",
        success: true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

// @desc Login user
// @route POST /api/auth/login
// @access Public 
// @body { email, password }
export async function login(req,res){
    const {email,password} = req.body;
     console.log(req.body);
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password",
            success: false,
            err:"User not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid password",
            success: false,
            err:"Incorrect password"
        })
    }
    if(!user.verified){
        return res.status(400).json({
            message:"Please verify your email address to login",
            success: false,
            err:"Email not verified"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username,
        email:user.email
    },process.env.JWT_SECRET,{expiresIn:'7d'})

    res.cookie('token',token)

    res.status(200).json({
        message:"User logged in successfully",
        success: true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email

        }
    })
}

// @desc Get current logged in user
// @route GET /api/auth/me
// @access Private
// @body { token }

export async function getMe(req,res){
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    if(!user){
        return res.status(404).json({
            message:"User not found",
            success: false,
            err:"User not found"
        })
    }
    res.status(200).json({
        message:"User fetched successfully",
        success: true,
        user

    })
}

// @desc Verify user's email address
// @route GET /api/auth/verify-email?token=
// @access Public
// @query { token }
export async function verifyEmail(req,res){
    const {token} = req.query;

    try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

    


    const user = await userModel.findOne({email: decoded.email});

    if(!user){
        return res.status(400).json({
            message:'Invalid token',
            success: false, 
            err:"User not found"
        })
    }
    user.verified = true;
    await user.save();

    const html = 
    `<h1>Email Verified Successfully</h1>
    <p>Thank you for verifying your email address. Your account is now active.</p>
    <p>You can now log in to your account and start using our services.</p>
    <p>Best regards,<br/>The BHARATAI Team</p> 
    <a href="http://localhost:3000/login">Login to BHARATAI</a>`

   return res.send(html)
}catch(err){
        return res.status(400).json({
            message:"Invalid token",
            success: false,
            err: err.message
        })
    }

}


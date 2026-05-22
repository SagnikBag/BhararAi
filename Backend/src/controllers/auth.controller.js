import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

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
        <a href="http://localhost:3000/verify-email?token=${emailVeificationToken}">Verify Email</a>

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

export async function verifyEmail(req,res){
    const {token} = req.query;

    const decoded = jwt.verify(token.process.env.JWT_SECRET);

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

    res.sendHtml(`<h1>Email verified successfully</h1>
        <p>Your email has been verified successfully. You can now log in to your account.</p>
        `)


}
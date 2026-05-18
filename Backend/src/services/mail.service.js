import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.GOOGLE_USER,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
        clientId:process.env.GOOGLE_CLIENT_ID
    }
})

transporter.verify()
.then(()=>{console.log("Email transporter is ready to send email");
})
.catch((err)=>{console.log("Email transporter verification failed:",err);
})

export async function sendEmail({to,subject,ext}){
    const mailOptions={
        from: process.env.GOOGLE_USER,
        to,
        subject,
        text
    };
    const details = await transporter.sendEmail(mailOptions);
    console.log("Email sent:", details);
    
}
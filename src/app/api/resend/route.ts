import dbConnect from "@/lib/dbConnect";
import UserData from "@/models/userSchema";
import userSchema from "@/schema/validation";
import { NextRequest, NextResponse } from "next/server";
import { date } from "zod";
import { sendEmail } from "@/utils/mailer";

export async function POST(req: NextRequest){
    await dbConnect()
    try {
        const reqbody = await req.json()
        const {email} = reqbody
        
        //find the user with email
        const user = await UserData.findOne({email:email})
        if(!user){
            return NextResponse.json({
                success: false,
                message: "user not FOund",
                data: "User not exist"
            })
        }

        //create otp and its expiry 
        const emailOtp = Math.floor(100000 + Math.random() * 900000)
        const emailOtpExpiry = new Date(Date.now() + 10 * 60000)

        //update the user
        user.emailOtp = emailOtp;
        user.emailOtpExpiry = emailOtpExpiry 

        //save the user
        await user.save()

        const name = await user.username//user hai to username nikal sakte hai ? hmm

        //send email with the new otp to the user
        await sendEmail(email,'verify your email',name, emailOtp)

        return NextResponse.json({
            messagge: 'email otp resent successfully',
            success: true,
            user
        },{
            status: 200
        })


    } catch (error: any) {
        console.log("Error in Resend route")
        return NextResponse.json({
            error: error.message
        },{
            status: 500
        })
    }
}
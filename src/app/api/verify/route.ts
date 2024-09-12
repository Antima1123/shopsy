import dbConnect from "@/lib/dbConnect";
import UserData from "@/models/userSchema";
import userSchema from "@/schema/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await dbConnect()
    try {
        const reqbody = await req.json()
        const {email, emailOtp} = reqbody;
        
        const user = await UserData.findOne({email: email, emailOptExpiry: {$gt: Date.now()}})//spelling hi galat hai
        
        if(!user){
            return NextResponse.json({
                message: "user otp expiry",
                data: "OTP Expires"
            })
        }

        if(emailOtp != user.emailOtp){
            return NextResponse.json({
                message: 'Invalid OTP'
            })
        }
        
        if(emailOtp === user.emailOtp){
            user.isVerfied = true
            user.emailOtp = undefined
            user.emailOptExpiry = undefined
            await user.save()
        }

        return NextResponse.json({
            data: 'varified',
            message: 'user verified successfully'
        })
    


    } catch (error:any) {
        console.log("error in verification email")
        return NextResponse.json({
            error: error.message
        },{
            status: 500
        })
        
    }
}
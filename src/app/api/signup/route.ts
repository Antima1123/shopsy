import dbConnect from "@/lib/dbConnect";
import UserData from "@/models/userSchema";
import userSchema from "@/schema/validation";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { sendEmail } from "@/utils/mailer";
import { ZodError } from "zod";


export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const reqBody = await req.json();
        const validated =  userSchema.parse(reqBody)
        const {username, email, password} = validated;

        const user = await UserData.findOne({email:email});
        if(user){
            return NextResponse.json({
                data: 'exists',
                message: 'user already exists'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(password,salt)
        const emailOtp = Math.floor(100000 + Math.random() * 900000)

        const newUser = new UserData({
            username,
            email,
            password: hashpass,
            emailOtp: emailOtp,
            emailOptExpiry: Date.now() + 10 * 60000
        })
        
        await newUser.save()
         await sendEmail(email, "verify your email", username,emailOtp)

        return NextResponse.json({
            newUser,
            message: 'success'
        })

    } catch (error) {
        //error by zod 
        console.log('error by zod;')
         if(error instanceof ZodError){
            return NextResponse.json({
                error: error.errors,
                messsage: 'Validation Error'
            },{
                status: 401
            })
         }

        //general error
        return NextResponse.json({
            error: error
        },{
            status: 500
        })
    }
}
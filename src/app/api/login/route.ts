import dbConnect from "@/lib/dbConnect";
import UserData from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export async function POST(request: NextRequest){
    await dbConnect()
    try {
        const reqbody = await request.json()
        const {email, password} = reqbody
        
        const user = await UserData.findOne({email: email})
        if(!user){
        return NextResponse.json({
            message: "user not exists",
            success: false,
            data: "User not Exists"
        })
        }

        if(!user.isVerfied){
            return NextResponse.json({
                message: "user not verified",
                success: false,
                data: "User not verified"})
        }

        const validpass = await bcrypt.compare(password, user.password)
        if(!validpass){
            return NextResponse.json({
                message: "Wrong Credential",
                success: false,
                data: "Wrong Credential"
            })  
        }
         
        const response = NextResponse.json({
            message: "Login successfully",
            success: true,
            data: "Login successfully"
        })  
        const token ={
            id : user._id,
            user_email : user.email
        }

        const TokenData = await jwt.sign(token,process.env.TOKEN_SECRET!, { expiresIn: '1d' } )
        response.cookies.set("token", TokenData, {
            httpOnly: true
        })

        return response

    } catch (error:any) {
        return NextResponse.json(
           { error: error.message},
           {status: 500}
        )
    }
}
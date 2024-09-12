import UserData from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dbConnect from "@/lib/dbConnect";
export async function GET(request: NextRequest){
    await dbConnect()
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return response

    } catch (error:any) {
        return NextResponse.json(
           { error: error.message},
           {status: 500}
        )
    }
}
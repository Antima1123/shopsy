import dbConnect from "@/lib/dbConnect";
import UserData from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getdatafromtoken";


export async function POST(request: NextRequest){
    await dbConnect()

    try {
        const userId = getDataFromToken(request)
        const user = await UserData.findOne({_id: userId}).select("-password")
        if(!user){
            return NextResponse.json({
                message : "Wrong Token",
                success: false
            })
        }
        return NextResponse.json({
            message : "User Found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json(
            { error: error.message},
            {status: 500}
         )
    }
}
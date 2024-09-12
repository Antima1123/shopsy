import jwt  from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const Token = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(Token, process.env.TOKEN_SECRET!)

        return decodedToken.id
        
    } catch (error:any) {
        throw new Error(error.message)
        
    }
}
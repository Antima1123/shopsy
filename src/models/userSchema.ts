import { model, models, Document, Schema } from "mongoose";

interface UserProps extends Document{
    username: string,
    email: string,
    password: string,
    isVerfied: boolean,
    emailOtp: number,
    emailOptExpiry: Date
}

const UserSchema = new Schema<UserProps>({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password:{
        type: String,
        required: true,
    },
    isVerfied: Boolean,
    emailOtp: Number,//otp string
    emailOptExpiry: Date, //yaha pe Date hai interface ne number 
},{
    timestamps: true
})

const UserData = models.user || model<UserProps>("user", UserSchema)

export default UserData
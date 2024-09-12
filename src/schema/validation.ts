import z from "zod";

const userSchema = z.object({
    username: z.string().min(4,"username must be atleast 4 characters").max(20, "username not larger than 20 characters"),
    email: z.string().email(),
    password: z.string().min(6,"password must be of 6 character"),
    isVerfied: z.boolean().optional(), 
    emailOtp: z.string().optional(),
    emailOtpExpiry: z.string().optional()
})
export default userSchema
// bas email and number me regex l
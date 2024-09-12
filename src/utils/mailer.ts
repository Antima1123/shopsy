import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export  async function sendEmail(email: string, subject: string, name: string, OTP: number){
    const options ={
        from: '<onboarding@resend.dev>',
        to: 'email',
        subject: `${subject}`,
        html: `Hello ${name} your 10 min otp is ${OTP}`
    }
    try {
      const response = await resend.emails.send(options);
      console.log("Email sent successfully", response);
    //   kya ye kam v karta hai ?
        
    } catch (error) {
        console.log("Error sending email", error);
        throw new Error("Failed to Send Email")
    }
    
}

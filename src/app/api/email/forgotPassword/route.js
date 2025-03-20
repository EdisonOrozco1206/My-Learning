import { Resend } from "resend";
import { ForgotPasswordTemplate } from "@/components/email/ForgotPasswordTemplate";

const resend = new Resend(process.env.EMAIL_API_KEY);

export async function POST(req) {
    const { userEmail, userName, userId } = await req.json()

    try {
        const { data, error } = await resend.emails.send({
            from: 'noreply@my-learning.site',
            to: userEmail,
            subject: `Recuperación de contraseña My learning - ${userName}`,
            react: ForgotPasswordTemplate({userName, userId}),
        });

        if (error) return Response.json({ error: error.message }, { status: 500 });

        return Response.json(null);
    } catch (error) {
        console.log(error.message);
        
        return Response.json({ error }, { status: 500 });
    }
}

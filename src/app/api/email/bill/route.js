import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/EmailTemplate";

const resend = new Resend(process.env.EMAIL_API_KEY);

export async function POST(req) {
    const { id, userEmail, userName } = await req.json()

    try {
        const res = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
            }
        });
        const mercadoPagoData = await res.json();

        
        const date = mercadoPagoData.date_approved;
        const cart = mercadoPagoData.metadata.cart;

        const { data, error } = await resend.emails.send({
            from: 'noreply@my-learning.site',
            to: userEmail,
            subject: `Factura orden #${id}`,
            react: EmailTemplate({id, cart, date, userName}),
        });

        if (error) return Response.json({ error }, { status: 500 });

        return Response.json(null);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/EmailTemplate";

const resend = new Resend("re_MUmm961o_2FRAWGbduoCT11kVTz23ms9z");

export async function POST(req) {
    const { id, userEmail, userName } = await req.json()

    try {
        const res = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
            headers: {
                Authorization: `Bearer APP_USR-1019432933134765-012819-a40c3c8b7cf1faaf86a4ff8950198d6c-2239164662`
            }
        });
        const mercadoPagoData = await res.json();
        
        const date = mercadoPagoData.date_approved;
        const cart = mercadoPagoData.metadata.cart;

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: userEmail,
            subject: `Factura orden #${id}`,
            react: EmailTemplate({id, cart, date, userName}),
        });

        if (error) return Response.json({ error }, { status: 500 });

        return Response.json(null);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}

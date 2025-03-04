import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

export const mercadopago = new MercadoPagoConfig({
  accessToken: "APP_USR-1019432933134765-012819-a40c3c8b7cf1faaf86a4ff8950198d6c-2239164662"
});

export async function POST(req, res) {
    if (req.method !== "POST") {
        return NextResponse.json({error: "Método no permitido"});
    }

    try {
        const { cart, userData} = await req.json();

        if (!cart || cart.length === 0) {
            return NextResponse.json({error: "El carrito está vacio"});
        }

        const items = cart.map(item => ({
            title: item.title,
            quantity: 1,
            unit_price: item.price,
            currency_id: "COP"
        }));

        const preference = new Preference(mercadopago);

        const response = await preference.create({
            body: {
                items,
                metadata: { 
                    cart,
                    associated_user: userData.id
                },
                back_urls: {
                    success: `${process.env.BASE_URL}/checkout/success`,
                    failure: `${process.env.BASE_URL}/checkout/failure`,
                    pending: `${process.env.BASE_URL}/checkout/pending`,
                }
            }
        });

        return NextResponse.json({init_point: response.init_point})
    } catch (error) {
        console.error("Error al crear la preferencia:", error);
        NextResponse.json({error: "Error interno del servidor"})
    }
}

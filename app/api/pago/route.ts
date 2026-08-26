import { NextResponse } from "next/server";
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const preference = await mercadopago.preferences.create({
      items: body.items.map((item: any) => ({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: "COP",
      })),
      payer: {
        email: body.email,
      },
      back_urls: {
        success: `https://orquideas-teal.vercel.app/success`,
        failure: `https://orquideas-teal.vercel.app/failure`,
        pending: `https://orquideas-teal.vercel.app/pending`,
        
      },
      auto_return: "approved",
    });

    return NextResponse.json({ checkout_url: preference.body.init_point });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

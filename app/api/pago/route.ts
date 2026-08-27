import { NextResponse } from "next/server";
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { items, email } = body;

  const preference = {
    items: items.map((item: any) => ({
      title: item.name,
      unit_price: item.price,
      quantity: item.quantity,
    })),
    payer: { email },
    back_urls: {
      success: `https://orquideas-teal.vercel.app/success`,
      failure: `https://orquideas-teal.vercel.app/failure`,
      pending: `https://orquideas-teal.vercel.app/pending`,
    },
    auto_return: "approved",
  };

  const result = await mercadopago.preferences.create(preference);

  return new Response(
    JSON.stringify({ checkout_url: result.body.init_point }),
    { status: 200 }
  );
}

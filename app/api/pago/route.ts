import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount_in_cents, currency, customer_email, reference, redirect_url } = await req.json();

  const response = await fetch("https://sandbox.wompi.co/v1/transactions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount_in_cents,
      currency,
      customer_email,
      reference,
      redirect_url,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data?.data?.checkout_url) {
    console.error("Error creando transacción en Wompi:", data);
    return NextResponse.json({ error: data }, { status: response.status });
  }

  return NextResponse.json({ checkout_url: data.data.checkout_url });
}

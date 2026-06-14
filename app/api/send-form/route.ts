import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, eventType, eventDate, message } = await req.json();

    // Configuración del transporte SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // o tu proveedor SMTP
      port: 587,
      secure: false, // true si usas puerto 465
      auth: {
        user: process.env.SMTP_USER, // variable de entorno en Vercel
        pass: process.env.SMTP_PASS, // contraseña de aplicación
      },
    });

    // Opciones del correo
    await transporter.sendMail({
      from: `"Sitio Web De Orquideas" <${process.env.SMTP_USER}>`,
      to: "yesidbarreto24@gmail.com", // correo del dueño del sitio
      subject: "Nueva solicitud de evento",
      text: `
        Nombre: ${name}
        Correo: ${email}
        Teléfono: ${phone}
        Tipo de evento: ${eventType}
        Fecha del evento: ${eventDate}
        Mensaje: ${message}
      `,
    });

    return NextResponse.json({ success: true, message: "Correo enviado con éxito" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error al enviar el correo" }, { status: 500 });
  }
}

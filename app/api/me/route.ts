// app/api/me/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/(?:^|; )token=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) return NextResponse.json({ authenticated: false });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.json({ authenticated: true, user: payload });
    } catch {
      return NextResponse.json({ authenticated: false });
    }
  } catch (err) {
    console.error("Error en /api/me:", err);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  // Leer todas las cookies del header
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({
      authenticated: true,
      user_id: (decoded as any).user_id,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}

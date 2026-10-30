import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Rutas que quieres proteger
  const protectedPaths = ["/checkout", "/checkout/*", "/orders", "/api/checkout"];

  const isProtected = protectedPaths.some(p => {
    if (p.endsWith("/*")) return pathname.startsWith(p.replace("/*", ""));
    return pathname === p;
  });

  if (!isProtected) return NextResponse.next();

  const cookie = req.cookies.get("token")?.value || null;
  if (!cookie) {
    // redirige a login con redirect
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(cookie, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/venta/:path*","/checkout/:path*", "/orders/:path*", "/api/venta/:path*"],
};

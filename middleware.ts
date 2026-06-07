import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  if (host.startsWith("cuidate.")) {
    if (
      !url.pathname.startsWith("/cuidate") &&
      !url.pathname.startsWith("/api/")
    ) {
      url.pathname = `/cuidate${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  if (host.startsWith("agente.")) {
    if (url.pathname === "/" || url.pathname === "") {
      return NextResponse.redirect("https://operaria.cl");
    }
    if (
      !url.pathname.startsWith("/barber/") &&
      !url.pathname.startsWith("/web/") &&
      !url.pathname.startsWith("/diagnostico/") &&
      !url.pathname.startsWith("/api/")
    ) {
      url.pathname = `/barber${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|.*\\.).*)"],
};

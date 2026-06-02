import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  if (host.startsWith("hands.")) {
    if (url.pathname === "/" || url.pathname === "") {
      return NextResponse.redirect("https://operaria.cl");
    }
    if (
      !url.pathname.startsWith("/spm2-hogar/") &&
      !url.pathname.startsWith("/spm2-escolar/") &&
      !url.pathname.startsWith("/que-es/") &&
      !url.pathname.startsWith("/hands-to") &&
      !url.pathname.startsWith("/api/")
    ) {
      url.pathname = `/spm2-hogar${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  if (host.startsWith("hands-sm.")) {
    if (url.pathname === "/" || url.pathname === "") {
      return NextResponse.redirect("https://operaria.cl");
    }
    if (
      !url.pathname.startsWith("/mdq/") &&
      !url.pathname.startsWith("/phq9/") &&
      !url.pathname.startsWith("/gad7/") &&
      !url.pathname.startsWith("/dass21/") &&
      !url.pathname.startsWith("/que-es/") &&
      !url.pathname.startsWith("/hands-sm") &&
      !url.pathname.startsWith("/api/")
    ) {
      url.pathname = `/dass21${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  if (host.startsWith("cuidate.")) {
    // Subdominio dedicado del producto Cuídate · slamm (reducción de daños).
    // Cualquier ruta del subdominio se reescribe dentro de /cuidate.
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
      !url.pathname.startsWith("/spm2-hogar/") &&
      !url.pathname.startsWith("/spm2-escolar/") &&
      !url.pathname.startsWith("/que-es/") &&
      !url.pathname.startsWith("/hands-to") &&
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

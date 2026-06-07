import { NextResponse } from "next/server";

// Endpoint legacy. Hands-SM y Hands-TO ahora viven en repos separados
// (hands-sm.operaria.cl y hands-to.operaria.cl). Aquí solo respondemos 410
// por compatibilidad mientras los clientes viejos no caduquen.
export async function POST() {
  return NextResponse.json(
    { success: false, error: "Endpoint movido a hands-sm.operaria.cl / hands-to.operaria.cl" },
    { status: 410 }
  );
}

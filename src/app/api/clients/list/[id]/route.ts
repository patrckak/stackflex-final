import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (id) {
    let clients = await prisma.client.findMany({
      where: { id: id },
      select: { clientId: true, name: true },
    });

    if (clients.length > 0) {
      return NextResponse.json({ data: clients });
    } else {
      return NextResponse.json({ data: [] }); 
  } else {
    return NextResponse.json({ data: [] });
  }
}

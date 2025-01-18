import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: id } // Continuamos com id como string
) {
  const { id } = params;

  if (id) {
    try {
      let clients = await prisma.client.findMany({
        where: { id: id },
        select: { clientId: true, name: true },
      });

      if (clients.length > 0) {
        return NextResponse.json({ data: clients });
      } else {
        return NextResponse.json({ data: [] });
      }
    } catch (error) {
      // Tratamento de erro
      return NextResponse.json(
        { error: "Erro ao buscar clientes." },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ data: [] });
  }
}

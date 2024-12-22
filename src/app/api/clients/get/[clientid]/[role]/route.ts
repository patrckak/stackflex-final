import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ clientid: string; role: string }> }
) {
  const clientid = (await params).clientid;
  const role = (await params).role;

  if (clientid && role) {
    let u = await prisma.user.findUnique({ where: { id: role } });
    if (!u) {
      return NextResponse.json({ stackflex: "unauthorized.", status: 401 });
    }
    let clientData = await prisma.client.findUnique({
      where: { clientId: clientid },
    });
    if (!clientData) {
      return NextResponse.json({ stackflex: "unauthorized", status: 401 });
    }

    return NextResponse.json(clientData, { status: 200 });
  } else {
    return NextResponse.json({ stackflex: "unauthorized.", status: 401 });
  }

  // if (id) {
  //   let clients = await prisma.client.findMany({
  //     where: { id: id },
  //     select: { clientId: true, name: true },
  //   });
  //   if (clients) {
  //     return NextResponse.json({ data: clients });
  //   } else return [];
  // } else {
  //   return NextResponse.json({});
  // }
}

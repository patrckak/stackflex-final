import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (id) {
    let clients = await prisma.client.findMany({
      where: { id: id },
      select: { clientId: true, name: true },
    });
    if (clients) {
      return NextResponse.json({ data: clients });
    } else return [];
  } else {
    return NextResponse.json({});
  }
}

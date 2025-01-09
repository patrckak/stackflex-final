import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  let exists = await prisma.account.findFirst({
    where: { id: id },
    select: { earnings: true, costs: true },
  });

  if (!exists) {
    return NextResponse.json({ status: 401, msg: "Não autorizado." });
  } else {
    return NextResponse.json({
      costs: exists.costs,
      earns: exists.earnings,
    });
  }
}

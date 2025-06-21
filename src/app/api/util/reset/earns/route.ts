import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;

  if (id !== "reset123321stckflex") {
    return NextResponse.json({ status: 401, msg: "Não autorizado." });
  }

  let task = await prisma.account.updateMany({
    data: { earnings: 0, costs: 0 },
  });

  if (!task) {
    return NextResponse.json({ status: 401, msg: "Falha ao executar." });
  } else {
    return NextResponse.json({
      status: 200,
      msg: "Sucesso ao zerar ganhos e custos.",
    });
  }
}

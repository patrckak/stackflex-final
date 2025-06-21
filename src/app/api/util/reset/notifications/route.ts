import { userInfo } from "os";
import { auth } from "../../../../../../auth";
import { NextResponse } from "next/server";
import { getAccountId } from "@/app/actions/user";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user.cpf) {
    return NextResponse.json({ status: 401, msg: "Não autorizado" });
  } else {
    const getAccount = await prisma.user.findFirst({
      where: {
        public_id: session.user.cpf,
      },
      select: {
        Account: {
          select: {
            id: true,
            notifications: true,
          },
        },
      },
    });

    try {
      let task = await prisma.account.update({
        where: {
          id: await getAccountId(session.user.cpf),
        },
        data: {
          notifications: null,
        },
      });
    } catch (error) {
      console.error("Erro ao apagar notificações:", error);
      return NextResponse.json({
        status: 500,
        msg: "Erro ao apagar notificações.",
      });
    }

    return NextResponse.json({ status: 401, msg: "Notificações apagadas." });
  }
}

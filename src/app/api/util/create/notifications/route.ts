import { auth } from "../../../../../../auth";
import { NextResponse } from "next/server";
import { getAccountId } from "@/app/actions/user";

export async function POST(request: Request) {
  const session = await auth();
  const { data, id } = await request.json();

  // const data = [{ description: "teste notification" }];
  if (!session?.user.cpf) {
    return NextResponse.json({ msg: "Não autorizado.", status: 401 });
  } else {
    const accountId = await getAccountId(session.user.cpf);
    // const accountId = "USERACCOUNTID";
    if (!accountId) {
      return NextResponse.json({ msg: "Conta não encontrada.", status: 404 });
    }

    const nftc = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
      select: {
        notifications: true,
      },
    });

    if (!nftc) {
      return NextResponse.json({ msg: "Conta não encontrada.", status: 404 });
    }

    let n = [{}];
    n = JSON.parse(nftc.notifications);

    let task;

    try {
      if (n !== null) {
        n.push(data);
        task = await prisma.account.update({
          where: {
            id: accountId,
          },
          data: {
            notifications: JSON.stringify(n),
          },
        });
      } else {
        task = await prisma.account.update({
          where: {
            id: accountId,
          },
          data: {
            notifications: JSON.stringify([data]),
          },
        });
      }

      console.log(n);
      if (task) {
        return NextResponse.json({
          msg: "Notificação criada com sucesso.",
          status: 200,
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        msg: "Erro ao criar notificação.",
        status: 500,
      });
    }
  }
}

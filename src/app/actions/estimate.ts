"use server";

import { ComparePasswords } from "../../components/db/crypt";

export async function newEstimate(data: any) {
  const { role, date, desc, clientId, items, descont } = data;
  try {
    let update = await prisma.user.update({
      where: { id: role },
      data: {
        Estimates: {
          create: {
            clientId: clientId,
            description: desc,
            date: date,
            items: items,
            descont: descont,
          },
        },
      },
    });
    if (!update) {
      return {
        msg: "ERRO SF005: Erro ao gerar orçamento, contate o suporte. ", // não foi encontrado o id
        status: 0,
      };
    } else {
      console.log(update);
      return {
        msg: "Orçamento criado com sucesso.",
      };
    }
  } catch (error) {
    return {
      msg: "ERRO SF102: Erro interno ao gerar orçamento, contate o suporte.",
      status: 0,
    };
  }
}

export const listEstimate = async (role: string) => {
  try {
    let estimates = await prisma.estimates.findMany({ where: { id: role } });
    return estimates;
  } catch (error) {
    return null;
  }
};

export const updateEstimate = async (
  role: string,
  estimateId: string,
  password: string
) => {
  try {
    let user = await prisma.user.findUnique({ where: { id: role } });
    // if(user.role =< 2) // tem permissão para editar ou apagar arquivos
    let matchPassword = await ComparePasswords(password, user.password);
    // TODO: finalizar atualização do
  } catch (error) {
    return null;
  }
};

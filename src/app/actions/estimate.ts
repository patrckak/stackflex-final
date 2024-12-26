"use server";

import { prisma } from "@/lib/prisma";
import { ComparePasswords } from "../../components/db/crypt";

export async function newEstimate(data: any) {
  const { role, date, desc, clientId, items, descont } = data;
  try {
    console.log(data);
    let update = await prisma.user.update({
      where: { id: role },
      data: {
        Estimates: {
          create: {
            clientId: clientId, //! NÃO TÁ ENVIANDO O CLIENTID NO FORMULARIO DE ORÇAMENTO
            description: desc,
            date: date,
            items: items,
            descont: 0,
          },
        },
      },
    });
    if (update) return { msg: "sucesso porraaaa" };
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
    // TODO: finalizar atualização do orçamento
  } catch (error) {
    return null;
  }
};

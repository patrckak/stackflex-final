"use server";

import { prisma } from "@/lib/prisma";
import { ComparePasswords } from "../../components/db/crypt";
import { gerarValidação } from "@/components/db/genValidation";
import { somarTotal } from "./utils";

export async function newEstimate(data: any) {
  const {
    role,
    date,
    desc,
    clientId,
    clientAddress,
    clientNumber,
    cadastro,
    items,
    descont,
  } = data;
  try {
    var st = "";
    let update = await prisma.user.update({
      where: { id: role },
      data: {
        Estimates: {
          create: {
            clientId: clientId,
            description: desc,
            clientAddress: clientAddress,
            clientNumber: clientNumber,
            clientCadastro: cadastro,
            date: date,
            key: parseInt(await gerarValidação()),
            items: items,
            value: somarTotal(items),
            descont: descont,
          },
        },
      },
    });
    if (update) {
      return { msg: "Orçamento criado" };
    }
    if (!update) {
      return {
        msg: "Erro ao gerar orçamento, contate o suporte. SF-005", // não foi encontrado o id
        status: 0,
      };
    } else {
      return {
        msg: "Orçamento criado com sucesso.",
      };
    }
  } catch (error) {
    console.log("deu zica");
    return {
      msg: "Erro interno ao gerar orçamento, contate o suporte. SF-102",
      status: 0,
    };
  }
}

export const markReadyEstimate = async (role: string, id: any) => {
  try {
    let user = await prisma.user.findUnique({ where: { id: role } });
    if (user) {
      let estimate = await prisma.estimates.update({
        where: { estimateId: id },
        data: {
          status: "Finalizado.",
        },
      });
      if (estimate) {
        return { msg: "Orçamento marcado como finalizado." };
      } else {
        return { msg: "Erro interno ao editar orçamento. SF-006", status: 0 };
      }
    }
  } catch (err) {}
};

export const getEstimateData = async (role: string, id: any) => {
  try {
    let user = await prisma.user.findUnique({ where: { id: role } });
    if (user) {
      let es = await prisma.estimates.findFirst({ where: { estimateId: id } });
      if (es) {
        return { data: es, msg: "ok" };
      } else {
        return {
          msg: "Erro ao recuperar dados do orçamento. SF-008",
          status: 2,
        };
      }
    } else {
      return { msg: "Erro ao encontrar usuário. SF-003", status: 0 };
    }
  } catch (error) {}
};

export const getEstimateDataByPassword = async (key: any, id: any) => {
  try {
    let es = await prisma.estimates.findFirst({ where: { estimateId: id } });
    if (es) {
      if (es.key == key) {
        return { data: es, msg: "ok" }; //? retornar dados do orçamento
      } else {
        return {
          msg: "Senha incorreta. SF-002",
          status: 2,
        }; //? senha incorreta
      }
    } else {
      return {
        msg: "Erro ao recuperar dados do orçamento. SF-008",
        status: 2,
      };
    }
  } catch (error) {
    return {
      msg: "Erro interno ao recuperar dados do orçamento. SF-009",
      status: 2,
    };
  }
};

export const deleteEstimate = async (
  role: string,
  id: any,
  password: string
) => {
  try {
    let user = await prisma.user.findUnique({ where: { id: role } });
    if (user) {
      let passwordsMatch = await ComparePasswords(password, user.password);
      if (await passwordsMatch) {
        let es = await prisma.estimates.delete({
          where: { estimateId: id },
        });
        if (es) {
          return { msg: " Orçamento excluido com sucesso." };
        }
      } else {
        return { msg: "Senha incorreta. SF-002", status: 0 };
      }
    } else {
      return { msg: "Erro ao identificar usuário. SF-003", status: 0 };
    }
  } catch (err) {}
};

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

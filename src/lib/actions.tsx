import { prisma } from "./prisma";
import { auth } from "../../auth";
import { ComparePasswords } from "../components/db/crypt";

export async function getSession() {
  const session = await auth();
  if (!session?.user) return null;
  return session?.user;
}

export async function validarCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, ""); // Remove tudo que não for dígito

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false; // Verifica se o CPF tem 11 dígitos e não é sequência de números iguais
  }

  let soma = 0;
  let resto;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  // Validação do segundo dígito verificador
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

export async function createEstimate(data: any) {
  const { cpf, date, desc, clientId } = data;

  let created = await prisma.user.update({
    select: { public_id: cpf },
    where: { public_id: cpf },
    data: {
      Estimates: {
        create: {
          clientId: clientId,
          date: date,
          description: desc,
          items: "{ 1: {nome: teste, valor: 35, un: unidade}}",
        },
      },
    },
  });
  if (!created) {
    return { msg: "erro ao gerar orçamento, contate o suporte.", status: 0 };
  } else {
    return { msg: `orçamento criado com sucesso. ` };
  }
}

export async function getUserAuth(cpf: any, password: any) {
  let userExits = await prisma.user.findFirst({ where: { public_id: cpf } });
  if (userExits) {
    const passwordMatch = await ComparePasswords(password, userExits.password);
    if (passwordMatch) {
      return {
        name: userExits.firstname,
        image: userExits.avatar,
        role: userExits.id,
        storeId: userExits.cnpj,
        cpf: userExits.public_id,
      };
    } else {
      return null;
    }
  }
  return null;
}

"use server";

import { prisma } from "@/lib/prisma";
import { HashPassword } from "./crypt";
import { gerarValidação } from "./genValidation";

export async function createUser(data: any) {
  const {
    cpf,
    firstname,
    lastname,
    email,
    password,
    cnpj,
    nomeEmpresa,
    endereco,
    cep,
    cidade,
  } = data;

  //? != undefined = cpf já cadastrado
  const userExits = await prisma.user.findUnique({ where: { public_id: cpf } });
  if (!userExits) {
    let hash = await HashPassword(password);

    if (hash) {
      if (cnpj != undefined) {
        let user = await prisma.user.create({
          data: {
            public_id: cpf,
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hash,
            cep: cep,
            cidade: cidade,
            endereco: endereco,
            razao: nomeEmpresa,
            cnpj: cnpj,
            verification: await gerarValidação(),
            Account: { create: {} },
          },
        });

        let private_id = [user.id];

        if (user) return { status: 1, msg: "Registro criado." };
      } else {
        let user = await prisma.user.create({
          data: {
            public_id: cpf,
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hash,
            cep: cep,
            cidade: cidade,
            endereco: endereco,
            verification: await gerarValidação(),
            Account: { create: {} },
          },
        });
        if (user) {
          return {
            status: 1,
            msg: "Usuário cadastrado, você será redirecionado.",
          };
        } else {
          return { status: 0, msg: "Erro interno ao registrar o usuário." };
        }
      }
    }
  } else {
    return {
      status: 0,
      msg: "CPF já registrado. Vá para parte de login por favor.",
    };
  }
}

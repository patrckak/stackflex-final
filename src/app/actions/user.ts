"use server";

import { prisma } from "@/lib/prisma";

export const getEarns = async (id: string) => {
  let d = await prisma.account.findFirst({
    where: { id: id },
    select: { earnings: true, costs: true },
  });
  return { costs: d.costs, earnings: d.earnings };
};

export const getEmailVerified = async (id: string) => {
  let d = await prisma.account.findFirst({
    where: { id: id },
    select: { isVerificated: true },
  });
  return d.isVerificated;
};

export const getTasks = async (id: string) => {
  let d = await prisma.account.findFirst({
    where: { id: id },
    select: { notifications: true },
  });
  return d;
};

export const getAccountId = async (cpf: string) => {
  let d = await prisma.user.findFirst({
    where: { public_id: cpf },
    select: { Account: { select: { id: true } } },
  });
  return d?.Account[0].id;
};

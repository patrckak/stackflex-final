"use server";

import { prisma } from "@/lib/prisma";

export const getEarns = async (id: string) => {
  let d = await prisma.account.findFirst({
    where: { id: id },
    select: { earnings: true, costs: true },
  });
  return { costs: d.costs, earnings: d.earnings };
};

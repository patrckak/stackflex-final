"use server";

import * as bcrypt from "bcryptjs";

export async function ComparePasswords(password: any, hash: any) {
  const passwordMatch = bcrypt.compareSync(password, hash);
  return passwordMatch;
}

export async function HashPassword(password: string) {
  // return password;
  const hash = bcrypt.hashSync(password, 10);
  if (await bcrypt.compare(password, hash)) {
    return hash;
  } else {
    throw new Error("Erro ao gerar hash.");
  }
}

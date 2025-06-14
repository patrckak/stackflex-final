import { prisma } from "./../../../../lib/prisma";
export async function POST(request) {
  request.setHeader("Access-Control-Allow-Origin", "*");

  const { email, cpf } = await request.json();
  try {
    if (!email || !cpf)
      return Response.json({ msg: "Email ou CPF não enviados." });
    const user = await prisma.funcionarios.findUnique({
      where: { cpf: cpf },
    });
    if (!user) return Response.json({ msg: "Usuário não encontrado." });
    if (user.email == email) {
      return Response.json({ user });
    } else {
      return Response.json({ msg: "E-mail inválido." });
    }
  } catch (error) {
    return Response.json({ error });
  }
}

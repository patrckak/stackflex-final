"use server";

export const newClient = async (formData: any) => {
  const { nome, endereco, contato, id, role } = formData;
  if (id) {
    let client = await prisma.user.update({
      where: { id: id },
      data: {
        Client: {
          create: {
            name: nome,
            address: endereco,
            contact: contato,
          },
        },
      },
    });
    if (client) return { msg: "Cliente criado com sucesso." };
  } else return { msg: "ERRO SF511: Erro ao registrar o client." };
};

export const listClients = async (id: string): Promise<Array<any>> => {
  if (id) {
    let clients = await prisma.client.findMany({
      where: { id: id },
      select: { clientId: true, name: true },
    });
    if (clients) {
      console.log(clients);
      return clients;
    } else return [];
  }
};

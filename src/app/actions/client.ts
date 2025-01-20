"use server";

export const newClient = async (formData: any) => {
  const { name, address, contact, role, cadastro } = formData;
  if (role) {
    let client = await prisma.user.update({
      where: { id: role },
      data: {
        Client: {
          create: {
            cadastro: cadastro,
            name: name,
            address: address,
            contact: contact,
          },
        },
      },
    });
    if (client) return { msg: "Cliente criado com sucesso." };
  } else return { msg: "Erro ao registrar o client. SF-005", status: 0 };
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

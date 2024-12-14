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

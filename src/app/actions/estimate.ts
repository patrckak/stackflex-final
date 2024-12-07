"use server";

export async function newEstimate(data: any) {
  const { role, date, desc, clientId, items, descont } = data;
  try {
    let update = await prisma.user.update({
      where: { id: role },
      data: {
        Estimates: {
          create: {
            clientId: clientId,
            desc: desc,
            date: date,
            items: items,
            descont: descont,
          },
        },
      },
    });
    if (!update) {
      return {
        msg: "ERRO SF005: Erro ao gerar orçamento, contate o suporte. ", // não foi encontrado o id
        status: 0,
      };
    } else {
      console.log(update);
      return {
        msg: "Orçamento criado com sucesso.",
      };
    }
    // if (!user) {
    //   return {
    //     msg: "ERRO SF005: Erro ao gerar orçamento, contate o suporte. ", // não foi encontrado o id
    //     status: 0,
    //   };
    // } else {
    //   let r = await prisma.estimates.create({
    //     data: {
    //       clientId: clientId,
    //       desc: desc,
    //       date: date,
    //     },
    //   });
    //   if (r) {
    //     return { msg: "Novo orçamento gerado com sucesso." };
    //   } else
    //     return {
    //       msg: "ERRO SF101: Erro interno ao gerar orçamento, contate o suporte.",
    //     };
    // }
  } catch (error) {
    console.warn(error);
    return {
      msg: "ERRO SF102: Erro interno ao gerar orçamento, contate o suporte.",
      status: 0,
    };
  }
}

// export const listEstimates = (id: any) => {
//   if (id) {
//     let r;
//     return r;
//   } else {
//     return { msg: "ERRO SF000: Não autorizado.", status: 0 };
//   }
// };

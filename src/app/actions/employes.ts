export const EmployeeRegister = (data: any) => {
  const { cpf, nome, role, email, id } = data;
  if (!id) return { msg: "ID inválido. SF-005", status: 2 };
};

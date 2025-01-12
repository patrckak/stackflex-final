export function formatID(id) {
  id = id.replace(/\D/g, "");

  if (id.length === 11) {
    // CPF
    return { msg: id.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") };
  } else if (id.length === 14) {
    // CNPJ
    return {
      msg: id.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"),
    };
  } else {
    return { msg: "Documento inválido", status: 0 };
  }
}

export function somarTotal(json) {
  let total = 0;
  let js = JSON.parse(json);
  js.map((i) => (total = total + parseFloat(i.valor)));
  return total;
}

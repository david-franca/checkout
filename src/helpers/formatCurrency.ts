export const formatCurrency = (value: number) => {
  const BrReal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return BrReal.format(value);
};

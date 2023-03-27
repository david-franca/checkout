import { CreditCard } from "@/components/CreditCard";
import { Header } from "@/components/Header";
import { Summary } from "@/components/Summary";
import { toUppercase } from "@/helpers/toUppercase";
import { ClientData, FormatedClientData } from "@/models/checkout.models";
import { Box, Stack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";

interface CheckoutProps {
  data: FormatedClientData;
}

const Checkout: NextPage<CheckoutProps> = ({ data }) => {
  return (
    <Box>
      <Header />
      <Stack direction={['column-reverse', 'column-reverse', 'row']} bg="gray.600">
        <CreditCard data={data} />
        <Summary data={data} />
      </Stack>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  const id = params?.id;

  const res = await fetch(
    `https://r8so6p8zya.execute-api.sa-east-1.amazonaws.com/v1/linkpagamento?hash_id=${id}`
  );
  const client: ClientData = await res.json();

  const BrReal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const data: FormatedClientData = {
    adquirente: client.adquirente,
    email: client.email
      .toLowerCase()
      .replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1*****@$2"),
    itens: client.itens.map((item) => ({
      amount: item.amount,
      valor_item: BrReal.format(item.valor_item),
      name: toUppercase(item.name),
      valor_total_item: BrReal.format(item.valor_total_item),
    })),
    merchantOrderId: client.merchantOrderId,
    name: toUppercase(client.name),
    parcelas: client.parcelas,
    total: client.total,
  };

  return {
    props: {
      data,
    },
  };
};

export default Checkout;

import { CreditCard } from "@/components/CreditCard";
import { Head } from "@/components/Head";
import { Header } from "@/components/Header";
import { Summary } from "@/components/Summary";
import { api } from "@/config/api";
import { ClientData } from "@/models/checkout.models";
import { Box, Stack } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import { GetServerSideProps, NextPage } from "next";
import { RefObject, useRef } from "react";

interface CheckoutProps {
  data: ClientData;
  id: string;
}

const Checkout: NextPage<CheckoutProps> = ({ data, id }) => {
  const headerRef = useRef() as RefObject<HTMLDivElement>;
  const dimensions = useSize(headerRef);

  return (
    <Box>
      <Head title="Bike Point | Checkout" />
      <Header ref={headerRef} />
      <Stack
        direction={["column-reverse", "column-reverse", "row"]}
        bg="gray.600"
        minH={dimensions ? `calc(100vh - ${dimensions.height}px)` : undefined}
      >
        <CreditCard data={data} id={id} />
        <Summary data={data} />
      </Stack>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  const id = params?.id as string;

  const res = await api.get<ClientData | string>("linkpagamento", {
    params: {
      hash_id: id,
    },
  });

  if (typeof res.data === "string") {
    return {
      notFound: true,
    };
  }

  const data = res.data;
  data.status = "pendente";

  return {
    props: {
      data,
      id,
    },
  };
};

export default Checkout;

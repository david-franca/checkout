import { formatCurrency } from "@/helpers";
import { FormatedClientData } from "@/models/checkout.models";
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";

interface SummaryProps {
  data: FormatedClientData;
}

export const Summary = ({ data }: SummaryProps) => {
  return (
    <Box w="full" p={16}>
      <Stack>
        <Heading as="h3" size="lg" color="gray.50">
          Resumo do Pedido
        </Heading>
        <Heading as="h3" size="md" color="gray.50">
          #{data.merchantOrderId}
        </Heading>
      </Stack>
      <Box py={4}>
        <HStack>
          <Text as="b" color="gray.50" fontSize="md">
            Cliente
          </Text>
          <Spacer />
          <Text color="gray.50" fontSize="md">
            {data.name}
          </Text>
        </HStack>
        <HStack>
          <Text as="b" color="gray.50" fontSize="md">
            E-mail
          </Text>
          <Spacer />
          <Text color="gray.50" fontSize="md">
            {data.email}
          </Text>
        </HStack>
      </Box>
      <Divider borderColor="gray.500" />
      <VStack pt={4} divider={<StackDivider borderColor="gray.500" />}>
        {data.itens.map((item, index) => (
          <Box key={index} w="full">
            <HStack direction="row" justifyContent="space-between">
              <Text as="b" color="gray.50" fontSize="md">
                Produto
              </Text>

              <Text color="gray.50" fontSize="md" textAlign="end">
                {item.name}
              </Text>
            </HStack>
            <HStack direction="row" justifyContent="space-between">
              <Text as="b" color="gray.50" fontSize="md">
                Quantidade
              </Text>

              <Text color="gray.50" fontSize="md">
                {item.amount}
              </Text>
            </HStack>
            <HStack direction="row" justifyContent="space-between">
              <Text as="b" color="gray.50" fontSize="md">
                Valor Unitário
              </Text>

              <Text color="gray.50" fontSize="md">
                {item.valor_item}
              </Text>
            </HStack>
            <HStack direction="row" justifyContent="space-between">
              <Text as="b" color="gray.50" fontSize="md">
                Valor Total
              </Text>

              <Text color="gray.50" fontSize="md">
                {item.valor_total_item}
              </Text>
            </HStack>
          </Box>
        ))}
      </VStack>
      <Divider py={4} borderColor="gray.500" />
      <HStack pt={8}>
        <Text as="b" color="gray.50" fontSize="lg">
          Total do Pedido
        </Text>
        <Spacer />
        <Text as="b" color="gray.50" fontSize="2xl">
          {formatCurrency(data.total)}
        </Text>
      </HStack>
    </Box>
  );
};

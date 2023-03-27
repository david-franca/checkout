import { Center, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Error() {
  return (
    <Center py={10} px={6} bg="gray.800" minH="100vh" flexDir="column" gap={8}>
      <Center flexDir="column">
        <Heading as="h2" size="xl" mt={6} mb={2} color="gray.200">
          Dados não encontrados
        </Heading>
        <Text color="gray.500">
          Por favor verifique o link ou tente novamente mais tarde.
        </Text>
      </Center>
      <Image src="warning.svg" width={300} height={300} alt="Warning" />
    </Center>
  );
}

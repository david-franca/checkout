import { Head } from "@/components/Head";
import { Box, Center, Heading, Text } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Center bg="gray.800" minH="100vh">
      <Head title="Bike Point" />
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, gray.200, gray.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2} color="gray.50">
          Página não encontrada
        </Text>
        <Text color={"gray.300"} mb={6}>
          A página que você está procurando não existe.
        </Text>
      </Box>
    </Center>
  );
}

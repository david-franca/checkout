import { Box, Flex, Heading } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box as="section">
      <Box as="nav" bg="gray.900" w="full">
        <Flex py={{ base: "4", lg: "5" }} px="4">
          <Heading as="h3" size="lg" color="gray.50">
            Logo
          </Heading>
        </Flex>
      </Box>
    </Box>
  );
};

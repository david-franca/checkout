import { Box, Flex, Heading } from "@chakra-ui/react";
import { forwardRef } from "react";

export const Header = forwardRef<HTMLDivElement>((_, forwardedRef) => (
  <Box as="section" ref={forwardedRef}>
    <Box as="nav" bg="gray.900" w="full">
      <Flex
        py={{ base: 4, lg: 5 }}
        px={{ base: 4, lg: 8 }}
        justifyContent={{ base: "center", lg: "start" }}
      >
        <Heading as="h3" size="lg" color="gray.50">
          Logo
        </Heading>
      </Flex>
    </Box>
  </Box>
));

Header.displayName = "Header";

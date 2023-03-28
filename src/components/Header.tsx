import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { forwardRef } from "react";
import logo from "../../public/logo.png";
export const Header = forwardRef<HTMLDivElement>((_, forwardedRef) => (
  <Box as="section" ref={forwardedRef}>
    <Box as="nav" bg="gray.900" w="full">
      <Flex
        px={{ base: 4, lg: 8 }}
        justifyContent={{ base: "center", lg: "start" }}
      >
        <Image src={logo} alt="Bike Point Logo" height={64} />
      </Flex>
    </Box>
  </Box>
));

Header.displayName = "Header";

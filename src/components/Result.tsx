import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import {
  CheckCircleIcon,
  CloseIcon,
  InfoIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import { useMemo } from "react";

interface ResultProps {
  status: "success" | "info" | "warning" | "error";
  title: string;
  content: string;
}

export function Result({ status, content, title }: ResultProps) {
  const Icon = useMemo(() => {
    switch (status) {
      case "success":
        return <CheckCircleIcon boxSize="50px" color="green.500" />;
      case "info":
        return <InfoIcon boxSize="50px" color="blue.500" />;
      case "warning":
        return <WarningTwoIcon boxSize="50px" color="orange.300" />;
      case "error":
        return (
          <Box display="inline-block">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg={"red.500"}
              rounded={"50px"}
              w={"55px"}
              h={"55px"}
              textAlign="center"
            >
              <CloseIcon boxSize={"20px"} color={"white"} />
            </Flex>
          </Box>
        );
      default:
        return <CheckCircleIcon boxSize="50px" color="green.500" />;
    }
  }, [status]);
  return (
    <Box textAlign="center" py={10} px={6}>
      {Icon}
      <Heading as="h2" size="xl" mt={6} mb={2} color="gray.50">
        {title}
      </Heading>
      <Text color="gray.50">{content}</Text>
    </Box>
  );
}

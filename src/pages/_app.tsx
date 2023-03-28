import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Inter } from "next/font/google";

import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });
const theme = extendTheme({
  fonts: {
    montserrat: inter.style.fontFamily,
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "gray.800",
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

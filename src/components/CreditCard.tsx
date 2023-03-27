import "react-credit-cards-2/es/styles-compiled.css";

import {
  getCreditCardNameByNumber,
  isExpirationDateValid,
  isValid,
} from "@/helpers";
import { parseLocaleNumber } from "@/helpers/parseLocaleNumber";
import {
  CardType,
  FormatedClientData,
  PaymentFormState,
} from "@/models/checkout.models";
import {
  Box,
  Button,
  Center,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import Cards from "react-credit-cards-2";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { ptForm } from "yup-locale-pt";
import {
  initializeClearSale,
  setApp,
  setSessionId,
} from "../helpers/clearSale";
import { v4 } from "uuid";

yup.setLocale(ptForm);

interface CreditCardProps {
  data: FormatedClientData;
}

interface OnFinishValues {
  total: number; // Em centavos
  type: CardType;
  parcelas: number;
  numeroCartao: string;
  nomeNoCartao: string;
  dataExpiracao: string;
  cvv: string;
  bandeira: string;
  SessionID: string;
}

type InitialValues = Omit<PaymentFormState, "focus"> & {
  installments: number;
  sessionId: string;
};

export const CreditCard = ({ data }: CreditCardProps) => {
  const installments = useMemo(
    () => Array.from(Array(data.parcelas).keys()).map((value) => value + 1),
    [data]
  );

  const uuid = useMemo(() => v4(), []);

  const [state, setState] = useState<PaymentFormState>({
    cvc: "",
    expiry: "",
    focus: "number",
    name: "",
    number: "",
  });

  const validationSchema: yup.ObjectSchema<InitialValues> = yup.object().shape({
    cvc: yup.string().min(3).max(6).required(),
    expiry: yup
      .string()
      .required()
      .test("IsValidEspiry", (e) =>
        isExpirationDateValid(
          parseInt(e.split("/")[0]),
          parseInt(e.split("/")[1])
        )
      ),
    name: yup.string().min(3).required(),
    number: yup
      .string()
      .required()
      .test("IsValidCC", (e) => isValid(e)),
    installments: yup.number().required().oneOf(installments),
    sessionId: yup.string().required(),
  });

  const initialValues: InitialValues = useMemo(
    () => ({
      cvc: "",
      expiry: "",
      name: "",
      number: "",
      installments: 0,
      sessionId: uuid,
    }),
    [uuid]
  );

  const formik = useFormik<InitialValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const paymentInfo: OnFinishValues = {
        cvv: values.cvc,
        numeroCartao: values.number,
        parcelas: values.installments,
        nomeNoCartao: values.name,
        dataExpiracao: values.expiry,
        total: data.total * 100,
        type: "CreditCard",
        bandeira: getCreditCardNameByNumber(values.number),
        SessionID: uuid,
      };
      alert(JSON.stringify(paymentInfo, null, 2));
    },
  });

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setState({ ...state, focus: e.target.name as PaymentFormState["focus"] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    initializeClearSale(
      window,
      document,
      "script",
      "//device.clearsale.com.br/p/fp.js",
      "csdp"
    );

    const csdp = window.csdp;
    setApp(csdp, "idffuw0lim2kv1uljzei");
    setSessionId(csdp, uuid);
  }, [uuid]);

  return (
    <Box w="full" p={16} bg="gray.800">
      <Heading as="h3" size="lg" color="gray.50" pb={8}>
        Dados do Pagamento
      </Heading>
      <Box pb={8}>
        <Cards
          cvc={state.cvc}
          expiry={state.expiry}
          focused={state.focus}
          name={state.name}
          number={state.number}
          placeholders={{ name: "Seu nome aqui" }}
        />
      </Box>

      <chakra.form onSubmit={formik.handleSubmit} noValidate>
        <FormControl
          id="number"
          isRequired
          pb={8}
          color="gray.50"
          isInvalid={formik.touched.number && Boolean(formik.errors.number)}
        >
          <FormLabel>NÚMERO DO CARTÃO</FormLabel>
          <Input
            as={InputMask}
            name="number"
            mask="9999 9999 9999 9999999"
            maskChar=""
            type="text"
            value={formik.values.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <FormErrorMessage ms="4px">
            {formik.touched.number && formik.errors.number}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="name"
          isRequired
          pb={8}
          color="gray.50"
          isInvalid={formik.touched.name && Boolean(formik.errors.name)}
        >
          <FormLabel>NOME IMPRESSO NO CARTÃO</FormLabel>
          <Input
            type="text"
            name="name"
            value={formik.values.name.toUpperCase()}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <FormErrorMessage ms="4px">
            {formik.touched.name && formik.errors.name}
          </FormErrorMessage>
        </FormControl>
        <SimpleGrid columns={2} spacing={8}>
          <FormControl
            id="expiry"
            isRequired
            pb={8}
            color="gray.50"
            isInvalid={formik.touched.expiry && Boolean(formik.errors.expiry)}
          >
            <FormLabel>VALIDADE</FormLabel>
            <Input
              as={InputMask}
              mask="99/2099"
              maskChar=""
              type="text"
              name="expiry"
              value={formik.values.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <FormErrorMessage ms="4px">
              {formik.touched.expiry && formik.errors.expiry}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="cvc"
            isRequired
            pb={8}
            color="gray.50"
            isInvalid={formik.touched.cvc && Boolean(formik.errors.cvc)}
          >
            <FormLabel>CVV / CVC</FormLabel>
            <Input
              type="text"
              name="cvc"
              value={formik.values.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <FormErrorMessage ms="4px">
              {formik.touched.cvc && formik.errors.cvc}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>
        <FormControl
          id="installments"
          pb={8}
          color="gray.50"
          isRequired
          isInvalid={
            formik.touched.installments && Boolean(formik.errors.installments)
          }
        >
          <FormLabel>NÚMERO DE PARCELAS</FormLabel>
          <Select
            value={formik.values.installments}
            onChange={formik.handleChange}
          >
            <option style={{ color: "black" }} value={0} disabled>
              Selecione
            </option>
            {installments.map((installment, index) => (
              <option
                key={index}
                value={installment}
                style={{ color: "black" }}
              >{`${installment}x`}</option>
            ))}
          </Select>
          <FormErrorMessage ms="4px">
            {formik.touched.installments && formik.errors.installments}
          </FormErrorMessage>
        </FormControl>
        <Center pb={4}>
          <Button type="submit" colorScheme="teal">
            Finalizar Compra
          </Button>
        </Center>
      </chakra.form>
    </Box>
  );
};

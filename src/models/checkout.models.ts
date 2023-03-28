import { Focused } from "react-credit-cards-2";

export type CardType = "CreditCard";

export type PaymentFormState = {
  cvc: string;
  expiry: string;
  focus: Focused;
  name: string;
  number: string;
};

export interface Item {
  amount: number;
  valor_item: number;
  name: string;
  valor_total_item: number;
}

type Status = "pendente" | "cancelado" | "analise" | "concluido";

interface Phone {
  type: number;
  ddd: number;
  number: number;
}

interface Address {
  street: string;
  number: string;
  city: string;
  state: string;
  zipcode: string;
}

interface Shipping {
  type: number;
  primaryDocument: string;
  name: string;
  phones: Phone[];
}

interface Payment {
  type: number;
  card?: {
    bin: string;
    end: string;
    ownerName: string;
  };
}

export interface Antifraude {
  code: string;
  email: string;
  totalValue: number;
  billing: {
    type: number;
    primaryDocument: string;
    name: string;
    address: Address;
    phones: Phone[];
  };
  shipping: Shipping;
  payments: Payment[];
  items: Item[];
}

export interface ClientData {
  merchantOrderId: string;
  total: number;
  adquirente: string;
  parcelas: number;
  email: string;
  name: string;
  ci_merchant: number;
  antifraude: Antifraude;
  status: Status;
}

export interface FormatedItem {
  amount: number;
  valor_item: string;
  name: string;
  valor_total_item: string;
}

export interface FormatedClientData {
  merchantOrderId: string;
  total: number;
  adquirente: string;
  parcelas: number;
  email: string;
  name: string;
  itens: FormatedItem[];
  type?: CardType;
  ci_merchant?: 1;
  numeroCartao?: string;
  nomeNoCartao?: string;
  dataExpiracao?: string;
  cvv?: string;
  bandeira?: string;
  antifraude?: Antifraude;
}

export type OnFinishValues = Omit<ClientData, "status"> & {
  type: CardType;
  ci_merchant: number;
  numeroCartao: string;
  nomeNoCartao: string;
  dataExpiracao: string;
  cvv: string;
  bandeira: string;
  SessionId: string;
  antifraude: Antifraude;
};

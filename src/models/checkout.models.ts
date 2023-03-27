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

export interface ClientData {
  merchantOrderId: string;
  total: number;
  adquirente: string;
  parcelas: 3;
  email: string;
  name: string;
  itens: Item[];
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
  parcelas: 3;
  email: string;
  name: string;
  itens: FormatedItem[];
}

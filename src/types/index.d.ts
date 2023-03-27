declare module "react-credit-cards-2" {
  export interface CallbackArgument {
    issuer: string;
    maxLength: number;
  }

  export type Focused = "name" | "number" | "expiry" | "cvc";

  export interface ReactCreditCardProps {
    acceptedCards?: ReadonlyArray<string> | undefined;
    callback?: ((type: CallbackArgument, isValid: boolean) => void) | undefined;
    cvc: string | number;
    expiry: string | number;
    focused?: Focused | undefined;
    issuer?: string | undefined;
    locale?: { valid: string } | undefined;
    name: string;
    number: string | number;
    placeholders?: { name: string } | undefined;
    preview?: boolean | undefined;
  }

  declare class ReactCreditCard extends React.Component<
    ReactCreditCardProps,
    never
  > {}

  export default ReactCreditCard;
}

interface Window {
  csdp: (...args: any[]) => void;
  CsdpObject: any;
}

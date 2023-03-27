import { CARDS, CreditCard } from "./cards";

const MILLENNIUM = 1000;
const DEFAULT_CODE_LENGTH = 3;

export const getCreditCardNameByNumber = (number: string): string => {
  return findCreditCardObjectByNumber(number).name || "Credit card is invalid!";
};

export const isSecurityCodeValid = (
  creditCardNumber: string,
  securityCode: string
): boolean => {
  const numberLength = getCreditCardCodeLengthByNumber(creditCardNumber);
  return new RegExp(`^[0-9]{${numberLength}}$`).test(securityCode);
};

export const isExpirationDateValid = (month: number, year: number): boolean => {
  return (
    isValidMonth(month) &&
    isValidYear(year) &&
    isFutureOrPresentDate(month, year)
  );
};

export const isValid = (
  number: string,
  options: { cards?: string[] } = {}
): boolean => {
  const { cards } = options;
  const rawNumber = removeNonNumbersCaracteres(number);

  if (hasSomeInvalidDigit(number) || !hasCorrectLength(rawNumber)) {
    return false;
  }

  const sum = sumNumber(rawNumber);

  return checkSum(sum) && validateCardsWhenRequired(number, cards);
};

function validateCardsWhenRequired(number: string, cards?: string[]): boolean {
  return !cards || !cards.length || validateCards(number, cards);
}

function validateCards(number: string, cards: string[]): boolean {
  return (
    areCardsSupported(cards) &&
    cards
      .map((c) => c.toLowerCase())
      .includes(getCreditCardNameByNumber(number).toLowerCase())
  );
}

function hasCorrectLength(number: string) {
  return number.length <= 19;
}

function removeNonNumbersCaracteres(number: string): string {
  return number.replace(/\D/g, "");
}

function hasSomeInvalidDigit(creditcardNumber: string): boolean {
  const invalidDigits = new RegExp("[^0-9- ]");
  return invalidDigits.test(creditcardNumber);
}

function checkSum(sum: number): boolean {
  return sum > 0 && sum % 10 === 0;
}

function areCardsSupported(passedCards: string[]): boolean {
  const supportedCards = CARDS.map((c) => c.name.toLowerCase());
  return passedCards.every((c) => supportedCards.includes(c.toLowerCase()));
}

function findCreditCardObjectByNumber(number: string): CreditCard {
  if (!number) return {} as CreditCard;
  const numberOnly = number.replace(/[^\d]/g, "");
  return CARDS.find((card) => card.bins.test(numberOnly)) || ({} as CreditCard);
}

function getCreditCardCodeLengthByNumber(number: string): number {
  return findCreditCardObjectByNumber(number).codeLength || DEFAULT_CODE_LENGTH;
}

function isValidMonth(month: number): boolean {
  return !isNaN(month) && month >= 1 && month <= 12;
}

function isValidYear(year: number): boolean {
  return !isNaN(year) && isValidFullYear(formatFullYear(year));
}

function formatFullYear(year: number): number {
  if (year.toString().length === 2) return dateRange(year);

  return year.toString().length === 4 ? Number(year) : 0;
}

function dateRange(increaseYear: number | string = 0): number {
  const year = parseInt(increaseYear.toString());
  const today = new Date();
  return Math.floor(today.getFullYear() / MILLENNIUM) * MILLENNIUM + year;
}

function isValidFullYear(year: number): boolean {
  return year >= dateRange() && year <= dateRange(MILLENNIUM);
}

function isFutureOrPresentDate(month: number, year: number): boolean {
  const fullYear = formatFullYear(year);
  const currentDate = new Date();
  const expirationDate = new Date();

  currentDate.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), 1);
  expirationDate.setFullYear(fullYear, month - 1, 1);

  return currentDate <= expirationDate;
}

function sumNumber(number: string): number {
  const computed = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  let sum = 0;
  let digit = 0;
  let i = number.length;
  let even = true;

  while (i--) {
    digit = Number(number[i]);
    sum += (even = !even) ? computed[digit] : digit;
  }

  return sum;
}

import { SearchParamsType } from "./types";

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatCurrencyWithSuffix = (amount: number | null) => {
  const value = amount || 0;

  if (value >= 1000) {
    const formattedAmount = value / 1000;
    if (value % 1000 !== 0) {
      return `$${Math.floor(formattedAmount)}k+`;
    } else {
      return `$${formattedAmount}k`;
    }
  }

  return formatCurrency(value);
};

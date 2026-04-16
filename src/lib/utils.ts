import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatCrypto = (value: number) => {
  if (value < 0.000001) return value.toExponential(4);
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 6,
  }).format(value);
};

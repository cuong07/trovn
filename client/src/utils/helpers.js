import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount) => {
  let millions = amount / 1e6;
  millions = millions.toFixed(2);
  return millions + " triệu";
};

export const getTerm = (term) => {
  switch (term) {
    case "BOTH":
      return "Cho thuê ngắn hạn và dài hạn";
    case "LONG":
      return "Cho thuê dài hạn";
    case "SHORT":
      return "Cho thuê ngắn hạn";
    default:
      break;
  }
};

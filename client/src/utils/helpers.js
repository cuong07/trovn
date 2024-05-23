import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount) => {
  if (amount >= 1e6) {
    let millions = amount / 1e6;
    millions = millions.toFixed(2);
    return millions + " triệu";
  } else if (amount >= 1e5) {
    let hundredsOfThousands = amount / 1e5;
    hundredsOfThousands = hundredsOfThousands.toFixed(0);
    return hundredsOfThousands + " trăm";
  } else if (amount >= 1e3) {
    let thousands = amount / 1e3;
    thousands = thousands.toFixed(0);
    return thousands + " nghìn";
  } else {
    return amount + " đồng";
  }
};

export const formatCurrency = (number) => {
  return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
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

export const convertArrayToFiles = (files) => {
  return files.map((file) => {
    const fileObj = new File([file], file.name, { type: file.type });
    return fileObj;
  });
};

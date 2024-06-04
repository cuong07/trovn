export const formatCurrency = (number) => {
    return number.toLocaleString("vi", { style: "currency", currency: "VND" });
};

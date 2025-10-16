function formatPrice(price, currency) {
  const formattedPrice = Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currency || "MXN",
    minimumFractionDigits: 0,
  }).format(price);
  return formattedPrice;
}

export { formatPrice };

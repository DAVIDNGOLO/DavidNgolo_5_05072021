function currencyPrice(price) {
  const priceFormat = new Intl.NumberFormat("FR", { style: "currency", currency: "EUR" }).format(price / 100); // '100,00€'
  return priceFormat;
}

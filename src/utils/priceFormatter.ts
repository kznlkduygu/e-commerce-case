export function priceFormatter(price: string): string {
  const numericPrice = parseFloat(price);
  return numericPrice.toFixed(2);
}

export function parsePriceToCents(price: string): number {
  const cleaned = price
    .replace(/[^0-9,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const value = Number(cleaned);
  return isNaN(value) ? 0 : Math.round(value * 100);
}

export const convertCentsToEuro = (priceInCents: number) =>
  (priceInCents / 100).toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

export interface SKU {
  skuId: string;
  name: string;
  priceInCents: number;
  skuCode: string;
}

export async function getSKUList(): Promise<SKU[]> {
  const response = await fetch("/services/sku/list");
  if (!response.ok) {
    throw new Error("Failed to fetch SKU list");
  }
  return response.json();
}

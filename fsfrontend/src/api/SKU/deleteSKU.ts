export async function deleteSKU(skuId: string): Promise<void> {
  await fetch(`/services/sku/delete/${skuId}`, { method: "DELETE" });
}

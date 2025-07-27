import type { WarehouseListDTO } from "@/types/dtos";

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  capacity: number;
}

export async function getWarehouseList(): Promise<WarehouseListDTO[]> {
  const response = await fetch("/services/warehouse/list");
  if (!response.ok) {
    throw new Error("Failed to fetch warehouse list");
  }
  return response.json();
}

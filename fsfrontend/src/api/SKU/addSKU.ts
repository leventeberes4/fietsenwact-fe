import type { RequestError } from "../../types";
import type { SKUUpdateType } from "./updateSKUbyId";

export interface AddSKURequest {
  data: SKUUpdateType;
}

export interface AddSKUResponse {
  success: boolean;
  message?: string;
}
export interface AddSKUError extends RequestError {}

export async function addSKU({ data }: AddSKURequest): Promise<AddSKUResponse> {
  try {
    const response = await fetch(`/services/sku/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // Throw an object with a 'success' property so useMutation treats it as an error

      throw await response.json();
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    // Ensure error is thrown so useMutation's onError is triggered
    throw error;
  }
}

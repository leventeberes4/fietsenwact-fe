export interface UpdateSKURequest {
  skuId: string;
  data: SKUUpdateType;
}
export type SKUType = {
  name: string;
  priceInCents: string;
  skuCode: string;
};
export type SKUUpdateType = {
  name: string;
  priceInCents: number;
  skuCode: string;
};

export interface UpdateSKUResponse {
  success: boolean;
  message?: string;
  updatedSKU?: Record<string, any>;
}

export async function updateSKUbyId({
  data,
  skuId,
}: UpdateSKURequest): Promise<UpdateSKUResponse> {
  try {
    const response = await fetch(`/services/sku/update/${skuId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

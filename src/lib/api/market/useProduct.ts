import apiClient from "../axios";

interface UseProductRequest {
  productId: string;
}

interface UseProductResponse {
  productId: string;
}

export const useProduct = async ({ productId }: UseProductRequest): Promise<UseProductResponse> => {
  console.log(productId);
  try {
    const response = await apiClient.post("/api/store/inventory/use", { productId });
    if (response.status !== 200) {
      throw new Error("Failed to use product");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to use product", error);
    throw error;
  }
};

import apiClient from "../axios";

export interface StoreItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
  imageUrl: string;
}

export const getStoreItems = async (type: string): Promise<StoreItem[]> => {
  try {
    const response = await apiClient.get(`/api/store?type=${type}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch store items");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch store items", error);
    return [];
  }
};

// [
//   {
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "name": "string",
//     "price": 0,
//     "quantity": 0,
//     "type": "string",
//     "imageUrl": "string"
//   }
// ]

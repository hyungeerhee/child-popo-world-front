import apiClient from "@/lib/api/axios";

export const getQuest = async (questType: string) => {
  try {
    const response = await apiClient.get(`/api/quest?type=${questType}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quest:", error);
    throw error;
  }
};  
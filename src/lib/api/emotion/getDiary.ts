import apiClient from "../axios";

export const getDiary = async () => {
  try {
    const response = await apiClient.get("/api/diary");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

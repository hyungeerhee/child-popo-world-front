import apiClient from "../axios";


export const postDiary = async ({emotion, description}: {emotion: string, description: string}) => {
    try {
      const response = await apiClient.post("/api/diary", {emotion, description});
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
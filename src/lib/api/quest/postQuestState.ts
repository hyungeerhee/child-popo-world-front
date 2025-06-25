import apiClient from "../axios";

export const postQuestState = async (questId: string, childId: string, state: string) => {
  const response = await apiClient.post(`/api/quest/state`, {
    questId,
    childId,
    state,
  });
  return response.data;
};
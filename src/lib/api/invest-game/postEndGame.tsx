import apiClient, { ApiError } from "../axios";
import { useAuthStore } from "@/lib/zustand/authStore";
import { INITIAL_CHAPTER_DATA } from "@/page/investing/game";

export async function postEndGame(
  sessionId: string,
  chapterId: string,
  isSuccess: boolean,
  profitValue: number
){
  const { point, setPoint } = useAuthStore.getState();

  try {
    const response = await apiClient.post(`/api/invest/clear/chapter`, {
      chapterId: chapterId,
      sessionId: sessionId,
      success: isSuccess,
      profit: profitValue,
    });

    const FindedChapter = Object.keys(INITIAL_CHAPTER_DATA).find(key => INITIAL_CHAPTER_DATA[key].id === chapterId);
    
    if(isSuccess && FindedChapter) {
      if(point !== null) setPoint(point + INITIAL_CHAPTER_DATA[FindedChapter].price + profitValue);
    }
    
    console.log("게임 종료:", response.data);
    return response.data 
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("게임 종료 실패:", error.message);
      return error.message;
    }
    console.error("예상치 못한 에러:", error);
    return "예상치 못한 에러가 발생했습니다.";
  }
}

import apiClient, { ApiError } from "../axios";
import { useAuthStore } from "@/lib/zustand/authStore";
import { INITIAL_CHAPTER_DATA } from "@/page/investing/game";


type EndGameResult = {
  success: boolean;
  message: string;
};

export async function endGame(
  sessionId: string,
  chapterId: string,
  isSuccess: boolean,
  profitValue: number
): Promise<EndGameResult> {
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
    return { success: true, message: response.data };
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("게임 종료 실패:", error.message);
      return { success: false, message: error.message };
    }
    console.error("예상치 못한 에러:", error);
    return { success: false, message: "예상치 못한 에러가 발생했습니다." };
  }
}

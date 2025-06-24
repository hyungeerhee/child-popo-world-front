import apiClient, { ApiError } from "../axios";

interface ChapterData {
  sessionId: string;
  story: string;
}



export async function getChapterData(chapterId: string): Promise<ChapterData | null> {
  try {
    console.log("chapterId", chapterId);
    const response = await apiClient.post("/api/invest/chapter", {
      chapterId: chapterId,
    });

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("챕터 데이터 조회 실패:", error.message);
    }
    console.error("예상치 못한 에러:", error);
    return null;
  }
}

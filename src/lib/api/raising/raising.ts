import apiClient from "../axios";

// 먹이 타입 정의
export interface Feed {
  productId: string;
  name: string;
  imageUrl: string;
  stock: number;
  type: string;
  exp: number;
  price: number;
}

// 포포 키우기 응답 타입
export interface FeedsResponse {
  currentLevel: number;
  currentExperience: number;
  totalExperience: number;
  availableFeeds: Feed[];
}

// 먹이 주기 요청 타입
export interface FeedRequest {
  feedItems: {
    productId: string;
    amount: number;
  }[];
}

// 먹이 주기 응답 타입
export interface FeedResponse {
  newLevel: number;
  currentExperience: number;
  totalExperience: number;
  gainedExperience: number;
  levelUp: boolean;
  fedItems: string[];
  message: string;
}

// 먹이 목록 조회
export const getFeeds = async (): Promise<FeedsResponse> => {
  try {
    const response = await apiClient.get<FeedsResponse>("/api/popo/feeds");
    return response.data;
  } catch (error) {
    console.error("먹이 목록 조회 실패:", error);
    throw error;
  }
};

// 먹이 주기
export const feedPopo = async (feedItems: FeedRequest["feedItems"]): Promise<FeedResponse> => {
  try {
    const response = await apiClient.post<FeedResponse>("/api/popo/feed", {
      feedItems
    });
    return response.data;
  } catch (error) {
    console.error("먹이 주기 실패:", error);
    throw error;
  }
}; 
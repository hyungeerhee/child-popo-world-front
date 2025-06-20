import { Routes, Route } from "react-router-dom";
import Main from "@/page/main";
import Investing from "@/page/investing";
import Market from "@/page/market";
import Savings from "@/page/savings";
import Quest from "@/page/quest";
import QuestDetail from "@/page/quest/detail";
import QuestComplete from "./page/quest/complete/QuestComplete";
import Raising from "@/page/raising";
import EmotionDiary from "@/page/emotionDiary";
import DiaryWrite from "@/page/emotionDiary/write";
import Attandance from "@/page/attandance";
import Quiz from "@/page/quiz";
import NotFound from "@/page/notfound";
import InvestingGame from "@/page/investing/game";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ParentShop from "./page/market/parent-shop";
import NpcShop from "./page/market/npc-shop";
import Inventory from "./page/market/inventory";
import ProtectedRouter from "@/components/auth/ProtectedRouter";
import LoginPage from "./page/auth/login";
import RegisterPage from "./page/auth/register";
import { BrowserRouter } from "react-router-dom";
// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패시 1번만 재시도
      refetchOnWindowFocus: false, // 윈도우 포커스시 자동 리페치 비활성화
      staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 신선한 상태로 유지
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRouter />}>
            <Route index element={<Main />} />
            {/* 투자 */}
            <Route path="/investing">
              <Route index element={<Investing />} />
              <Route path="game/:gametype" element={<InvestingGame />} />
            </Route>
            {/* 시장 */}
            <Route path="/market">
              <Route index element={<Market />} />
              <Route path="parent" element={<ParentShop />} />
              <Route path="npc" element={<NpcShop />} />
              <Route path="inventory" element={<Inventory />} />
            </Route>
            <Route path="/savings" element={<Savings />} />
            {/* 퀘스트 */}
            <Route path="/quest">
              <Route index element={<Quest />} />
              <Route path="detail/:questType" element={<QuestDetail />} />
              <Route path="detail/complete" element={<QuestComplete />} />
            </Route>
            {/* 포포 키우기 */}
            <Route path="/raising" element={<Raising />} />
            {/* 감정일기 */}
            <Route path="/emotionDiary">
              <Route index element={<EmotionDiary />} />
              <Route path="write" element={<DiaryWrite />}></Route>
            </Route>
            <Route path="/attandance" element={<Attandance />} />
            <Route path="/quiz" element={<Quiz />} />
          </Route>
          {/* 로그인 */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

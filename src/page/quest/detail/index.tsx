import { QuestDetailTemplate } from "@/module/quest/template/QuestDetailTemplate";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Quest } from "@/module/quest/types/quest";
import apiClient, { ApiError } from "@/lib/api/axios";
import { StateChangeModal } from "@/module/quest/components/StateChangeModal";
import { useAuthStore } from "@/lib/zustand/store";

const questStateMap: Record<string, Quest["state"]> = {
  PENDING_ACCEPT: "수락하기",
  IN_PROGRESS: "다 했어요",
  PENDING_APPROVAL: "기다리는 중",
  APPROVED: "돈 받기",
  COMPLETED: "완료!",
  EXPIRED: "만료!",
};

const serverQuestStateMap: Record<Quest["state"], string> = {
  수락하기: "IN_PROGRESS",
  "다 했어요": "PENDING_APPROVAL",
  "기다리는 중": "",
  "돈 받기": "COMPLETED",
  "완료!": "",
  "만료!": "",
};

const nextStateMap: Record<Quest["state"], Quest["state"] | undefined> = {
  수락하기: "다 했어요",
  "다 했어요": "기다리는 중",
  "기다리는 중": undefined,
  "돈 받기": "완료!",
  "완료!": undefined,
  "만료!": undefined,
};

const MatchModalText: Record<string, string> = {
  수락하기: "이 퀘스트를 수락할래?",
  "다 했어요": "퀘스트를 완료했어?",
};

export default function QuestDetail() {
  const { questType } = useParams() as { questType: string };
  const navigate = useNavigate();
  const [questData, setQuestData] = useState<Quest[]>([]);
  const [selectedState, setSelectedState] = useState<Quest["state"] | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");
  const [pendingChange, setPendingChange] = useState<{
    questId: string;
    childId: string;
    state: Quest["state"];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setPoint } = useAuthStore();

  const total = questData.filter(
    (q) =>
      q.state === "기다리는 중" ||
      q.state === "다 했어요" ||
      q.state === "돈 받기" ||
      q.state === "완료!"
  ).length;
  const completed = questData.filter((q) => q.state === "완료!").length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // 퀘스트 목록 조회후 퀘스트 데이터 저장
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(
          `/api/quest?type=${questType}`
        );

        const data = await response.data;
        console.log(data);
        setPoint(data.currentPoint);
        const mapped = data.quests.map((item: any) => ({
          ...item,
          state: questStateMap[item.state],
        }));
        const sorted = sortQuests(mapped);
        setQuestData(sorted);
      } catch (err: any) {
        setError(err.message || "알 수 없는 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [questType]);

  // 퀘스트 정렬하기
  const sortQuests = (quests: Quest[]) => {
    const stateOrder: Quest["state"][] = [
      "돈 받기",
      "다 했어요",
      "수락하기",
      "기다리는 중",
      "완료!",
      "만료!",
    ];

    return quests.sort((a, b) => {
      const stateA = stateOrder.indexOf(a.state);
      const stateB = stateOrder.indexOf(b.state);
      if (stateA !== stateB) return stateA - stateB;
      return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
    });
  };

  // 완료 버튼
  const handleComplete = useCallback(() => {
    navigate("/quest/detail/complete", {
      state: { questType },
    });
  }, [navigate, questType]);

  // 뒤로가기 버튼
  const handleBack = () => {
    navigate("/quest");
  };

  // 퀘스트 상태 변경 클릭
  const handleChangeState = (
    questId: string,
    childId: string,
    state: Quest["state"]
  ) => {
    const modalMessage = MatchModalText[state];
    if (modalMessage) {
      // 수락하기, 다 했어요 눌렀을 경우 모달창
      setModalText(modalMessage);
      setIsModalOpen(true);
      setPendingChange({ questId, childId, state });
    } else {
      // 완료 버튼 클릭시 모달창 없이 바로 상태 변경
      proceedChangeState(questId, childId, state);
    }
  };

  // 상태 변경하기 api 요청
  const proceedChangeState = async (
    questId: string,
    childId: string,
    state: Quest["state"]
  ) => {
    const serverState = serverQuestStateMap[state];
    if (!serverState) return;

    const body = { questId, childId, state: serverState };
    console.log("상태 변경 요청 body:", body);

    try {
      await apiClient.post("/api/quest/state", body);

      const nextState = nextStateMap[state];
      if (!nextState) return;

      setQuestData((prev) =>
        prev.map((quest) =>
          quest.quest_id === questId ? { ...quest, state: nextState } : quest
        )
      );

      // reward 저장
      console.log(state);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류 발생");
      }
    } finally {
      setLoading(false);
    }
  };

  // 모달창에서 확인 버튼 클릭
  const handleModalConfirm = () => {
    if (pendingChange) {
      proceedChangeState(
        pendingChange.questId,
        pendingChange.childId,
        pendingChange.state
      );
    }
    setPendingChange(null);
    setIsModalOpen(false);
  };

  const filteredQuestData = selectedState
    ? questData.filter((q) => q.state === selectedState)
    : questData;

  return (
    <div>
      {!loading && !error && (
        <>
          <QuestDetailTemplate
            questType={questType}
            questData={filteredQuestData}
            selectedState={selectedState}
            onSelectState={(state) =>
              setSelectedState((prev) => (prev === state ? null : state))
            }
            onComplete={handleComplete}
            onBack={handleBack}
            onChangeState={handleChangeState}
            total={total}
            completed={completed}
            percentage={percentage}
          />
          <StateChangeModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            text={modalText}
            onConfirm={handleModalConfirm}
          />
        </>
      )}
    </div>
  );
}

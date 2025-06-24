import { useNavigate } from "react-router-dom";
import { EmotionDiaryTemplate } from "../../module/emotionDiary/template";
import { useEffect, useState } from "react";
import apiClient, { ApiError } from "@/lib/api/axios";
import type { Diary } from "@/module/emotionDiary/types/diary";
import { setNewAudio, stopBackgroundMusic, playButtonSound } from "@/lib/utils/sound";
import { useSoundStore } from "@/lib/zustand/soundStore";
import EmotionDiaryBackgroundMusic from "@/assets/sound/diary.mp3";

export default function EmotionDiaryPage() {
  const navigate = useNavigate();

  const [diaryData, setDiaryData] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWrittenToday, setIsWrittenToday] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const { isMuted, audio } = useSoundStore();

  useEffect(() => {
    setNewAudio(EmotionDiaryBackgroundMusic, 0.6);
  }, []);
  // 음소거 상태 변경시 배경음악 정지 또는 재생
  useEffect(() => {
    if (isMuted && audio) stopBackgroundMusic();
    if (isMuted && !audio) return;

    if (audio && !isMuted) {
      audio.play();
    }
  }, [isMuted, audio]);
  
  // 작성한 일기 목록 조회
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get("/api/diary");
        const data = response.data;

        setDiaryData(data);
        setIsWrittenToday(isTodayDiaryExists(data));
        console.log(data);
      } catch (err: any) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류 발생");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 왼쪽 화살표
  const handlePrevMonth = () => {
    playButtonSound();
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  // 오른쪽 화살표
  const handleNextMonth = () => {
    playButtonSound();
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // 일기 월별 필터링
  const filteredDiaryData = diaryData.filter((diary) => {
    const createdAt = new Date(diary.createdAt);
    return (
      createdAt.getFullYear() === currentDate.getFullYear() &&
      createdAt.getMonth() === currentDate.getMonth()
    );
  });

  // 오늘의 일기 작성 유무
  const isTodayDiaryExists = (diaryList: Diary[]) => {
    const today = new Date().toISOString().slice(0, 10);
    return diaryList.some((diary) => diary.createdAt.startsWith(today));
  };

  // 작성하기 버튼 클릭
  const handleClickWrite = () => {
    playButtonSound();
    if (isWrittenToday) {
      // 오늘의 일기를 작성했다면 모달창 true
      setIsModalOpen(true);
    } else {
      // 일기 작성 페이지
      navigate("/emotionDiary/write");
    }
  };

  // 모달창 닫기
  const handleCloseModal = () => {
    playButtonSound();
    setIsModalOpen(false);
  };

  // 뒤로가기
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      {!loading && !error && (
        <EmotionDiaryTemplate
          onBack={handleBack}
          diaryData={filteredDiaryData}
          onClickWrite={handleClickWrite}
          isModalOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      )}
    </div>
  );
}

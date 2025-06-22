import { QuestTemplate } from "../../module/quest/template";
import { useNavigate } from "react-router-dom";
import { playButtonSound, setNewAudio, stopBackgroundMusic } from "@/lib/utils/sound";
import { useEffect } from "react";
import { useSoundStore } from "@/lib/zustand/soundStore";
import QuestBackgroundMusic from "@/assets/sound/quest.mp3";

export default function QuestPage() {
  const navigate = useNavigate();
  const { isMuted, audio } = useSoundStore();


   // 첫페이지 로드시 배경음악 설정
   useEffect(() => {
    console.log("audio.name", audio?.name);
    if(audio?.name !== QuestBackgroundMusic) {
      setNewAudio(QuestBackgroundMusic, 0.6);
    }
  }, []);

  // 음소거 상태 변경시 배경음악 정지 또는 재생
  useEffect(() => {
    if (isMuted && audio) stopBackgroundMusic();
    if (isMuted && !audio) return;

    if (audio && !isMuted) {
      audio.play();
    }
  }, [isMuted, audio]);
    

  const onClickQuest = (questType: string) => {
    playButtonSound();
    navigate(`/quest/detail/${questType}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  return <QuestTemplate onClickQuest={onClickQuest} onBack={handleBack} />;
}

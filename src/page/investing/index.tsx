import { useNavigate } from "react-router-dom";
import { InvestingTemplate } from "../../module/investing/template";
import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/zustand/authStore";
import { playButtonSound, setNewAudio, stopBackgroundMusic } from "@/lib/utils/sound";
import ClickSound from "@/assets/sound/button_click.mp3";
import { useSoundStore } from "@/lib/zustand/soundStore";
import InvestingBackgroundMusic from "@/assets/sound/invest.mp3";
import { IMAGE_URLS } from "@/lib/constants/constants";

export const chaptersInfo = {
  "little-pig":{
    sirenImage: IMAGE_URLS.investing_game.little_pig.little_siren_pig,
    newsImage: IMAGE_URLS.investing_game.little_pig.little_news_pig,
    name: "아기돼지 삼형제",
    price: 700,
  },
  "truck":{
    sirenImage: IMAGE_URLS.investing_game.base.siren_popo,
    newsImage: IMAGE_URLS.investing_game.base.news_popo,
    name: "푸드트럭 왕국",
    price: 1000,
  },
  "masic":{
    sirenImage: IMAGE_URLS.investing_game.base.siren_popo,
    newsImage: IMAGE_URLS.investing_game.base.news_popo,
    name: "마법 왕국",
    price: 700,
  },
  "ninja":{
    sirenImage: IMAGE_URLS.investing_game.base.siren_popo,
    newsImage: IMAGE_URLS.investing_game.base.news_popo,
    name: "달빛 도둑",
    price: 2000,
  },
}


export default function InvestingPage() {
  const navigate = useNavigate();
  const animation = useAnimation();
  const { point } = useAuthStore();
  const [isGameStartModalOpen, setIsGameStartModalOpen] = useState(false);
  const [isNoPointModalOpen, setIsNoPointModalOpen] = useState(false);
  const [chapter, setChapter] = useState<string>("");
  const { isMuted, audio } = useSoundStore();
  
  useEffect(() => {
    setNewAudio(InvestingBackgroundMusic);
  }, []);
  // 음소거 상태 변경시 배경음악 정지 또는 재생
  useEffect(() => {
    if (isMuted && audio) stopBackgroundMusic();
    if (isMuted && !audio) return;

    if (audio && !isMuted) {
      audio.play();
    }
  }, [isMuted, audio]);

  const chapterPositions: Record<string, { x: number; y: number }> = {
    "little-pig": { x: -210, y: -120 },
    truck: { x: 170, y: -100 },
    masic: { x: -180, y: 100 },
    ninja: { x: 180, y: 100 },
  };

  const handleChapterClick =  (chapter: string) => {
    playButtonSound(ClickSound);
    setChapter(chapter);
    if(point == null) return;

    if(point < chaptersInfo[chapter as keyof typeof chaptersInfo].price ){
      setIsNoPointModalOpen(true);
    }
    else {
      setIsGameStartModalOpen(true);
    }
  };

  const handleGameStart = async (chapter: string) => {
    // 게임 가격만큼 포인트 차감은 게임 시작 페이지에서 진행, 즉 여기서 안함 
    setIsGameStartModalOpen(false);
    const { x, y } = chapterPositions[chapter];
    await animation.start({
      rotate: Array.from({ length: 37 }, (_, i) => i * 25),
      scale: [1, 0.95, 0.8, 0.5],
      opacity: [1, 0.8, 0.5],
      x,
      y,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    });
    navigate(`/investing/game/${chapter}?stage=game-start`);
  };

  const handleBack = () => {
    navigate("/");
  };

  //페이지 진입 시 애니메이션
  useEffect(() => {
    animation.set({ opacity: 0, x: 0, y: 200 });

    const keyframes = {
      x: [0, 10, -40, 5],
      y: [200, 110, 60, 10],
      opacity: [0.5, 1],
    };

    animation.start({
      ...keyframes,
      transition: {
        duration: 1.2,
        ease: "linear",
      },
    });
  }, []);

  return (
    <InvestingTemplate
      onBack={handleBack}
      onChapterClick={handleChapterClick}
      animation={animation}
      handleGameStart={handleGameStart}
      point={point}
      isGameStartModalOpen={isGameStartModalOpen}
      setIsGameStartModalOpen={setIsGameStartModalOpen}
      isNoPointModalOpen={isNoPointModalOpen}
      setIsNoPointModalOpen={setIsNoPointModalOpen}
      chapter={chapter}
    />
  );
}

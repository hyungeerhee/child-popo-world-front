// src/page/main/index.tsx
import { useEffect, useState } from "react";
import MainTemplate from "../../module/main/template";
import { useNavigate } from "react-router-dom";
import { useSoundStore } from "@/lib/zustand/soundStore";
import { useAuthStore } from "@/lib/zustand/store";
import { setNewAudio, stopBackgroundMusic } from "@/lib/utils/sound";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { preload } from "react-dom";
import MainBackgroundMusic from "@/assets/sound/main1.mp3";

// 섬별 위치 정보
const ISLAND_POSITIONS = {
  market: { top: "4.25rem", left: "3.25rem" },
  emotionDiary: { top: "11rem", left: "3rem" },
  raising: { top: "13.75rem", left: "8.75rem" },
  savings: { top: "14.75rem", left: "19rem" },
  quest: { top: "12rem", left: "26rem" },
  investing: { top: "5rem", left: "26rem" },
} as const;

export default function Main() {
  const { logout } = useAuthStore();
  const { toggleMute, isMuted, audio } = useSoundStore();

  // 첫페이지 로드시 배경음악 설정
  useEffect(() => {
    setNewAudio(MainBackgroundMusic, 0.4);
  }, []);

  // 음소거 상태 변경시 배경음악 정지 또는 재생
  useEffect(() => {
    if (isMuted && audio) stopBackgroundMusic();
    if (isMuted && !audio) return;

    if (audio && !isMuted) {
      audio.play();
    }
  }, [isMuted, audio]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{
    top: string;
    left: string;
  }>({
    top: "8rem",
    left: "14rem",
  });
  const [targetPath, setTargetPath] = useState<string>("");
  const [direction, setDirection] = useState<"left" | "right">("left");

  const navigate = useNavigate();

  preload(IMAGE_URLS.attandance.circle_popo, { as: "image" });
  preload(IMAGE_URLS.attandance.masic_popo, { as: "image" });

  const handleIslandClick = (
    island: keyof typeof ISLAND_POSITIONS,
    path: string,
    direction: "left" | "right" = "left"
  ) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTargetPosition(ISLAND_POSITIONS[island]);
    setTargetPath(path);
    setDirection(direction);

    if (island === "investing") {
      const investingPageImages = [
        ...Object.values(IMAGE_URLS.investing),
        ...Object.values(IMAGE_URLS.investing_game.little_pig),
        ...Object.values(IMAGE_URLS.investing_game.masic),
        ...Object.values(IMAGE_URLS.investing_game.ninja),
        ...Object.values(IMAGE_URLS.investing_game.truck),
        ...Object.values(IMAGE_URLS.investing_game.base),
      ];
      investingPageImages.forEach((image) => {
        preload(image, { as: "image" });
      });
    }

    if (island === "market") {
      const marketPageImages = [...Object.values(IMAGE_URLS.market), ...Object.values(IMAGE_URLS.items)];
      marketPageImages.forEach((image) => {
        preload(image, { as: "image" });
      });
    }

    if (island === "savings") {
      const savingsPageImages = [...Object.values(IMAGE_URLS.savings)];
      savingsPageImages.forEach((image) => {
        preload(image, { as: "image" });
      });
    }

    if (island === "raising") {
      const raisingPageImages = [...Object.values(IMAGE_URLS.raising)];
      raisingPageImages.forEach((image) => {
        preload(image, { as: "image" });
      });
    }

    if (island == "emotionDiary") {
      const emotionDiaryImages = [...Object.values(IMAGE_URLS.emotionList)];
      emotionDiaryImages.forEach((image) => {
        preload(image, { as: "image" });
      });
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    setDirection("left");

    if (targetPath === "/market") {
      return navigate("/market", { state: { from: "main" } });
    }

    if (targetPath) {
      return navigate(targetPath);
    }
  };

  return (
    <MainTemplate
      isAnimating={isAnimating}
      targetPosition={targetPosition}
      direction={direction}
      isMuted={isMuted}
      handleIslandClick={handleIslandClick}
      handleAnimationComplete={handleAnimationComplete}
      toggleMute={toggleMute}
      logout={logout}
    />
  );
}

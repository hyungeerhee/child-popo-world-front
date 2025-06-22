// src/module/investing-game/component/little-pig-component/game-out-modal.tsx
import { IMAGE_URLS } from "@/lib/constants/constants";
import { playButtonSound } from "@/lib/utils/sound";
import ClickSound from "@/assets/sound/button_click.mp3";
import backSound from "@/assets/sound/back_click.mp3";
import { Link } from "react-router-dom";
interface GameStartModalProps {
  point: number;
  gamePlayPath: string;
  onConfirm: () => void;
  onCancel: () => void;
  closeImage?: string;
  sirenImage?: string;
}

  export const GameStartModal = ({ point, gamePlayPath, onConfirm, onCancel, sirenImage = IMAGE_URLS.investing_game.base.siren_popo, closeImage = IMAGE_URLS.investing_game.base.x_popo }: GameStartModalProps) => {
  return (
    <div className="relative flex flex-col items-start px-11 mb-5 pt-7 pb-5 justify-between w-[24rem] h-[12rem]  bg-main-yellow-200 rounded-2xl border-2 lg:border-5 border-main-yellow-500">
      <h2 className="text-main-brown-850 text-xl font-bold">게임 시작</h2>
      <span className="text-main-brown-850 text-[0.8rem] font-bold">
        {point}냥을 내고 게임을 시작합니다. 
      </span>

      {/* 버튼 컨테이너 */}
      <div className="flex gap-x-2 mt-2 self-end">
        <Link to={gamePlayPath}
          onClick={() => {
            playButtonSound(ClickSound);
          }}
          className="px-4 py-1 bg-main-red-500 text-white rounded-lg text-sm font-bold  "
        >
          확인
        </Link>
        <button
          onClick={() => {
            playButtonSound(backSound);
            onCancel();
          }}
          className="px-4 py-1 bg-main-yellow-300 text-main-brown-850 rounded-lg text-sm font-bold  "
        >
          취소
        </button>
      </div>

      <img
        src={sirenImage}
        alt="게임 시작"
        className="absolute -bottom-6 -right-4 min-w-0 h-16 object-contain"
      />
    </div>
  );
};

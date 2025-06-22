import { useSoundStore } from "@/lib/zustand/soundStore";
import { playBackgroundMusic, playButtonSound, stopBackgroundMusic } from "@/lib/utils/sound";
import ClickSound from "@/assets/sound/button_click.mp3";
import { IMAGE_URLS } from "@/lib/constants/constants";

export default function SoundButton({ className }: { className?: string }) {
  const { toggleMute, isMuted } = useSoundStore();
  const defaultStyle = "absolute  left-[3.1rem] top-[0.65rem] flex flex-col items-center cursor-pointer active:scale-95 transition-all duration-300";
  return (
    <div
      className={`${className ? className : defaultStyle}`}
      onClick={() => {
        playButtonSound(ClickSound);
        toggleMute();
        if (isMuted) playBackgroundMusic();
        if (!isMuted) stopBackgroundMusic();
      }}
    >
      {isMuted ? (
        <img src={IMAGE_URLS.sound.off} alt="sound" className="w-[1.6rem]" />
      ) : (
        <img src={IMAGE_URLS.sound.on} alt="sound" className="w-[1.6rem]" />
      )}
    </div>
  );
}

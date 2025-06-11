import newsPig from "@/assets/image/investing-game/little_pig/little_news_pig.webp";
import sirenPig from "@/assets/image/investing-game/little_pig/little_siren_pig.webp";
import { memo } from "react";

interface NewsBoxProps {
  title: string;
  hint: string;
}

export const NewsBox = memo(({ title, hint }: NewsBoxProps) => {
  return (
    <div className="relative flex flex-col items-start justify-center gap-y-0.5 w-[29rem] h-[5.5rem] px-10 mb-5 bg-main-yellow-200 rounded-2xl">
      <h2 className="text-main-brown-850 text-xl font-bold">{title}</h2>
      {/* <span className="text-main-brown-850 text-[0.8rem] font-bold">{hint}</span> */}
      <img src={newsPig} alt="돼지 집" className="absolute -top-6 -left-4 min-w-0 h-15 object-contain" />
      <img src={sirenPig} alt="돼지 집" className="absolute -bottom-6 -right-4 min-w-0 h-16 object-contain" />
    </div>
  );
});

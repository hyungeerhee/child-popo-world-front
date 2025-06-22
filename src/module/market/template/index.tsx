import { Background } from "@/components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import { Link } from "react-router-dom";
import { Poni } from "../components/Poni";
import { BackArrow } from "@/components/button/BackArrow";
import { IMAGE_URLS } from "@/lib/constants/constants";
import NameAndPoint from "@/components/user/NameAndPoint";
import SoundButton from "@/components/button/SoundButton";
import { playButtonSound } from "@/lib/utils/sound";

// 포니 초기 위치
const INITIAL_POSITION = {
  right: { top: "19rem", left: "-1rem" },
  left: { top: "18rem", left: "2rem" },
};

// 포니 목표 위치
const TARGET_POSITION = {
  right: { top: "18rem", left: "2rem" },
  left: { top: "19rem", left: "-1rem" },
};

interface MarketTemplateProps {
  isAnimating: boolean;
  direction: "right" | "left";
  handleBack: () => void;
  handleAnimationComplete: () => void;
}

export const MarketTemplate = ({
  isAnimating,
  direction,
  handleBack,
  handleAnimationComplete,
}: MarketTemplateProps) => {
  return (
    <Background backgroundImage={IMAGE_URLS.market.bg}>
      {/* 뒤로가기키 */}
      <BackArrow onClick={handleBack} />
      {/* 음소거 버튼 */}
      <SoundButton />
      {/* 이름 포인트 */}
      <NameAndPoint />
      {/* 처음 페이지 방문했을때 포니 배타고 오는것 */}
      <Poni
        initialPosition={INITIAL_POSITION[direction]}
        isAnimating={isAnimating}
        targetPosition={TARGET_POSITION[direction]}
        direction={direction}
        onAnimationComplete={handleAnimationComplete}
      />
      {/* 제목 */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2">
        <TextWithStroke
          text="포포 시장"
          textClassName="text-main-yellow-450 text-[3.25rem] font-bold"
          strokeClassName="text-main-black-500 text-[3.25rem] font-bold text-stroke-width-[0.3rem] text-stroke-color-main-black-500"
        />
      </div>

      {/* npc 상점 */}
      <Link to="/market/npc" onClick={() => playButtonSound()}  >
        <div className="flex flex-col items-center justify-center absolute top-28 left-48 active:scale-95 transition-all duration-100">
          <img src={IMAGE_URLS.market.npc_shop} alt="npc_shop" className="w-32 h-32 object-contain" />
          <div className="px-4 text-[0.6rem] py-[2px] -ml-5 -mt-0.5 font-bold text-[#5C3600] bg-[#F6D8B8] border md:border-3 border-[#97774A] rounded-lg ">
            NPC 상점
          </div>
        </div>
      </Link>
      {/* 포포 창고 */}
      <Link to="/market/inventory" onClick={() => playButtonSound()}>
        <div className="flex flex-col items-center justify-center absolute top-74 left-86 active:scale-95 transition-all duration-100">
          <img src={IMAGE_URLS.market.inventory} alt="inventory" className="w-24 h-24 object-contain " />
          <div className="px-5 text-[0.6rem] py-[2px] -mt-0.5 font-bold text-[#5C3600] bg-[#F6D8B8] border md:border-3 border-[#97784A] rounded-lg ">
            창고
          </div>
        </div>
      </Link>
      {/* 부모님 상점 */}
      <Link to="/market/parent" onClick={() => playButtonSound()}>
        <div className="flex flex-col items-center justify-center absolute top-45 left-105 active:scale-95 transition-all duration-100">
          <img src={IMAGE_URLS.market.parent_shop} alt="parent_shop" className="w-24 h-24 object-contain" />
          <div className="px-4 text-[0.6rem] py-[2px] -mt-0.5 font-bold text-[#5C3600] bg-[#F6D8B8] border md:border-3 border-[#97784A] rounded-lg ">
            부모님 상점
          </div>
        </div>
      </Link>
    </Background>
  );
};

import { useAuthStore } from "@/lib/zustand/authStore";
import { TextWithStroke } from "../text/TextWithStroke";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface NameAndPointProps {
  position?: {
    top?: string;
    right?: string;
  };
  pointTextColor?: string;
}

const limitNameLength = (name: string) => {
  if (!name) return "";

  let length = 0;
  let result = "";

  for (let i = 0; i < name.length; i++) {
    const char = name[i];
    if (/[가-힣]/.test(char)) {
      length += 2;
    } else if (/[a-z]/.test(char)) {
      length += 1.1;
    } else {
      length += 1.4;
    }

    if (length <= 8) {
      result += char;
    } else {
      break;
    }
  }

  return result;
};

export default function NameAndPoint({ position, pointTextColor = "text-main-yellow-200" }: NameAndPointProps) {
  const { name, point } = useAuthStore();

  const wrapperStyle = {
    top: position?.top || "0.3rem",
    right: position?.right || "0.7rem",
  };


  return (
    <div className="absolute z-10" style={wrapperStyle}>
      {/* 이름 배경 + 이름 텍스트 */}
      <div className="relative ">
        <img src={IMAGE_URLS.common.name} alt="name" className="w-[6rem] " />
        <TextWithStroke
          className="absolute left-[2.1rem] bottom-[1.8rem] ml-[0.1rem]"
          text={limitNameLength(name || "")}
          textClassName="text-main-yellow-200 text-[0.8rem]"
          strokeClassName="text-main-brown-800 text-[0.8rem] text-stroke-width-[0.12rem] text-stroke-color-main-brown-800"
        />
      </div>

      {/* 코인 이미지 + 포인트 텍스트 */}
      <div className="flex items-center gap-[0.1rem] mt-[0.3rem] ml-[0.5rem] absolute bottom-[0.25rem] left-[0.4rem]">
        <img src={IMAGE_URLS.common.coin} alt="coin" className="w-[1.3rem]" />
        <TextWithStroke
          text={(point?.toString() || "") + "냥"}
          textClassName={`${pointTextColor} text-[0.7rem]`}
          strokeClassName="text-main-brown-800 text-[0.7rem] text-stroke-width-[0.12rem] text-stroke-color-main-brown-800"
        />
      </div>
    </div>
  );
}

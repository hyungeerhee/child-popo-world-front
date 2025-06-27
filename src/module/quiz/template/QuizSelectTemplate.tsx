import { BackArrow } from "@/components/button/BackArrow";
import SoundButton from "@/components/button/SoundButton";
import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface QuizLevelSelectTemplateProps {
  onBack: () => void;
  onClickQuiz: (difficulty: "easy" | "normal" | "hard") => void;
}

export const QuizLevelSelectTemplate = ({ onBack, onClickQuiz }: QuizLevelSelectTemplateProps) => {
  return (
    <Background backgroundImage={IMAGE_URLS.quiz.bg}>
      {/* 뒤로가기 */}
      <BackArrow onClick={onBack} />
      {/* 사운드 */}
      <SoundButton />
      {/* 중앙 콘텐츠 */}
      <div className="flex flex-col items-center w-full px-[3rem]">
        {/* 설명 박스 */}
        <div className="bg-white/70 mt-[3rem] text-[#4B3D2A] rounded-2xl shadow-xs px-[3rem] py-[1.4rem] w-[30rem] text-center mb-[1.5rem] border-[0.2rem] border-[#ffcc80]">
          <p className="text-[1.6rem] font-extrabold mb-[0.1rem]">
            퀴즈는 <span className="text-[#f85959]">하루에 딱 한 번!</span>
          </p>
          <p className="text-[1.3rem] font-semibold mb-5">
            <span className="text-[#f85959]">3문제</span>로 구성되어 있어요.
          </p>
          <p className="text-base mb-1">아래에서 원하는 난이도를 골라보세요!</p>
          <p className="text-base font-semibold text-[#5D4037]">난이도별로 보상이 달라요</p>
        </div>

        {/* 난이도 카드 */}
        <div className="flex gap-[2.4rem] justify-center">
          {[
            {
              level: "상",
              color: "#fde0e0",
              price: 300,
              titleColor: "#e53935",
              descColor: "#c62828",
              desc: "도전 고난이도!",
              type: "4지선다",
              key: "hard",
            },
            {
              level: "중",
              price:200,
              color: "#ffeacc",
              titleColor: "#ff7300",
              descColor: "#d05c10",
              desc: "고민하며 풀어요!",
              type: "3지선다",
              key: "medium",
            },
            {
              level: "하", 
              price:100,
              color: "#efffc4",
              titleColor: "#5bba2e",
              descColor: "#229014",
              desc: "쉬운 OX 문제!",
              type: "OX 퀴즈",
              key: "easy",
            },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() => onClickQuiz(item.key as "easy" | "normal" | "hard")}
              className="cursor-pointer rounded-2xl py-[1.3rem] w-[9rem] h-[9rem] bg-white shadow-lg  border-[0.2rem] flex flex-col "
              style={{ backgroundColor: item.color, borderColor: item.titleColor }}
            >
              <p className="text-xl font-extrabold text-center" style={{ color: item.titleColor }}>
                {item.level}
              </p>

              <div className=" text-xm font-semibold text-center mt-[0.5rem] gap-[0.2rem] flex justify-center items-center" style={{ color: item.titleColor }}>
                <img src={IMAGE_URLS.common.coin} alt="코인" className="w-[1.2rem] h-[1.2rem] " />
                <p className="">{item.price}냥</p>
                </div>
              <p className="text-sm text-center  mt-[0.4rem]" style={{ color: item.descColor }}>
                {item.desc}
              </p>
              <p className="text-xs text-center mt-[0.2rem] font-semibold" style={{ color: item.descColor }}>
                문제 유형: {item.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Background>
  );
};

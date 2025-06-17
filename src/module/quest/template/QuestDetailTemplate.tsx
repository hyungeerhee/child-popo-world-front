import { Background } from "@/components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import { QuestCard } from "../components/QuestCard";
import { BackArrow } from "@/components/button/BackArrow";
import type { Quest } from "../types/quest";

interface QuestDetailTemplateProps {
  questType: string;
  questData: Quest[];
  onComplete: () => void;
  onBack: () => void;
  onChangeState: (
    questId: string,
    childId: string,
    uiState: Quest["state"]
  ) => void;
  onSelectState: (state: Quest["state"]) => void;
  selectedState: Quest["state"] | null;
  total: number;
  completed: number;
  percentage: number;
}

const stateFilterMap: {
  label: Quest["state"];
  color: string;
}[] = [
  { label: "수락하기", color: "bg-red-300" },
  {
    label: "다 했어요",
    color: "bg-yellow-300",
  },
  {
    label: "기다리는 중",
    color: "bg-blue-300",
  },
  { label: "돈 받기", color: "bg-green-300" },
  { label: "완료!", color: "bg-purple-300" },
  { label: "만료!", color: "bg-orange-300" },
];

export const QuestDetailTemplate = ({
  questType,
  questData,
  onBack,
  onComplete,
  onChangeState,
  onSelectState,
  selectedState,
  total,
  completed,
  percentage,
}: QuestDetailTemplateProps) => {
  return (
    // 배경 이미지
    <Background backgroundImage="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749086237/iPad_Pro_12.9__-_63_fl49sp.webp">
      <BackArrow onClick={onBack} />
      {/* 포포 이미지 */}
      <img
        src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749107825/ChatGPT_Image_May_26__2025__04_02_46_PM-removebg-preview_1_1_swqc8d.webp"
        alt="포포 캐릭터"
        className="absolute z-20 h-[13rem] left-[29rem] top-[15rem]"
      />
      <div className="absolute left-[30rem] top-[14.7rem] z-20 bg-[#ffffffa6] rounded-2xl pl-[0.5rem] pr-[0.5rem] p-[0.1rem]">
        <TextWithStroke
          text="하나씩 해볼까?"
          textClassName="text-main-yellow-200
           text-[1rem]"
          strokeClassName=" text-main-brown-800 text-[1rem] text-stroke-width-[0.2rem]  text-stroke-color-main-brown-800"
        />
      </div>

      {/* 퀘스트 목록 표지판 */}
      <img
        src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749086355/image_437_pgtezv.webp"
        alt="퀘스트 목록 표지판"
        className="absolute w-[29rem] h-[20.5rem] left-[4.8rem] top-[6rem] "
      />

      {/* 퀘스트 제목 - 부모퀘스트 / 일일퀘스트 */}
      <div
        aria-label="퀘스트 제목"
        className=" flex justify-center mt-[1.2rem]"
      >
        <TextWithStroke
          text={questType === "daily" ? "일일퀘스트" : "부모퀘스트"}
          textClassName="text-main-yellow-500 
           text-[2.4rem]"
          strokeClassName=" text-main-brown-800 text-[2.4rem] text-stroke-width-[0.35rem]  text-stroke-color-main-brown-800"
        />
      </div>

      {/* 진행도 */}
      <div className="absolute top-[4.8rem] left-1/2 -translate-x-1/2 z-50 flex flex-col items-center ">
        {/* 텍스트를 진행 바 위로 분리 */}
        <div className="text-[0.7rem] text-yellow-900 font-semibold">
          {completed}/{total} 완료 ({percentage}%)
        </div>

        {/* 진행 바 */}
        <div className="w-[12rem] h-[1.3rem] bg-[#fff4cc] rounded-full overflow-hidden border-[0.1rem] border-[#6e491d] shadow-inner relative">
          {/* 진행된 부분 */}
          <div
            className="bg-yellow-300 h-full rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${percentage}%` }}
          ></div>

          {/* 이미지 */}
          <img
            src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749524170/ChatGPT_Image_2025%E1%84%82%E1%85%A7%E1%86%AB_6%E1%84%8B%E1%85%AF%E1%86%AF_10%E1%84%8B%E1%85%B5%E1%86%AF_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11_55_17-Photoroom_er3mem.webp"
            alt="cursor"
            className="absolute sm:top-[-0.2rem] md:top-[-0.2rem] xl:top-[-0.19rem] w-[1.5rem]  ease-in-out"
            style={{
              left: `calc(${percentage}% - 1.3rem)`,
            }}
          />
        </div>
      </div>

      {/* 상태별 퀘스트 버튼 */}
      <div className="absolute flex flex-col left-[6.5rem] top-[9.7rem]">
        {stateFilterMap.map(({ label, color }) => (
          <div key={label} className="relative">
            {/* 버튼 */}
            <div
              onClick={() => onSelectState(label)}
              className={`${color} relative rounded-sm h-[1.4rem] cursor-pointer  mt-[0.3rem] 
    ${selectedState === label ? "w-[1.7rem]" : "w-[1.3rem] ml-[0.5rem]"}`}
            >
              {selectedState === label && (
                <img
                  src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749524170/ChatGPT_Image_2025%E1%84%82%E1%85%A7%E1%86%AB_6%E1%84%8B%E1%85%AF%E1%86%AF_10%E1%84%8B%E1%85%B5%E1%86%AF_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11_55_17-Photoroom_er3mem.webp"
                  alt="선택 표시"
                  className="absolute -top-[0.14rem] left-[0.04rem] h-[1.7rem] z-10 pointer-events-none"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* 리스트 */}
      <div className="flex justify-center ">
        <div className="mt-[4.8rem] z-[10] w-[20rem] h-[11rem] ml-[0.1rem] overflow-scroll  scrollbar-hidden">
          {questData.map((quest) => (
            <QuestCard
              key={quest.quest_id}
              quest={quest}
              onComplete={onComplete}
              onChangeState={() =>
                onChangeState(quest.quest_id, quest.child_id, quest.state)
              }
            />
          ))}
        </div>
      </div>
    </Background>
  );
};

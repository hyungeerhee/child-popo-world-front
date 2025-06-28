import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { BackArrow } from "@/components/button/BackArrow";

interface QuizPlayTemplateProps {
  onBack: () => void;
  quizList: {
    question: string;
    choices: string[];
    answerIndex?: number;   // OX형일 경우 없음
    answerText?: string;    // OX형일 경우 있음
  }[];
  currentIndex: number;
  selectedChoice: number | string | null;
  onSelectChoice: (choice: number | string) => void;
}

export const QuizPlayTemplate = ({
  onBack,
  quizList,
  currentIndex,
  selectedChoice,
  onSelectChoice,
}: QuizPlayTemplateProps) => {
  const currentQuiz = quizList[currentIndex];

  if (!currentQuiz) {
    return (
      <Background backgroundImage={IMAGE_URLS.quiz.bg}>
        <BackArrow onClick={onBack} />
        <div className="flex items-center justify-center h-full text-white text-xl font-bold">
          퀴즈를 불러오는 중이에요...
        </div>
      </Background>
    );
  }

  return (
    <Background backgroundImage={IMAGE_URLS.quiz.bg}>
      <BackArrow onClick={onBack} />

        {/* 문제 번호 */}
        <div className="text-[#4B3D2A] text-[1.1rem] font-bold mb-[1rem] flex justify-center items-center mt-[1.5rem]">
          문제 {currentIndex + 1} / {quizList.length}
        </div>

        {/* 문제 내용 */}
        <div className="h-[9rem] flex mb-[2rem]   justify-center items-center ">
          <div className="bg-white/90 w-[35rem] rounded-2xl shadow-md overflow-scroll scrollbar-hidden">
            <div className=" text-[#4B3D2A] text-[1rem] font-bold flex justify-center items-center pt-[1rem] px-[1.3rem] mb-3 ">
              {currentQuiz.question}
            </div>
          </div>
        </div>

        {/* 선택지 */}
        <div className="  flex w-full justify-center items-center">
          <div className=" flex flex-col w-[32rem]  gap-[0.5rem] max-h-full  justify-between">
            {currentQuiz.choices.map((choice, idx) => {
              const isSelected =
                selectedChoice === idx || selectedChoice === choice;

              const isOXType = currentQuiz.choices.length === 2;
              const choiceValue = isOXType ? choice : idx;

              const baseStyle =
                "text-[0.9rem] font-semibold py-[0.45rem] rounded-full shadow-xs transition";
              const disabledStyle = "cursor-default";
              const bgColor = isSelected ? "bg-gray-300" : "bg-[#FFCE70]";

              return (
                <button
                  key={idx}
                  onClick={() => onSelectChoice(choiceValue)}
                  disabled={selectedChoice !== null}
                  className={`${bgColor} ${baseStyle} ${
                    selectedChoice !== null ? disabledStyle : ""
                  } text-[#4B3D2A]`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

      </div>
    </Background>
  );
};

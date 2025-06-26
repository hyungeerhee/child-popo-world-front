import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface QuizCompleteTemplateProps {
  correctCount: number;
  totalCount: number;
    onBackToHome: () => void;
    reward: number;
}

export const QuizCompleteTemplate = ({
  correctCount,
  totalCount,
    onBackToHome,
  reward
}: QuizCompleteTemplateProps) => {

  const message =
    correctCount === 3
      ? "완벽해요! 최고예요!"
      : correctCount >= 2
      ? "아주 잘했어요!"
      : correctCount >= 1
      ? "다음에는 조금만 더 집중해볼까요?"
      : "다음에는 조금만 더 집중해볼까요?";

  return (
    <Background backgroundImage={IMAGE_URLS.quiz.bg}>
      <div className="flex flex-col items-center justify-center h-[10rem]  rounded-3xl mt-[8rem] p-[3rem] ">
        <h1 className="text-[3.5rem] font-extrabold text-[#FB8A13] mb-[2rem]">퀴즈 완료</h1>
        <p className="text-[1.7rem] font-semibold text-[#18A9B1] mb-2">
          총 {totalCount}문제 중 {correctCount}문제를 맞혔어요!
        </p>
              <p className="text-[1.2rem] mb-[2rem]  text-[#18A9B1]">{message}</p>
              <p className="text-[1.2rem] mb-[2rem]  text-[#18A9B1] font-bold">총 {reward}냥 획득!</p>
        <button
          onClick={onBackToHome}
          className="px-[1.5rem] py-[0.5rem] rounded-xl text-[1.2rem] bg-[#FFCE70] text-[#4B3D2A] font-bold shadow-md "
        >
          확인
        </button>
      </div>
    </Background>
  );
};

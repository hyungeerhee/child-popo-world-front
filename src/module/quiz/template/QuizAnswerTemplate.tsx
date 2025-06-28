import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";


interface QuizAnswerTemplateProps {
  answer: string;
  explanation: string;
  isCorrect: boolean;
  isNext: () => void;
  isLast: boolean;
}

export const QuizAnswerTemplate = ({
  answer,
  explanation, 
  isCorrect,
  isNext,
  isLast
}: QuizAnswerTemplateProps) => {
    const resultColor = isCorrect ? "text-[#7F8EC2]" : "text-[#F77B6E]";
    const imagePopo = isCorrect ? IMAGE_URLS.quiz.o : IMAGE_URLS.quiz.x;

  return (
    <Background backgroundImage={IMAGE_URLS.quiz.bg}>
      <div className="flex justify-center items-center h-full flex-col pt-[2.5rem] pb-[1rem]">
        {/* 결과 박스 */}
        <div className="border-[0.6rem] border-[#A69C5D] w-[34rem] h-[20rem] bg-[#E0FFC1] rounded-2xl shadow-xs px-[2rem]  text-[#4B3D2A] flex flex-col items-center pt-[1.5rem] mb-[1.3rem] pb-[1rem] text-center">
          <p className={`text-[3rem] font-bold mb-[1rem] ${resultColor}`}>
                      {isCorrect ? "정답입니다!" : "틀렸어요!"}
          </p>
          <p className="text-[1rem] mb-[1rem] w-full ">
            <span className="font-semibold">정답: </span>{answer}
          </p>
          <div className="overflow-scroll scrollbar-hidden bg-white/60 rounded-xl h-[7rem] shadow-md flex justify-center items-center px-[0.5rem] py-[3.5rem] text-center ">
            <p className="text-[0.9rem] mt-[1rem] mb-[0.6rem] mx-[1rem] text-[#5f4b2a] whitespace-pre-wrap  flex items-center justify-center w-full h-full ">
              {explanation}
            </p>
          </div>
        </div>

        {/* 다음 문제 버튼 */}
        <button
          onClick={isNext}
          className="border-[0.25rem] border-[#A69C5D] w-[8.5rem] h-[3rem] bg-[#E0FFC1] rounded-2xl flex font-semibold justify-center items-center text-[1.2rem] text-[#4B3D2A]"
        >
        {isLast ? "결과 보기" : "다음 문제"}

        </button>
          </div>
          
          <img src={imagePopo} alt="포포" className="absolute w-[8rem] right-[-0.5rem] bottom-[2rem]"  />
    </Background>
  );
};

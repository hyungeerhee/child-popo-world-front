import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { BackArrow } from "@/components/button/BackArrow";

interface QuizTemplateProps {
  onBack: () => void;
  onClickQuiz: () => void;
}

export const QuizTemplate = ({ onBack,onClickQuiz }:QuizTemplateProps) => {
  return (
    <Background backgroundImage={IMAGE_URLS.quiz.bg}>
      {/* 뒤로가기 */}
      <BackArrow onClick={onBack} />

      {/* 제목 - 퀴즈 */}
      <div className=" items-center justify-center mt-[3.7rem] flex flex-col">
        <span className="text-[3.5rem] font-bold text-[#F98224] ">매일매일 새로워지는</span>
        <div className="flex justify-center items-center gap-[1rem]">
          <span className="text-[5rem] font-extrabold text-[#7F8EC2]">경제</span>
          <span className="text-[5rem] font-extrabold text-[#F77B6E]">퀴즈</span>
        </div>
      </div> 
  

      {/* 포포 이미지 */}
      <img
        src={IMAGE_URLS.quiz.popo}
        alt="퀴즈 포포 이미지"
        className="absolute h-[12.5rem] right-[0.2rem] bottom-[0.3rem] "
      />
      
      {/* 시작하기 버튼 */}
      <div className="flex items-center justify-center mt-[2rem]">
        <button
          className="bg-[#FD7152] border-[0.25rem] border-[#F65636] text-[#FFF4D2] px-[1.2rem] py-[0.4rem] rounded-3xl text-[2rem] font-bold"
          onClick={onClickQuiz}
        >
        퀴즈 풀기
        </button>
      </div>
      </Background>
  );
};
             
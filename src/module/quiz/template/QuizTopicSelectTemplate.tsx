import { BackArrow } from "@/components/button/BackArrow";
import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface QuizTopicSelectTemplateProps {
    onBack: () => void;
    onClickTopic: (topic: string) => void;

}

const Topic = [
    "용돈",
    "저축",
    "소비",
    "투자",
    "은행",
    "화폐",
    "물가",
    "시장"
]

export const QuizTopicSelectTemplate = ({ onBack, onClickTopic}: QuizTopicSelectTemplateProps) => {
    return (
        <Background backgroundImage={IMAGE_URLS.quiz.bg}>

            {/* 뒤로가기 버튼 */}
            <BackArrow onClick={onBack} />

            {/* 제목 - 퀴즈 주제 선택 */}

            <div className="flex flex-col items-center justify-center">
                             {/* 설명 박스 */}
            <div className="flex justify-center">
            <div className="bg-white/70 mt-[5rem] text-[#4B3D2A] rounded-2xl shadow-xs px-[3rem] py-[1.4rem] w-[30rem] text-center mb-[1.5rem] border-[0.2rem] border-[#ffcc80]">
            <p className="text-[1.5rem] font-semibold mb-[0.1rem]">
                아래에서 원하는 주제를 골라보세요!
            </p>
                </div>
                </div>

                {/* 주제들 */}
                <div className="flex flex-wrap justify-center items-center gap-[1rem] mt-[2rem]">
                    {Topic.map((topic, index) => (
                        <button
                            key={index}
                            className="bg-[#f7a38b] border-[0.2rem] shadow-sm border-[#ffe4dc] text-[#fbf6ef] py-[0.8rem]  rounded-xl text-[1.2rem] font-semibold mb-[1rem] w-[7rem]"
                            onClick={()=>onClickTopic(topic)}
                        >
                            {topic}
                        </button>
                    ))}
                </div>

</div>
        </Background>
    )
};
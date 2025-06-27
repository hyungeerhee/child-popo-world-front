// src/page/main/index.tsx
import { IMAGE_URLS } from "@/lib/constants/constants";
import { TextWithStroke } from "../../../components/text/TextWithStroke";
import { Background } from "../../../components/layout/Background";
import NameAndPoint from "@/components/user/NameAndPoint";
import { SpeechBubble, SpeechBubble2 } from "../components/SpeechBubble";
import { Indicator } from "../components/Indicator";
import { useEffect } from "react";
import clsx from "clsx";
import SoundButton from "@/components/button/SoundButton";
import { playSound } from "@/lib/utils/sound";
import { Link } from "react-router-dom";
import { useTutorialStore } from "@/lib/zustand/tutorialStore";

import tutorial_start from "@/assets/sound/tutorial/tutorial_start_“안녕~ 난 포포야! 포포월드에 온 걸 환영해! 재밌는 섬들이 가득해! 하나씩 같이 둘러보_2025-06-27.wav"
import tutorial_sound from "@/assets/sound/tutorial/tutorial_sound__여기! 위에 있는 이 버튼을 누르면 신나는 음악이 짜잔~ 포포랑 같이 춤출 준비 됐지___2025-06-27.wav"
import tutorial_attandance from "@/assets/sound/tutorial/tutorial_attandance_“매일 눌러봐~ 출석하면 포인트가 뿅!”_2025-06-27.wav"
import tutoral_quiz from "@/assets/sound/tutorial/tutorial_quiz_“이건 퀴즈를 할 수 있는 버튼이야! 문제 맞히면 포인트가 짠!”_2025-06-27.wav"
import tutorial_last from "@/assets/sound/tutorial/tutorial_last_“우와~ 포포월드 구경 잘했어_ 이제 넌 포포월드 탐험가야! 여러 섬에서 놀고, 포인트도 _2025-06-27 (1).wav"

interface TutorialProps {
  onComplete: () => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const { currentStep, nextStep, completeTutorial } = useTutorialStore();
  
  const tutorialOrder: Record<string, {text: React.ReactNode, sound: string}> = {
    // currentStep 1
    intro: {
      text: <div className="absolute top-6 left-10 ">
      <div className="absolute top-2 left-5 whitespace-nowrap">안녕~ 난 포포야! </div>
      <div className="absolute top-6.5 -left-1 whitespace-nowrap">포포월드에 온 걸 환영해!</div>
      <div className="absolute top-11 left-1 whitespace-nowrap">재밌는 섬들이 가득해! </div>
      <div className="absolute top-15.5 left-1 whitespace-nowrap">하나씩 같이 둘러보자!</div>
    </div>,
    sound: tutorial_start
    },
    // currentStep 2
    sound: {
      text: <div className="absolute top-6 left-10">
      <div className="absolute top-2.5 left-5 whitespace-nowrap flex items-center">
        여기! 위에 있는 

      </div>
      <div className="absolute top-7 -left-2 whitespace-nowrap flex items-center">
        이<img src={IMAGE_URLS.sound.off} alt="music" className="w-[1.2rem]" />
        버튼을 누르면 신나는
        </div>
      <div className="absolute top-11.5 left-2.5 whitespace-nowrap">음악이 짜잔~ 포포랑 </div>
      <div className="absolute top-16 left-2.5 whitespace-nowrap">같이 춤출 준비 됐지?</div>
    </div>,
    sound: tutorial_sound
    },
    // currentStep 3
    attendance: {
      text:<div className="absolute top-6 left-10 ">
      <div className="absolute top-6 left-8 whitespace-nowrap">매일 눌러봐~  </div>
      <div className="absolute top-11 left-1 whitespace-nowrap">출석하면 포인트가 뿅!</div>
    </div>,
    sound: tutorial_attandance
    },
    // currentStep 4
    quiz: {
      text: <div>
      퀴즈 버튼이야! 쉬운 것도, 어려운 것도 있어~ 맞히면 냥이 우르르~!
    </div>,
    sound: tutoral_quiz
    },
    // currentStep 5
    diary: {
      text: <div>
      우와~ 포포월드 구경 잘했어_ 이제 넌 포포월드 탐험가야! 여러 섬에서 놀고, 포인트도
    </div>,
    sound: tutorial_last
    },
  };

  const totalSteps = Object.keys(tutorialOrder).length;

  const handleNextStep = () => {
    if( currentStep === 3 || currentStep === 4) {
      return 
    }

    if (currentStep < totalSteps) {
      nextStep();
    } else {
      completeTutorial();
      onComplete();
    }
  };

  useEffect(() => {
    console.log(tutorialOrder[Object.keys(tutorialOrder)[currentStep - 1]].sound, currentStep);
    if (tutorialOrder[Object.keys(tutorialOrder)[currentStep - 1]].sound) {
      playSound(
        tutorialOrder[Object.keys(tutorialOrder)[currentStep - 1]].sound,
        1,
      );
    } 
  }, [currentStep]);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/25" onClick={handleNextStep}></div>
      <Background backgroundImage={IMAGE_URLS.main.bg}>
        {/* 여백 */}
        <div className="h-[1.9rem]"></div>
        {/* 제목 */}
        <div className="flex justify-center">
          <TextWithStroke
            text="포포월드"
            textClassName="text-main-yellow-800 text-[3.5rem]"
            strokeClassName="text-main-brown-800 text-[3.5rem] text-stroke-width-[0.4rem] text-stroke-color-main-brown-800"
          />
        </div>

        {/* 로그아웃 */}
        <div className="absolute left-[1rem] top-[0.5rem] flex items-center cursor-pointer">
          <img src={IMAGE_URLS.common.logout} alt="로그아웃" className="w-[1.6rem]" />
          <TextWithStroke
            text="로그아웃"
            className="mt-[0.1rem]"
            textClassName="text-main-pink-400 text-[0.9rem]"
            strokeClassName="text-main-brown-800 text-[0.9rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
          />
        </div>
        {/* 소리버튼 */}
        <SoundButton className={clsx("absolute  left-[6.5rem] top-[0.7rem] flex flex-col items-center cursor-pointer active:scale-95 transition-all duration-300",
        currentStep === 2 && "z-100"
        )} />
        {currentStep === 2 && (
          <div className="w-[2.2rem] h-[2.2rem] rounded-full bg-white/40 absolute  left-[6.25rem] top-[0.4rem] z-90"></div>
        )}
        {/* 퀴즈 */}
        <div>
          <div className="absolute top-[0.5rem] right-[9.8rem]  flex flex-col justify-center items-center ">
            <img src={IMAGE_URLS.main.quiz} alt="quiz" className="w-[1.8rem]" />
            <TextWithStroke
              text="퀴즈"
              textClassName="text-main-yellow-800 text-[0.9rem]"
              strokeClassName="text-main-brown-800 text-[0.9rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
            />
          </div>
        </div>
        {currentStep === 4 && (
            <div className="w-[2.3rem] h-[2.3rem] rounded-full bg-white/40 absolute  right-[9.8rem] top-[0.5rem] z-90"></div>
        )}


        {/* 출석 */}
        <Link to="/attandance" className="absolute top-[0.6rem]  right-[7.6rem]  flex flex-col items-center justify-center ">
          <img src={IMAGE_URLS.main.attendance} alt="attandance" className={clsx("w-[1.8rem]", currentStep === 3 && "z-100")} />
          <TextWithStroke
            text="출석"
            textClassName="text-main-blue-700 text-[0.88rem]"
            strokeClassName="text-main-blue-800 text-[0.88rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
          />
        </Link>
        {currentStep === 3 && (
            <div className="w-[2.3rem] h-[2.3rem] rounded-full bg-white/40 absolute  right-[7.3rem] top-[0.35rem] z-90"></div>
        )}

        {/* 이름과 포인트 */}
        <NameAndPoint />

        {/* 섬 */}

        {/* 시장 */}
        <div className="cursor-pointer">
          <img src={IMAGE_URLS.main.market} alt="market" className="absolute top-[3.5rem] left-[2.5rem] w-[8.1rem]" />
          <div className="absolute top-[10.25rem] left-[5.2rem] px-[0.7rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            시장
          </div>
        </div>

        {/* 감정일기 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.diary}
            alt="emotionsDiary"
            className="w-[7.6rem] absolute left-[2rem] bottom-[4.7rem]"
          />
          <div className="absolute  bottom-[4.5rem] left-[3.4rem] pl-[0.7rem] pr-[0.6rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            감정일기
          </div>
        </div>

        {/* 포포 키우기 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.raising}
            alt="raising"
            className="w-[8rem] absolute left-[8.75rem] bottom-[1.64rem]"
          />
          <div className="absolute bottom-[1.5rem] left-[10rem]  px-[0.7rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            포포 키우기
          </div>
        </div>

        {/* 적금 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.saving}
            alt="savings"
            className="w-[8rem] right-[9.75rem] bottom-[0.9rem] absolute"
          />
          <div
            className="absolute bottom-[1rem] right-[12.27rem]  px-[0.85rem] text-[0.8rem] pt-[0.08rem]  font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg"
          >
            적금
          </div>
        </div>

        {/* 퀘스트 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.quest}
            alt="quest"
            className={clsx("w-[7.2rem] absolute right-[2.4rem] bottom-[6.25rem]", )}
          />
          <div
            className= "absolute bottom-[6rem] right-[3.8rem]  px-[0.85rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg"
          >
            퀘스트
          </div>
        </div>


        {/* 모의투자 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.investing}
            alt="quiz"
            className="w-[7.5rem] absolute  right-[2.75rem] top-[5.5rem]"
          />
          <div
            className="absolute top-[11.4rem] right-[4rem]  px-[0.85rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg"
          >
            모의투자
          </div>
        </div>

        {/* 포니 */}
        <img src={IMAGE_URLS.main.popo} alt="poni" className="absolute w-40 h-40 top-[8rem] left-[14rem] z-100" />
        {/* 말풍선 */}
        <SpeechBubble2
          children={tutorialOrder[Object.keys(tutorialOrder)[currentStep - 1]].text}
          className="absolute bottom-[16.8rem] left-[14rem] z-100"
        />
        {/* 인디케이터 */}
        <Indicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          className="absolute bottom-[1rem] left-1/2 -translate-x-1/2 z-100"
        />
      </Background>
    </>
  );
}

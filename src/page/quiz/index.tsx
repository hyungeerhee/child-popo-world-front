import { useNavigate } from "react-router-dom";
import { QuizTemplate } from "../../module/quiz/template";
import { useTutorialStore } from "@/lib/zustand/tutorialStore";
import { useEffect } from "react";
import { playSound } from "@/lib/utils/sound";
import { tutorialQuiz } from "@/lib/constants/tutorial";

export default function QuizPage() {
  const { isTutorialCompleted} = useTutorialStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isTutorialCompleted) {
      playSound(tutorialQuiz["quiz2"].sound);
    }
  }, [isTutorialCompleted]);

  // 뒤로가기 버튼 클릭 시 홈으로 이동
  const handleBack = () => {
    navigate("/");
  };

  // 퀴즈 클릭 시 퀴즈 상세 페이지로 이동
  const handleClickQuiz = () => {
    navigate("/quiz/level-select");
  };

  return <QuizTemplate onBack={handleBack} onClickQuiz={handleClickQuiz} isTutorialCompleted={isTutorialCompleted}/>;
}

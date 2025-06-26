import { useNavigate } from "react-router-dom";
import { QuizTemplate } from "../../module/quiz/template";

export default function QuizPage() {

  const navigate = useNavigate();

  // 뒤로가기 버튼 클릭 시 홈으로 이동
  const handleBack = () => {
    navigate("/");
  };

  // 퀴즈 클릭 시 퀴즈 상세 페이지로 이동
  const handleClickQuiz = () => {
    navigate("/quiz/level-select");
  };

  return <QuizTemplate onBack={handleBack} onClickQuiz={handleClickQuiz}/>;
}

import { QuizLevelSelectTemplate } from "@/module/quiz/template/QuizSelectTemplate";
import { useNavigate } from "react-router-dom";


export default function QuizLevelSelectPage() {
  const navigate = useNavigate();
  
  // 뒤로가기 버튼 클릭
  const handleBack = () => {
    navigate("/quiz");
  }

  // 난이도 클릭 시 난이도 선택 페이지로 이동
  const handleClickQuiz = (level : string) => {
    navigate(`/quiz/${level}`);
  } 
    return (
      <QuizLevelSelectTemplate onBack={handleBack} onClickQuiz={handleClickQuiz}/>
  )
}

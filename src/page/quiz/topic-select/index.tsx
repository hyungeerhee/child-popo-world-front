import { useNavigate, useParams } from "react-router-dom";
import { QuizTopicSelectTemplate } from "@/module/quiz/template/QuizTopicSelectTemplate";

export default function TopicSelectPage() {
    const navigate = useNavigate();
    const { level } = useParams<{ level: string }>();

  // 뒤로가기 버튼 클릭
  const handleBack = () => {
    navigate("/quiz/level-select");
  };
    
    // 주제 클릭시 퀴즈 풀기 페이지로 이동
    const handleClickTopic = (topic: string) => {
        if (!level) return;
        navigate(`/quiz/${level}/${topic}`);
    }


  return (
    <QuizTopicSelectTemplate onBack={handleBack} onClickTopic={handleClickTopic} />
  );
}

import { QuestCompleteTemplate } from "@/module/quest/template/QuestCompleteTemplate";
import { useLocation, useNavigate } from "react-router-dom";
import { playButtonSound } from "@/lib/utils/sound";

export default function QuestComplete() {
  const navigate = useNavigate();
  const location = useLocation();

  const questType = location.state?.questType;

  const handleClick = () => {
    playButtonSound();
    navigate(`/quest/detail/${questType}`);
  };
  return <QuestCompleteTemplate onComplete={handleClick} />;
}

import { QuizPlayTemplate } from "@/module/quiz/template/QuizPlayTemplate";
import { QuizAnswerTemplate } from "@/module/quiz/template/QuizAnswerTemplate";
import { QuizCompleteTemplate } from "@/module/quiz/template/QuizCompleteTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api/axios";
import { useAuthStore } from "@/lib/zustand/authStore";

interface Quiz {
  question: string;
  choices: string[];
  answerIndex?: number; // 객관식
  answerText?: string;  // OX형
  description: string;
}

export default function QuizPlayPage() {
  const { level, topic } = useParams<{ level: string; topic: string }>();
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswerPage, setShowAnswerPage] = useState(false);
  const [showCompletePage, setShowCompletePage] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [reward, setReward] = useState(0);
  const { point, setPoint } = useAuthStore();
  const navigate = useNavigate();
  const handleBack = () => navigate("/quiz");

  // ✅ 퀴즈 로딩
  useEffect(() => {
    if (!level || !topic) return;

    console.log(point)
    apiClient
      .get("/api/quiz", {
        params: { difficulty: level, topic },
      })
      .then((res) => {
        const raw = JSON.parse(res.data.questionJson);
        const parsedQuiz: Quiz[] = [];

        const makeQuiz = (
          question: string,
          choices: string[] | undefined,
          answer: string | number,
          description: string
        ): Quiz => {
          // ✅ OX 퀴즈: 선택지가 없으면 ["O", "X"] 기본 설정
          if (!choices || choices.length === 0) {
            return {
              question,
              choices: ["O", "X"],
              answerText: answer as string,
              description,
            };
          }

          // ✅ 객관식 퀴즈
          return {
            question,
            choices,
            answerIndex: (answer as number) - 1,
            description,
          };
        };

        parsedQuiz.push(makeQuiz(raw.Q1, raw.Q1_choices, raw.A1, raw.D1));
        parsedQuiz.push(makeQuiz(raw.Q2, raw.Q2_choices, raw.A2, raw.D2));
        parsedQuiz.push(makeQuiz(raw.Q3, raw.Q3_choices, raw.A3, raw.D3));

        setQuizList(parsedQuiz);
      })
      .catch((err) => console.error("퀴즈 생성 api 요청 실패", err));
  }, [level, topic]);

  // ✅ 선택지 선택
  const handleSelectChoice = (choice: string | number) => {
    const currentQuiz = quizList[currentIndex];
    let isCorrect = false;

    if (currentQuiz.answerText !== undefined) {
      isCorrect = choice === currentQuiz.answerText;
    } else if (currentQuiz.answerIndex !== undefined) {
      isCorrect = choice === currentQuiz.answerIndex;
    }

    setSelectedChoice(choice);
    setIsCorrect(isCorrect);
    if (isCorrect) setCorrectCount((prev) => prev + 1);
    setShowAnswerPage(true);
  };

  // ✅ 다음 문제로 이동
  const handleNext = () => {
    setShowAnswerPage(false);
    if (currentIndex + 1 < quizList.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoice(null);
      setIsCorrect(null);
    } else {
      calculateTotalPoint();
      setShowCompletePage(true);
    }
  };

  // ✅ 완료 후 메인으로 이동
  const handleComplete = () => {
    navigate("/quiz");
  };

  // 포인트 보상
  const calculateTotalPoint = () => {
    if (!level) return 0;
    if (!point) return;
    const pointPerQuestion =
      level === "hard" ? 300 : level === "normal" ? 200 : 100;
    
    const reward = correctCount * pointPerQuestion
    const updatePoint = point + reward
    console.log(point, reward, updatePoint)
    setPoint(updatePoint);
    setReward(reward)
  };

  const currentQuiz = quizList[currentIndex];

  return showCompletePage ? (
    <QuizCompleteTemplate
      correctCount={correctCount}
      totalCount={quizList.length}
      onBackToHome={handleComplete}
      reward={reward}
    />
  ) : showAnswerPage && currentQuiz ? (
    <QuizAnswerTemplate
      answer={
        currentQuiz.answerText ?? currentQuiz.choices[currentQuiz.answerIndex ?? 0]
      }
      explanation={currentQuiz.description}
      isCorrect={isCorrect ?? false}
      isNext={handleNext}
    />
  ) : (
    <QuizPlayTemplate
      onBack={handleBack}
      quizList={quizList}
      currentIndex={currentIndex}
      selectedChoice={selectedChoice}
      onSelectChoice={handleSelectChoice}
    />
  );
}

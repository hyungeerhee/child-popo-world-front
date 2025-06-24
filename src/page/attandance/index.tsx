import { useEffect, useState } from "react";
import { getKSTDateTime } from "@/lib/utils/getKSTDateTime";
import { getAttendance, postAttendance } from "@/lib/api/attandance/attendance";
import { useAuthStore } from "@/lib/zustand/authStore";
import { AttandanceTemplate } from "@/module/attandance/template";


export const WEEK = ["월", "화", "수", "목", "금", "토", "일"];

export const rewardText = {
  day: "출석체크 보상을 받았어요!",
  week: "일주일 연속성공 보상을 받았어요!",
}

export const cheeringText = {
  "start": "이제부터 시작입니다!",
  "middle" : "오늘도 환영합니다!",
  "end" : "7일 연속 출석이 되었어요!",
}


export interface Attendance {
  dayOfWeek: string;
  attended: boolean;
}


export default function AttandancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0); 
  const [isWeekCompleted, setIsWeekCompleted] = useState(false);
  const [isAlreadyAttended, setIsAlreadyAttended] = useState(false);
  const [consecutive, setConsecutive] = useState(0);
  const {setPoint, point} = useAuthStore();

  useEffect(() => {
    getAttendance().then((data) => {
      const getConsecutive = () => {
        const yesterday = getYesterday();
        let consecutive = 0;
        let todayIndex = 0; 
        for (let i = 0; i < data.length; i++) {
          if (data[i].attended) {
            consecutive++;
          } else {
            consecutive = 0;
          }
    
          if (data[i].dayOfWeek === yesterday) {
            todayIndex = i + 1 > 6 ? 0 : i + 1;
            break;
          }
        }
    
        if(data[todayIndex].attended) {
          consecutive += 1;
        }
    
        return consecutive;
      };
    
      const consecutive = getConsecutive();
      setConsecutive(consecutive);
      setAttendance(data);
    });
  }, []);

  const getToday = () => {
    const today = getKSTDateTime();
    const date = new Date(today);
    return WEEK[date.getDay() - 1 < 0 ? 6 : date.getDay() - 1];
  };

  const getYesterday = () => {
    const today = getKSTDateTime();
    const date = new Date(today);
    return WEEK[date.getDay() - 2 < 0 ? 6 : date.getDay() - 2];
  };

  const handleAttendance = () => {
    postAttendance(getToday()).then((data) => {

      setAttendance(data.weekAttendance);
      setRewardPoints(data.rewardPoints);
      if(point !== null) setPoint(point + data.rewardPoints);
      setIsWeekCompleted(data.weekCompleted);
      setIsPointModalOpen(true);
    }).catch((error) => {
        setIsAlreadyAttended(true);
    });
  };




  return <AttandanceTemplate 
    consecutive={consecutive}
    isPointModalOpen={isPointModalOpen}
    setIsPointModalOpen={setIsPointModalOpen}
    rewardPoints={rewardPoints}
    isWeekCompleted={isWeekCompleted}
    isAlreadyAttended={isAlreadyAttended}
    setIsAlreadyAttended={setIsAlreadyAttended}
    handleAttendance={handleAttendance}
    attendance={attendance}
  />;
}

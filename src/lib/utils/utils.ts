import { WEEK } from "@/page/attandance";
import { getKSTDateTime } from "@/lib/utils/getKSTDateTime";

export const getToday = () => {
    const today = getKSTDateTime();
    const date = new Date(today);
    return WEEK[date.getDay() - 1 < 0 ? 6 : date.getDay() - 1];
  };
  
  export const getYesterday = () => {
    const today = getKSTDateTime();
    const date = new Date(today);
    return WEEK[date.getDay() - 2 < 0 ? 6 : date.getDay() - 2];
  };    
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/lib/zustand/authStore";

export default function ProtectedRouter() {
  const { isAuthenticated } = useAuthStore();

  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  console.log("isAuthenticated", isAuthenticated);
  // // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // 인증된 사용자는 자식 라우트들을 렌더링
  return <Outlet />;
}

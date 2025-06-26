import apiClient from "../axios";

// 회원가입 요청 타입
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  sex: "M" | "F";
  age: number;
  role: "Child";
  parentCode: string;
}

// 회원가입 폼 타입
export interface RegisterForm {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  gender: string;
  age: string;
  parentCode: string;
}

// 회원가입 결과 타입
export interface RegisterResult {
  success: boolean;
  error?: string;
}

// 비밀번호 유효성 검사 함수
export const validatePassword = (password: string, passwordCheck: string): { isValid: boolean; message?: string } => {
  if (password !== passwordCheck) {
    return { isValid: false, message: "비밀번호가 일치하지 않습니다." };
  }

  if (password.length < 8) {
    return { isValid: false, message: "비밀번호는 8자리 이상이어야 합니다." };
  }

  const passwordRule = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;
  if (!passwordRule.test(password)) {
    return { isValid: false, message: "비밀번호에는 특수문자 1개, 대문자 1개, 숫자 1개 이상이 포함되어야 합니다." };
  }

  return { isValid: true };
};

// 나이 유효성 검사 함수
export const validateAge = (age: string): { isValid: boolean; message?: string } => {
  const numAge = Number(age);
  if (numAge < 5) {
    return { isValid: false, message: "5세 이상부터 회원가입이 가능합니다." };
  }
  return { isValid: true };
};

// 회원가입 API 호출 함수
export const register = async (form: RegisterForm): Promise<RegisterResult> => {
  try {
    // 필수 필드 검사
    if (!form.email || !form.password || !form.passwordCheck || !form.name || !form.gender || !form.age || !form.parentCode) {
      return {
        success: false,
        error: "모든 항목을 입력해주세요."
      };
    }

    // 비밀번호 유효성 검사
    const passwordValidation = validatePassword(form.password, form.passwordCheck);
    if (!passwordValidation.isValid) {
      return {
        success: false,
        error: passwordValidation.message
      };
    }

    // 나이 유효성 검사
    const ageValidation = validateAge(form.age);
    if (!ageValidation.isValid) {
      return {
        success: false,
        error: ageValidation.message
      };
    }

    // API 요청 데이터 구성
    const requestData: RegisterRequest = {
      email: form.email,
      password: form.password,
      name: form.name,
      sex: form.gender === "male" ? "M" : "F",
      age: Number(form.age),
      role: "Child",
      parentCode: form.parentCode || "DEFAULT_CODE"
    };

    await apiClient.post("/auth/signup", requestData);
    
    return {
      success: true
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "회원가입 중 오류가 발생했습니다."
    };
  }
};

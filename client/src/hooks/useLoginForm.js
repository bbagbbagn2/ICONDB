import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useNotification } from "../components/common/NotificationContext";
import { useApi } from "./useApi";

/**
 * 로그인 폼 로직을 담당하는 커스텀 훅
 * UI와 로직을 분리하여 테스트 용이하고 재사용 가능하게 함
 */
export const useLoginForm = () => {
  const navigate = useNavigate();
  const { toastSuccess } = useNotification();
  const { request } = useApi();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 폼 유효성 검사
   * @returns {boolean} 유효 여부
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.id.trim()) {
      newErrors.id = "아이디를 입력해주세요.";
    } else if (formData.id.length < 3) {
      newErrors.id = "아이디는 3자 이상이어야 합니다.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 입력값 변경 처리
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 입력 시 해당 필드의 에러 제거
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * 로그인 제출 처리
   * 중복 제출 방지, 로딩 상태 관리, 에러 처리
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사 실패 시 반환
    if (!validateForm()) {
      return;
    }

    // 이미 로딩 중이면 중복 제출 방지
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await request(
        () => axios.post("/sign_in", { formData }),
        "LOGIN",
      );

      if (data) {
        toastSuccess("로그인 성공!", `${data.name || "사용자"}님 환영합니다!`);
        setFormData({ id: "", password: "" });
        setErrors({});
        navigate("/");
      }
    } catch (error) {
      // 에러는 useApi의 useErrorHandler가 처리
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 폼 초기화
   */
  const resetForm = () => {
    setFormData({ id: "", password: "" });
    setErrors({});
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useLoginForm;

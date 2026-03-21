import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../config/apiClient";
import { useNotification } from "../../components/common/NotificationContext";
import { useApi } from "../../hooks";
import {
  VALIDATION_MESSAGES,
  PASSWORD_STRENGTH,
  PASSWORD_MIN_LENGTH,
} from "./SignupPage.constants";

export const useSignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errors, setErrors] = useState({});
  const { toastSuccess } = useNotification();
  const { request } = useApi();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = VALIDATION_MESSAGES.NAME_REQUIRED;
    if (!formData.id) newErrors.id = VALIDATION_MESSAGES.ID_REQUIRED;

    if (!formData.password) {
      newErrors.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    } else if (formData.password.length < PASSWORD_MIN_LENGTH) {
      newErrors.password = VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH;
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = VALIDATION_MESSAGES.PASSWORD_LOWERCASE;
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = VALIDATION_MESSAGES.PASSWORD_NUMBERS;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = VALIDATION_MESSAGES.CONFIRM_PASSWORD_MISMATCH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+=\-{};:'",.<>/?\\|`~[\]]/.test(password);

    // 소문자 영어와 숫자는 필수
    if (!hasLowerCase || !hasNumbers) {
      setPasswordStrength("");
      return;
    }

    // 조건에 따라 강도 설정
    if (hasLowerCase && hasNumbers && hasUpperCase && hasSymbols) {
      setPasswordStrength(PASSWORD_STRENGTH.STRONG);
    } else if (hasLowerCase && hasNumbers && hasUpperCase) {
      setPasswordStrength(PASSWORD_STRENGTH.MEDIUM);
    } else if (hasLowerCase && hasNumbers) {
      setPasswordStrength(PASSWORD_STRENGTH.WEAK);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = await request(
      () => apiClient.post("/sign_up", { formData }),
      "SIGNUP",
    );

    if (data) {
      toastSuccess(
        "회원가입 성공",
        `${formData.name || "사용자"}님 환영합니다!`,
      );
      navigate("/login");
    }
  };

  return {
    formData,
    passwordStrength,
    errors,
    handleChange,
    handleSubmit,
  };
};

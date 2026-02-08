import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useNotification } from "../common/NotificationContext";
import { useApi } from "../../hooks";

export default function SignupFormBox() {
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
    if (!formData.name) newErrors.name = "이름을 입력해주세요.";
    if (!formData.id) newErrors.id = "아이디를 입력해주세요.";
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호를 8자 이상 입력해주세요.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "비밀번호에 소문자 영어를 포함해야 합니다.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "비밀번호에 숫자를 포함해야 합니다.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "비밀번호와 일치하게 입력해주세요.";
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
    // 정규표현식으로 각 조건 확인
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
      setPasswordStrength("strong");
    } else if (hasLowerCase && hasNumbers && hasUpperCase) {
      setPasswordStrength("medium");
    } else if (hasLowerCase && hasNumbers) {
      setPasswordStrength("weak");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = await request(
      () => axios.post("/sign_up", { formData }),
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

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Label htmlFor="name">이름</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="홍길동"
          value={formData.name}
          onChange={handleChange}
          $hasError={!!errors.name}
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}
      </InputGroup>
      <InputGroup>
        <Label htmlFor="id">아이디</Label>
        <Input
          type="text"
          id="id"
          name="id"
          placeholder="아이디를 입력해주세요"
          value={formData.id}
          onChange={handleChange}
          $hasError={!!errors.id}
        />
        {errors.id && <ErrorText>{errors.id}</ErrorText>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="8자 이상 입력하세요"
          value={formData.password}
          onChange={handleChange}
          $hasError={!!errors.password}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <PasswordStrength $strength={passwordStrength}>
          <div />
        </PasswordStrength>
        {passwordStrength && (
          <StrengthText $strength={passwordStrength}>
            {passwordStrength === "weak" && "약한 비밀번호"}
            {passwordStrength === "medium" && "보통 비밀번호"}
            {passwordStrength === "strong" && "강한 비밀번호"}
          </StrengthText>
        )}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="비밀번호를 다시 입력하세요"
          value={formData.confirmPassword}
          onChange={handleChange}
          $hasError={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <ErrorText>{errors.confirmPassword}</ErrorText>
        )}
      </InputGroup>
      <SignupButton type="submit">회원가입</SignupButton>
    </Form>
  );
}

const Form = styled.form`
  margin-top: 2rem;
`;
const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1.2rem;
  padding-right: 3rem;
  border: 2px solid ${(props) => (props.$hasError ? "#FF6B6B" : "#E5E8EB")};
  border-radius: 15px;
  font-size: 1rem;
  font-family: "Outfit", sans-serif;
  transition: all 0.3s;
  background: #f8fbfc;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#FF6B6B" : "#9ed1d9")};
    background: white;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const PasswordStrength = styled.div`
  margin-top: 0.5rem;
  height: 4px;
  background: #e5e8eb;
  border-radius: 2px;
  overflow: hidden;

  div {
    height: 100%;
    transition: all 0.3s;
    background: ${(props) => {
      if (props.$strength === "weak") return "#FF6B6B";
      if (props.$strength === "medium") return "#FFB89E";
      if (props.$strength === "strong") return "#9ED1D9";
      return "#E5E8EB";
    }};
    width: ${(props) => {
      if (props.$strength === "weak") return "33%";
      if (props.$strength === "medium") return "66%";
      if (props.$strength === "strong") return "100%";
      return "0%";
    }};
  }
`;

const StrengthText = styled.span`
  font-size: 0.85rem;
  color: ${(props) => {
    if (props.$strength === "weak") return "#FF6B6B";
    if (props.$strength === "medium") return "#FFB89E";
    if (props.$strength === "strong") return "#9ED1D9";
    return "#A0AEC0";
  }};
  margin-top: 0.3rem;
  display: block;
`;

const ErrorText = styled.span`
  display: block;
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-weight: 500;
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #9ed1d9, #7bc4ce);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(158, 209, 217, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(158, 209, 217, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

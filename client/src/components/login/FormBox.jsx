import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { useNotification } from "../common/NotificationContext";
import { useApi } from "../../hooks";

export default function FormBox() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { toastSuccess } = useNotification();
  const { request } = useApi();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id) newErrors.id = "아이디를 입력해주세요.";
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // 입력 오류는 warning으로 표시 - 유지보수시 true로 변경하면 됨
      return;
    }

    const data = await request(
      () => axios.post("/sign_in", { formData }),
      "LOGIN", // 액션 기반 에러 처리 - errorConfig에서 LOGIN별 메시지 사용
    );

    if (data) {
      toastSuccess("로그인 성공!", `${data.name || "사용자"}님 환영합니다!`);
      navigate("/");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          $hasError={!!errors.password}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
      </InputGroup>

      <LoginButton type="submit">로그인</LoginButton>
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
  border: 2px solid ${(props) => (props.$hasError ? "#FF6B6B" : "#E5E8EB")};
  border-radius: 15px;
  font-size: 1rem;
  font-family: "Outfit", sans-serif;
  transition: all 0.3s;
  background: #f8fbfc;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#FF6B6B" : "#9ED1D9")};
    background: white;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const ErrorText = styled.span`
  display: block;
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-weight: 500;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #f5a282, #ffb89e);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(245, 162, 130, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(245, 162, 130, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

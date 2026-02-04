import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function SignupFormBox() {
  const navigate = useNavigate();
  const [formData, setFormDate] = useState({
    name: "",
    id: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDate((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) setPasswordStrength("weak");
    else if (password.length < 10) setPasswordStrength("medium");
    else setPasswordStrength("strong");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 맞지 않습니다.");
      return;
    }

    try {
      const res = await axios.post("/sign_up", {
        name: formData.name,
        id: formData.id,
        pw: formData.password,
      });

      if (res.data === 2000) {
        alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    } catch (error) {
      alert("가입 중 오류가 발생했습니다.");
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
          required
        />
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
          required
        />
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
          required
        />
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
          required
        />
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
  border: 2px solid #e5e8eb;
  border-radius: 15px;
  font-size: 1rem;
  font-family: "Outfit", sans-serif;
  transition: all 0.3s;
  background: #f8fbfc;

  &:focus {
    outline: none;
    border-color: #9ed1d9;
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

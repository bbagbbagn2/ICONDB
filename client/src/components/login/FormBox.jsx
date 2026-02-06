import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function FormBox() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const { id, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/sign_in", {
        id: id,
        password: password,
      });

      if (res.data === 200) {
        navigate("/");
      } else {
        alert("아이디와 비밀번호를 확인해 주십시오.");
      }
    } catch (error) {
      alert("서버와의 통신에 실패했습니다.");
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
          value={id}
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
          placeholder="••••••••"
          value={password}
          onChange={handleChange}
          required
        />
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

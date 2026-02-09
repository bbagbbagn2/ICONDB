import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * 순수 UI 컴포넌트 - 로그인 폼
 * 모든 상태를 Props로 받아서 렌더링만 담당
 * 완전히 테스트 가능하고 재사용 가능
 */
export default function LoginForm({
  formData = { id: "", password: "" },
  errors = {},
  isLoading = false,
  onChange,
  onSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {/* 아이디 입력 */}
      <InputGroup>
        <Label htmlFor="id">아이디</Label>
        <Input
          id="id"
          type="text"
          name="id"
          placeholder="아이디를 입력해주세요"
          value={formData.id}
          onChange={onChange}
          $hasError={!!errors.id}
          aria-label="사용자 아이디"
          aria-invalid={!!errors.id}
          aria-describedby={errors.id ? "id-error" : undefined}
          disabled={isLoading}
          required
        />
        {errors.id && (
          <ErrorText id="id-error" role="alert">
            {errors.id}
          </ErrorText>
        )}
      </InputGroup>

      {/* 비밀번호 입력 */}
      <InputGroup>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={onChange}
          $hasError={!!errors.password}
          aria-label="비밀번호"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          disabled={isLoading}
          required
        />
        {errors.password && (
          <ErrorText id="password-error" role="alert">
            {errors.password}
          </ErrorText>
        )}
      </InputGroup>

      {/* 폼 전체 에러 (인증 실패 등) */}
      {errors.form && <FormError role="alert">{errors.form}</FormError>}

      {/* 로그인 버튼 */}
      <LoginButton
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        aria-label={isLoading ? "로그인 중입니다" : "로그인"}
      >
        {isLoading ? (
          <>
            <Spinner aria-hidden="true" />
            로그인 중...
          </>
        ) : (
          "로그인"
        )}
      </LoginButton>
    </Form>
  );
}

LoginForm.propTypes = {
  formData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
  isLoading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// Styled Components
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
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#FF6B6B" : "#9ED1D9")};
    background: white;
  }

  &:disabled {
    background: #f0f3f7;
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

const FormError = styled.div`
  padding: 1rem;
  background: #ffebee;
  border: 1px solid #ff6b6b;
  border-radius: 8px;
  color: #c62828;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  text-align: center;
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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(245, 162, 130, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(245, 162, 130, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #d4a89a, #e8c8b8);
  }
`;

const Spinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

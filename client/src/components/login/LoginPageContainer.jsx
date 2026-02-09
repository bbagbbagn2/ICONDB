import React from "react";
import { useLoginForm } from "../../hooks/useLoginForm";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import LogoBox from "./LogoBox";
import SignupPrompt from "./SignupPrompt";

/**
 * 로그인 페이지 - LoginPage.jsx의 일부로 사용
 * 로직과 UI를 조합하는 컨테이너 컴포넌트
 *
 * 책임:
 * - 상태 관리 (커스텀 훅 사용)
 * - 자식 컴포넌트에 Props 전달
 * - 사용자 인터랙션 조율
 */
export default function LoginPageContainer() {
  // 로그인 폼 로직
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useLoginForm();

  return (
    <PageContainer>
      <LoginBox>
        <LogoBox />

        {/* 로그인 폼 */}
        <LoginForm
          formData={formData}
          errors={errors}
          isLoading={isLoading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <Divider>또는</Divider>

        {/* 회원가입 프롬프트 */}
        <SignupPrompt />
      </LoginBox>
    </PageContainer>
  );
}

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #9ed1d9 0%, #b8e0e6 100%);
  padding: 2rem;
`;

const LoginBox = styled.div`
  background: white;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;
  padding: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #f5a282, #ffb89e);
  }

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: #a0aec0;
  font-size: 0.9rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #e5e8eb;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

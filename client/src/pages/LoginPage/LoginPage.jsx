import React from "react";
import { useLoginPage } from "./useLoginPage";
import LoginForm from "./components/LoginForm";
import LogoBox from "./components/LogoBox";
import SignupPrompt from "./components/SignupPrompt";
import { PageContainer, LoginBox, Divider } from "./LoginPage.styles";
import { LABELS } from "./LoginPage.constants";

/**
 * LoginPage Component
 * 로그인 페이지의 메인 컴포넌트
 * 로직과 UI를 조합하는 컨테이너 컴포넌트
 */
export default function LoginPage() {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useLoginPage();

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

        <Divider>{LABELS.DIVIDER}</Divider>

        {/* 회원가입 프롬프트 */}
        <SignupPrompt />
      </LoginBox>
    </PageContainer>
  );
}

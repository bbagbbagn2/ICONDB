import React from "react";
import { useSignupForm } from "./useSignupForm";
import SignupFormBox from "./components/SignupFormBox";
import LogoBox from "./components/LogoBox";
import LoginPrompt from "./components/LoginPrompt";
import { PageContainer, SignupBox } from "./SignupPage.styles";

/**
 * SignupPage Component
 * 회원가입 페이지의 메인 컴포넌트
 * 로직과 UI를 조합하는 컨테이너 컴포넌트
 */
export default function SignupPage() {
  const { formData, passwordStrength, errors, handleChange, handleSubmit } =
    useSignupForm();

  return (
    <PageContainer>
      <SignupBox>
        <LogoBox />
        <SignupFormBox
          formData={formData}
          passwordStrength={passwordStrength}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <LoginPrompt />
      </SignupBox>
    </PageContainer>
  );
}

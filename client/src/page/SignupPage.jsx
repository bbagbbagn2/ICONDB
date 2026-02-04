import styled from "styled-components";

import SignupLogoBox from "../components/signup/LogoBox";
import SignupFormBox from "../components/signup/FormBox";
import LoginPrompt from "../components/signup/LoginPrompt";

export default function Signup() {
  return (
    <PageContainer>
      <SignupBox>
        <SignupLogoBox />
        <SignupFormBox />
        <LoginPrompt />
      </SignupBox>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5a282 0%, #ffb89e 100%);
  padding: 2rem;
`;

const SignupBox = styled.div`
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
    background: linear-gradient(90deg, #9ed1d9, #7bc4ce);
  }

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

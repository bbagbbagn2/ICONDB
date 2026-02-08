import styled from "styled-components";

import LogoBox from "../components/login/LogoBox";
import FormBox from "../components/login/FormBox";
import SignupPrompt from "../components/login/SignupPrompt";

export default function Login() {
  return (
    <PageContainer>
      <LoginBox>
        <LogoBox />
        <FormBox />
        <Divider>또는</Divider>
        <SignupPrompt />
      </LoginBox>
    </PageContainer>
  );
}

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

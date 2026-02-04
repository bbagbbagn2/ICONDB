import styled from "styled-components";
import LogoIcon from "../common/LogoIcon";

export default function SignupLogoBox() {
  return (
    <LogoContainer>
      <LogoIcon />
      <SubTitle>ICONDB와 함께 시작하세요</SubTitle>
    </LogoContainer>
  );
}
const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SubTitle = styled.p`
  color: #5a6c7d;
  font-size: 1rem;
`;

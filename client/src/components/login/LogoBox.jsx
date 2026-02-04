import styled from "styled-components";
import LogoIcon from "../common/LogoIcon";

export default function LogoBox() {
  return (
    <LogoContainer>
      <LogoIcon />
      <SubTitle>아이콘 공유 플랫폼</SubTitle>
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

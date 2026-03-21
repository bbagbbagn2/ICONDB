import styled from "styled-components";
import LogoIcon from "../../../components/common/LogoIcon";
import { LABELS, COLORS } from "../SignupPage.constants";

export default function LogoBox() {
  return (
    <LogoContainer>
      <LogoIcon />
      <SubTitle>{LABELS.LOGO_SUBTITLE}</SubTitle>
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SubTitle = styled.p`
  color: ${COLORS.SECONDARY_TEXT};
  font-size: 1rem;
`;

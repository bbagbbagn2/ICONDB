import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as SvgLogo } from "../../img/logo3.svg";

export default function LogoIcon() {
  return (
    <Logo>
      <Link to="/">
        <SvgLogo src={SvgLogo} alt="logo" />
      </Link>
    </Logo>
  );
}

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

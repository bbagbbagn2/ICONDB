import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as SvgLogo } from "../../img/logo.svg";

export default function LogoIcon() {
  return (
    <Logo to="/">
      <SvgLogo src={SvgLogo} alt="logo" height="35" width="88" />
    </Logo>
  );
}

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

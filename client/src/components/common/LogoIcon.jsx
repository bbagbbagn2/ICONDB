import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../img/logo.svg";

export default function LogoIcon() {
  return (
    <Logo to="/">
      <img src={logo} alt="logo" height="35" width="88" />
    </Logo>
  );
}

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

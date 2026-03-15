import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../img/logo.svg";

export default function LogoIcon() {
  return (
    <Logo to="/">
      <LogoImg src={logo} alt="logo" />
    </Logo>
  );
}

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 88px;
  height: 35px;
  object-fit: contain;
`;

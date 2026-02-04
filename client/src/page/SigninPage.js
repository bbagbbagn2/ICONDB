import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SigninContainer from "../components/SigninPage/SigninContainer";
import LogoIcon from "../components/common/LogoIcon";

export default function App() {
  const [isMobile, setisMobile] = useState(false);
  const resizingHandler = () => {
    setisMobile(window.innerWidth <= 600);
  };

  useEffect(() => {
    resizingHandler();
    window.addEventListener("resize", resizingHandler);
    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  return (
    <SigninPage>
      <LogoIcon />
      <SigninContainer
        width={isMobile ? "80vw" : "400px"}
        height="300px"
        padding="30px"
      />
    </SigninPage>
  );
}

const SigninPage = styled.div`
  height: 100vh;

  display: grid;
  place-items: center;
  place-content: center;

  background: #9ed1d9;
`;

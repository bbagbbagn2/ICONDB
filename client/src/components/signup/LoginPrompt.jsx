import { Link } from "react-router-dom";
import styled from "styled-components";

export default function LoginPrompt() {
  return (
    <Prompt>
      이미 계정이 있으신가요?
      <Link to="/login">로그인</Link>
    </Prompt>
  );
}
const Prompt = styled.div`
  text-align: center;
  color: #5a6c7d;
  font-size: 0.95rem;
  margin-top: 1.5rem;

  a {
    color: #9ed1d9;
    font-weight: 700;
    text-decoration: none;
    margin-left: 0.3rem;
    transition: color 0.3s;

    &:hover {
      color: #7bc4ce;
    }
  }
`;

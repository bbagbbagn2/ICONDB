import { Link } from "react-router-dom";
import styled from "styled-components";
import { LABELS, COLORS } from "../LoginPage.constants";

export default function SignupPrompt() {
  return (
    <Prompt>
      {LABELS.SIGNUP_PROMPT}
      <Link to="/signup">회원가입</Link>
    </Prompt>
  );
}

const Prompt = styled.div`
  text-align: center;
  color: ${COLORS.SECONDARY_TEXT};
  font-size: 0.95rem;
  margin-top: 1.5rem;

  a {
    color: #f5a282;
    font-weight: 700;
    text-decoration: none;
    margin-left: 0.3rem;
    transition: color 0.3s;

    &:hover {
      color: #f38a62;
    }
  }
`;

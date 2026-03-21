import styled from "styled-components";
import { GRADIENTS, COLORS, PASSWORD_STRENGTH } from "./SignupPage.constants";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${GRADIENTS.SIGNUP_BG};
  padding: 2rem;
`;

export const SignupBox = styled.div`
  background: white;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;
  padding: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: ${GRADIENTS.LOGO_BAR};
  }

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

export const Form = styled.form`
  margin-top: 2rem;
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${COLORS.PRIMARY_TEXT};
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1.2rem;
  padding-right: 3rem;
  border: 2px solid
    ${(props) => (props.$hasError ? COLORS.ERROR : COLORS.BORDER)};
  border-radius: 15px;
  font-size: 1rem;
  font-family: "Outfit", sans-serif;
  transition: all 0.3s;
  background: ${COLORS.BACKGROUND};

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? COLORS.ERROR : COLORS.FOCUS_BORDER};
    background: white;
  }

  &::placeholder {
    color: ${COLORS.PLACEHOLDER};
  }
`;

export const PasswordStrength = styled.div`
  margin-top: 0.5rem;
  height: 4px;
  background: ${COLORS.BORDER};
  border-radius: 2px;
  overflow: hidden;

  div {
    height: 100%;
    transition: all 0.3s;
    background: ${(props) => {
      if (props.$strength === PASSWORD_STRENGTH.WEAK)
        return COLORS.STRENGTH_WEAK;
      if (props.$strength === PASSWORD_STRENGTH.MEDIUM)
        return COLORS.STRENGTH_MEDIUM;
      if (props.$strength === PASSWORD_STRENGTH.STRONG)
        return COLORS.STRENGTH_STRONG;
      return COLORS.BORDER;
    }};
    width: ${(props) => {
      if (props.$strength === PASSWORD_STRENGTH.WEAK) return "33%";
      if (props.$strength === PASSWORD_STRENGTH.MEDIUM) return "66%";
      if (props.$strength === PASSWORD_STRENGTH.STRONG) return "100%";
      return "0%";
    }};
  }
`;

export const StrengthText = styled.span`
  font-size: 0.85rem;
  color: ${(props) => {
    if (props.$strength === PASSWORD_STRENGTH.WEAK) return COLORS.STRENGTH_WEAK;
    if (props.$strength === PASSWORD_STRENGTH.MEDIUM)
      return COLORS.STRENGTH_MEDIUM;
    if (props.$strength === PASSWORD_STRENGTH.STRONG)
      return COLORS.STRENGTH_STRONG;
    return COLORS.PLACEHOLDER;
  }};
  margin-top: 0.3rem;
  display: block;
`;

export const ErrorText = styled.span`
  display: block;
  color: ${COLORS.ERROR};
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-weight: 500;
`;

export const SignupButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${GRADIENTS.SIGNUP_BUTTON};
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(158, 209, 217, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(158, 209, 217, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

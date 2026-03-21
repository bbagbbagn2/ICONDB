import styled, { keyframes } from "styled-components";
import { GRADIENTS, COLORS } from "./LoginPage.constants";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${GRADIENTS.LOGIN_BG};
  padding: 2rem;
`;

export const LoginBox = styled.div`
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

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: ${COLORS.DIVIDER};
  font-size: 0.9rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${COLORS.BORDER};
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
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
  border: 2px solid
    ${(props) => (props.$hasError ? COLORS.ERROR : COLORS.BORDER)};
  border-radius: 15px;
  font-size: 1rem;
  font-family: "Outfit", sans-serif;
  transition: all 0.3s;
  background: ${COLORS.BACKGROUND};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? COLORS.ERROR : COLORS.FOCUS_BORDER};
    background: white;
  }

  &:disabled {
    background: #f0f3f7;
  }

  &::placeholder {
    color: ${COLORS.PLACEHOLDER};
  }
`;

export const ErrorText = styled.span`
  display: block;
  color: ${COLORS.ERROR};
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-weight: 500;
`;

export const FormError = styled.div`
  padding: 1rem;
  background: #ffebee;
  border: 1px solid ${COLORS.ERROR};
  border-radius: 8px;
  color: #c62828;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${GRADIENTS.LOGIN_BUTTON};
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(245, 162, 130, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(245, 162, 130, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #d4a89a, #e8c8b8);
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

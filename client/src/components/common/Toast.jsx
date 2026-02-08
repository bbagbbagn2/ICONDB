import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(450px);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(450px);
  }
`;

const progress = keyframes`
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;

  @media (max-width: 600px) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
`;

const ToastWrapper = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  animation: ${(props) => (props.$isExiting ? slideOut : slideIn)} 0.4s
    cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: ${(props) => {
      switch (props.$type) {
        case "success":
          return "linear-gradient(180deg, #9ED1D9, #7BC4CE)";
        case "error":
          return "linear-gradient(180deg, #FF6B6B, #FF8E8E)";
        case "warning":
          return "linear-gradient(180deg, #F5A282, #FFB89E)";
        case "info":
          return "linear-gradient(180deg, #9ED1D9, #B8E0E6)";
        default:
          return "linear-gradient(180deg, #9ED1D9, #7BC4CE)";
      }
    }};
  }

  @media (max-width: 600px) {
    animation: ${(props) =>
        props.$isExiting
          ? keyframes`from { transform: translateY(0); } to { transform: translateY(-150px); }`
          : keyframes`from { transform: translateY(-150px); } to { transform: translateY(0); }`}
      0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`;

const ToastIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
  background: ${(props) => {
    switch (props.$type) {
      case "success":
        return "linear-gradient(135deg, #9ED1D9, #B8E0E6)";
      case "error":
        return "linear-gradient(135deg, #FF6B6B, #FF8E8E)";
      case "warning":
        return "linear-gradient(135deg, #F5A282, #FFB89E)";
      case "info":
        return "linear-gradient(135deg, #9ED1D9, #7BC4CE)";
      default:
        return "linear-gradient(135deg, #9ED1D9, #B8E0E6)";
    }
  }};
`;

const ToastContent = styled.div`
  flex: 1;
`;

const ToastTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.3rem;
  font-family: "Outfit", sans-serif;
`;

const ToastMessage = styled.div`
  font-size: 0.9rem;
  color: #5a6c7d;
  line-height: 1.5;
  font-family: "Outfit", sans-serif;
`;

const ToastClose = styled.button`
  background: none;
  border: none;
  color: #a0aec0;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;

  &:hover {
    color: #5a6c7d;
    transform: rotate(90deg);
  }
`;

const ToastProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #9ed1d9, #7bc4ce);
  width: 100%;
  transform-origin: left;
  animation: ${progress} ${(props) => props.$duration}ms linear;
`;

const Toast = ({ id, type, title, message, duration, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 400);
  };

  return (
    <ToastWrapper $type={type} $isExiting={isExiting}>
      <ToastIcon $type={type}>{icons[type]}</ToastIcon>
      <ToastContent>
        <ToastTitle>{title}</ToastTitle>
        <ToastMessage>{message}</ToastMessage>
      </ToastContent>
      <ToastClose onClick={handleClose}>×</ToastClose>
      {duration > 0 && <ToastProgress $duration={duration} />}
    </ToastWrapper>
  );
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, title, message, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </ToastContainer>
    </>
  );
};

export { ToastProvider };
export default Toast;

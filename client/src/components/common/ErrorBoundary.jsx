import React from "react";
import styled from "styled-components";
import { useNotification } from "./NotificationContext";

/**
 * ErrorBoundary 컴포넌트
 * React 컴포넌트 트리에서 발생하는 에러를 캐치하고 표시합니다.
 *
 * @example
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 정보 저장
    this.setState((prevState) => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // 프로덕션 환경에서는 에러 로깅 서비스로 전송
    if (process.env.NODE_ENV === "production") {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
      // 여기서 Sentry, LogRocket 등의 에러 추적 서비스 활용
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      const isNetworkError = this.state.error?.message?.includes("fetch");
      const isDevelopment = process.env.NODE_ENV === "development";

      return (
        <ErrorContainer>
          <ErrorBox>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorTitle>문제가 발생했습니다</ErrorTitle>
            <ErrorMessage>
              {isNetworkError
                ? "네트워크 연결을 확인해주세요."
                : "예상치 못한 오류가 발생했습니다."}
            </ErrorMessage>

            {isDevelopment && this.state.errorInfo && (
              <ErrorDetails>
                <DetailsTitle>개발 환경 디버그 정보:</DetailsTitle>
                <ErrorStack>{this.state.error?.toString()}</ErrorStack>
                <ErrorStack>{this.state.errorInfo.componentStack}</ErrorStack>
              </ErrorDetails>
            )}

            <ButtonGroup>
              <ResetButton onClick={this.handleReset}>다시 시도</ResetButton>
              <HomeButton onClick={() => (window.location.href = "/")}>
                홈으로 이동
              </HomeButton>
            </ButtonGroup>

            <ErrorCountText>
              오류 발생 횟수: {this.state.errorCount}회
            </ErrorCountText>
          </ErrorBox>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Styled Components
const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`;

const ErrorBox = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;

  @media (max-width: 600px) {
    padding: 2rem;
  }
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ErrorDetails = styled.div`
  background: #f8f9fa;
  border-left: 4px solid #e74c3c;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  text-align: left;
`;

const DetailsTitle = styled.h3`
  font-size: 0.9rem;
  color: #2c3e50;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const ErrorStack = styled.pre`
  font-size: 0.8rem;
  color: #e74c3c;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 0.5rem;
  font-family: monospace;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ResetButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #9ed1d9 0%, #7bc4ce 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(158, 209, 217, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const HomeButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  background: white;
  color: #7bc4ce;
  border: 2px solid #7bc4ce;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f0fafb;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorCountText = styled.p`
  font-size: 0.85rem;
  color: #95a5a6;
  margin-top: 1rem;
  font-style: italic;
`;

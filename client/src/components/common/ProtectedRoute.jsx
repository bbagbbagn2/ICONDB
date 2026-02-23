import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import {
  useAuthStore,
  useIsAuthenticated,
  useIsLoading,
} from "../../stores/authStore";

/**
 * ProtectedRoute 컴포넌트
 * Zustand 기반 전역 인증 상태를 이용하여 로그인한 사용자만 접근 가능
 *
 * @param {React.Component} Component - 보호할 컴포넌트
 * @returns {React.Component} - 컴포넌트 또는 리다이렉트
 */
export default function ProtectedRoute({ Component }) {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // 앱 초기 로드 시 인증 상태 확인
    if (!isAuthenticated && !isLoading) {
      initializeAuth();
    }
  }, [isAuthenticated, isLoading, initializeAuth]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress size={60} />
        <LoadingText>인증 확인 중...</LoadingText>
      </LoadingContainer>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
}

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fafbfc;
  gap: 1.5rem;
`;

const LoadingText = styled.p`
  color: #7f8c8d;
  font-size: 1rem;
`;

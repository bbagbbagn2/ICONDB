import { useState } from "react";
import { useErrorHandler } from "./useErrorHandler";

/**
 * API 요청을 간단하게 처리하는 훅
 * axios 호출 + 에러 핸들링 + 로딩 상태를 통합 관리합니다
 *
 * @example
 * // 기본 사용
 * const { request, loading } = useApi();
 *
 * const handleLogin = async () => {
 *   const data = await request(() => axios.post("/sign_in", formData), "LOGIN");
 *   if (data) navigate("/");
 * };
 *
 * // 더 상세한 제어
 * const { request, loading, error } = useApi();
 *
 * const handleUpload = async () => {
 *   const result = await request(
 *     () => axios.post("/upload", formData, { headers: {...} }),
 *     "UPLOAD",
 *     false // showWarning
 *   );
 * };
 */
export const useApi = () => {
  const [error, setError] = useState(null);
  const { handleError, handleErrorWithAction } = useErrorHandler();

  /**
   * API 요청 실행
   * @param {Function} apiCall - axios 요청 함수
   * @param {string} action - 액션명 (선택사항, 이 값이 있으면 액션별 에러 메시지 사용)
   * @param {boolean} showWarning - 경고로 표시할지 여부 (기본값: false)
   * @returns {Promise} API 응답 데이터 또는 null
   */
  const request = async (apiCall, action = null, showWarning = false) => {
    setError(null);

    try {
      const response = await apiCall();
      return response.data ?? response;
    } catch (err) {
      setError(err);

      // 액션이 지정된 경우 액션 기반 에러 처리
      if (action) {
        handleErrorWithAction(err, action, showWarning);
      } else {
        // 액션 미지정 시 기본 에러 처리
        handleError(err, showWarning);
      }

      return null;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    request,
    error,
    clearError,
  };
};

export default useApi;

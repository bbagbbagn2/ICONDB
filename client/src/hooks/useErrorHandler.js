import { useNotification } from "../components/common/NotificationContext";
import { ERROR_MESSAGES, ACTION_ERROR_MESSAGES } from "./errorConfig";

/**
 * 통합 에러 핸들링 훅
 * 네트워크 오류, HTTP 상태 코드, 예외 처리를 일관되게 관리합니다
 *
 * @example
 * const { handleError, handleErrorWithAction } = useErrorHandler();
 *
 * // 기본 에러 처리
 * try {
 *   await fetchData();
 * } catch (error) {
 *   handleError(error);
 * }
 *
 * // 액션 기반 에러 처리 (더 구체적인 메시지)
 * try {
 *   await loginUser();
 * } catch (error) {
 *   handleErrorWithAction(error, "LOGIN");
 * }
 */
export const useErrorHandler = () => {
  const { toastError, toastWarning } = useNotification();

  /**
   * 기본 에러 처리
   * @param {Error} error - 에러 객체
   * @param {boolean} showWarning - 입력 오류인 경우 warning으로 표시할지 여부
   */
  const handleError = (error, showWarning = false) => {
    const errorInfo = getErrorInfo(error);
    const notify = showWarning ? toastWarning : toastError;

    notify(errorInfo.title, errorInfo.message);
  };

  /**
   * 액션 기반 에러 처리 (액션별 커스텀 메시지)
   * @param {Error} error - 에러 객체
   * @param {string} action - 액션명 (LOGIN, SIGNUP, UPLOAD, PROFILE_UPDATE, DELETE 등)
   * @param {boolean} showWarning - 입력 오류인 경우 warning으로 표시할지 여부
   */
  const handleErrorWithAction = (error, action, showWarning = false) => {
    let errorInfo = getErrorInfo(error);

    console.log("[에러 핸들링]", {
      action,
      status: error.response?.status,
      message: error.message,
    });

    // 액션별 커스텀 메시지가 있으면 사용
    if (ACTION_ERROR_MESSAGES[action]) {
      const actionMessages = ACTION_ERROR_MESSAGES[action];
      const status = error.response?.status;
      const errorType = getErrorType(error);

      console.log("[액션 메시지 찾기]", {
        status,
        errorType,
        hasCustom: !!actionMessages[status] || !!actionMessages[errorType],
      });

      // 상태 코드 기반 메시지 우선
      if (status && actionMessages[status]) {
        errorInfo = actionMessages[status];
      }
      // 에러 타입 기반 메시지 (NETWORK_ERROR 등)
      else if (actionMessages[errorType]) {
        errorInfo = actionMessages[errorType];
      }
    }

    console.log("[최종 메시지]", errorInfo);
    const notify = showWarning ? toastWarning : toastError;
    notify(errorInfo.title, errorInfo.message);
  };

  /**
   * 에러 객체에서 title과 message 추출
   */
  const getErrorInfo = (error) => {
    const errorType = getErrorType(error);
    const status = error.response?.status;

    // 상태 코드별 메시지
    if (status && ERROR_MESSAGES[status]) {
      return ERROR_MESSAGES[status];
    }

    // 에러 타입별 메시지
    if (ERROR_MESSAGES[errorType]) {
      return ERROR_MESSAGES[errorType];
    }

    // 기본 메시지
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  };

  /**
   * 에러 타입 판별
   */
  const getErrorType = (error) => {
    if (!error.response) {
      // 네트워크 에러 또는 요청이 서버에 도달하지 못함
      if (error.code === "ECONNABORTED") {
        return "TIMEOUT";
      }
      return "NETWORK_ERROR";
    }

    return null;
  };

  return {
    handleError,
    handleErrorWithAction,
  };
};

export default useErrorHandler;

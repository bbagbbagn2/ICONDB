/**
 * HTTP 상태 코드별 기본 에러 메시지 매핑
 * 모든 페이지에서 일관된 에러 메시지를 제공합니다
 */
export const ERROR_MESSAGES = {
  // HTTP 상태 코드별
  400: {
    title: "잘못된 요청",
    message: "요청한 정보가 올바르지 않습니다.",
  },
  401: {
    title: "인증 실패",
    message: "우인증되지 않았습니다. 다시 로그인해주세요.",
  },
  403: {
    title: "접근 거부",
    message: "이 작업을 수행할 권한이 없습니다.",
  },
  404: {
    title: "찾을 수 없음",
    message: "요청한 리소스를 찾을 수 없습니다.",
  },
  409: {
    title: "중복 오류",
    message: "이미 존재하는 정보입니다.",
  },
  413: {
    title: "파일 크기 초과",
    message: "파일 크기가 너무 큽니다.",
  },
  429: {
    title: "요청 제한",
    message: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  },
  500: {
    title: "서버 오류",
    message: "서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
  502: {
    title: "서버 오류",
    message: "서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.",
  },
  503: {
    title: "서비스 점검",
    message: "서버가 점검 중입니다. 잠시 후 다시 시도해주세요.",
  },

  // 네트워크 에러
  NETWORK_ERROR: {
    title: "네트워크 오류",
    message: "인터넷 연결을 확인해주세요.",
  },
  TIMEOUT: {
    title: "요청 시간 초과",
    message: "요청이 시간 초과되었습니다. 다시 시도해주세요.",
  },

  // 기본 에러
  UNKNOWN_ERROR: {
    title: "오류 발생",
    message: "알 수 없는 오류가 발생했습니다.",
  },
};

/**
 * 액션별 기본 에러 메시지 (더 자세한 메시지 필요 시)
 */
export const ACTION_ERROR_MESSAGES = {
  LOGIN: {
    401: {
      title: "로그인 실패",
      message: "이메일 또는 비밀번호가 올바르지 않습니다.",
    },
    NETWORK_ERROR: {
      title: "로그인 실패",
      message: "네트워크 연결을 확인한 후 다시 시도해주세요.",
    },
  },
  SIGNUP: {
    409: {
      title: "가입 실패",
      message: "이미 등록된 이메일입니다.",
    },
    400: {
      title: "가입 실패",
      message: "입력 정보를 다시 확인해주세요.",
    },
  },
  UPLOAD: {
    413: {
      title: "업로드 실패",
      message: "파일 크기가 너무 큽니다.",
    },
    415: {
      title: "업로드 실패",
      message: "지원하지 않는 파일 형식입니다.",
    },
  },
  PROFILE_UPDATE: {
    404: {
      title: "프로필 수정 실패",
      message: "사용자를 찾을 수 없습니다.",
    },
  },
  DELETE: {
    404: {
      title: "삭제 실패",
      message: "이미 삭제되었거나 존재하지 않습니다.",
    },
  },
};

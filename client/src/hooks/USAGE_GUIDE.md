/\*\*

- =============================================================================
- 에러 핸들링 시스템 사용 가이드
- =============================================================================
-
- 새로운 훅 기반 에러 핸들링 시스템을 사용하면:
- ✓ 중복 코드 제거
- ✓ 일관된 에러 메시지
- ✓ 유지보수성 향상
- ✓ 새로운 액션 추가 용이
-
- =============================================================================
  \*/

// ✅ 방법 1: useApi 사용 (권장 - 가장 간단함)
// 대부분의 경우 이 방법을 사용하세요
// =============================================================================

import { useState } from "react";
import axios from "axios";
import { useApi } from "../../hooks";
import { useNotification } from "../common/NotificationContext";

export default function SignupPage() {
const [formData, setFormData] = useState({ email: "", password: "" });
const { request, loading } = useApi();
const { toastSuccess } = useNotification();

const handleSignup = async (e) => {
e.preventDefault();

    // axios 호출을 request로 감싸기
    // 자동으로 에러 처리 + 로딩 상태 관리
    const data = await request(
      () => axios.post("/sign_up", formData),
      "SIGNUP" // 에러 메시지는 errorConfig에서 SIGNUP별로 자동 처리
    );

    if (data) {
      toastSuccess("가입 성공!", "로그인해주세요.");
      // 페이지 이동 등의 처리
    }

};

return (
<form onSubmit={handleSignup}>
{/_ 폼 내용 _/}
<button type="submit" disabled={loading}>
{loading ? "처리중..." : "가입"}
</button>
</form>
);
}

/\*
useApi 사용 시 지원하는 액션:

- "LOGIN" → 로그인 실패 시 "이메일 또는 비밀번호가 올바르지 않습니다"
- "SIGNUP" → 가입 실패 시 "이미 등록된 이메일입니다" 등
- "UPLOAD" → 파일 크기 초과 시 "파일 크기가 너무 큽니다"
- "PROFILE_UPDATE" → 프로필 수정 실패
- "DELETE" → 삭제 실패

새로운 액션 추가 시 errorConfig.js의 ACTION_ERROR_MESSAGES에 추가하면 됨!
\*/

// ✅ 방법 2: useErrorHandler 사용
// 더 세밀한 제어가 필요할 때 사용
// =============================================================================

import { useErrorHandler } from "../../hooks";

export default function UploadPage() {
const { handleErrorWithAction } = useErrorHandler();
const { toastSuccess } = useNotification();

const handleUpload = async (e) => {
e.preventDefault();

    try {
      // 복잡한 로직이 필요한 경우 직접 axios 호출
      const response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 30000,
      });

      toastSuccess("업로드 완료!", "이미지가 업로드되었습니다.");
      // 추가 처리
    } catch (error) {
      // 에러는 handleErrorWithAction으로 자동 처리
      handleErrorWithAction(error, "UPLOAD");
    }

};

return (
<form onSubmit={handleUpload}>
{/_ 폼 내용 _/}
</form>
);
}

/\*
handleErrorWithAction을 사용하면:

1. 액션별 커스텀 메시지 우선 적용
2. 없으면 HTTP 상태 코드별 기본 메시지 사용
3. 없으면 전체 기본 메시지 사용

예: UPLOAD 액션, 413 상태코드 → "파일 크기가 너무 큽니다"
\*/

// ✅ 방법 3: 기본 handleError 사용
// 액션을 모를 때나 기본 메시지로 충분할 때
// =============================================================================

export default function GeneralApiCall() {
const { handleError } = useErrorHandler();

const handleFetch = async () => {
try {
await axios.get("/some-endpoint");
} catch (error) {
handleError(error);
}
};

return <button onClick={handleFetch}>데이터 가져오기</button>;
}

/\*
handleError를 사용하면:

1. HTTP 상태 코드별 기본 메시지 적용
2. 없으면 에러 타입 (NETWORK_ERROR, TIMEOUT 등) 기반 메시지
3. 없으면 "알 수 없는 오류가 발생했습니다" 사용
   \*/

// ✅ 새로운 액션 추가 방법
// =============================================================================

/\*
새로운 기능이 필요할 때:

1. errorConfig.js의 ACTION_ERROR_MESSAGES에 추가:

export const ACTION_ERROR_MESSAGES = {
...기존 액션들...
FOLLOW: { // 새로운 액션
404: {
title: "팔로우 실패",
message: "사용자를 찾을 수 없습니다.",
},
409: {
title: "팔로우 실패",
message: "이미 팔로우 중입니다.",
},
},
};

2. 페이지에서 사용:

const { request } = useApi();

const handleFollow = async (userId) => {
const data = await request(
() => axios.post(`/follow/${userId}`),
"FOLLOW" // 새로운 액션 사용!
);
};
\*/

// ✅ 자주 묻는 질문
// =============================================================================

/\*
Q: 모든 요청에 액션을 지정해야 하나요?
A: 아니요. 액션을 지정하면 더 자세한 메시지를 얻을 수 있고,
지정하지 않으면 기본 메시지를 사용합니다. 필요에 따라 선택하세요.

Q: 커스텀 메시지를 사용하고 싶어요.
A: handleError 또는 handleErrorWithAction을 직접 호출하기 전에
토스트를 직접 띄울 수 있습니다.

Q: 로딩 중 버튼을 비활성화하려면?
A: useApi의 loading 상태를 사용하세요:
<button disabled={loading}>{loading ? "처리중..." : "제출"}</button>

Q: 에러를 UI에 직접 표시하고 싶어요.
A: handleError 호출 전에 커스텀 처리를 하거나,
error 상태를 직접 관리해서 렌더링하세요.
\*/

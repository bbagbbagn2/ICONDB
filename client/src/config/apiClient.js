import axios from "axios";

// 환경변수에서 API URL 가져오기
// import.meta.env는 Vite 환경변수
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

console.log(`🔗 API URL: ${API_URL}`);

/**
 * Axios 인스턴스 생성
 * 기본 설정 및 인터셉터 포함
 */
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 포함
});

/**
 * 요청 인터셉터
 */
apiClient.interceptors.request.use(
  (config) => {
    // 필요시 토큰 추가
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * 응답 인터셉터
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그인 페이지로 리다이렉트
      // window.location.href = '/login';
      console.warn("401 Unauthorized - 토큰 만료");
    }
    return Promise.reject(error);
  },
);

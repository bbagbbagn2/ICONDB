import { create } from "zustand";
import axios from "axios";

/**
 * Zustand 기반 전역 인증 상태 관리 스토어
 *
 * 기능:
 * - 사용자 인증 상태 관리
 * - 프로필 정보 저장
 * - 로그인/로그아웃 처리
 * - 페이지 새로고침 시 자동 인증 복구
 */
export const useAuthStore = create((set) => ({
  // 상태
  user: null,
  profile: {
    name: "Anonymous.png",
    nickname: "Anonymous",
    id: "",
  },
  isLoading: false,
  isAuthenticated: false,

  // 액션: 인증 정보 초기화 (앱 시작 시)
  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        "/get_auth",
        {},
        {
          timeout: 5000,
        },
      );

      if (response.data) {
        set({
          user: response.data,
          isAuthenticated: true,
        });

        // 프로필 정보 조회
        try {
          const profileRes = await axios.post("/get_profile", {
            user: response.data,
          });
          if (profileRes.data && profileRes.data[0]) {
            set({ profile: profileRes.data[0] });
          }
        } catch (error) {
          console.error("프로필 로드 실패:", error);
        }
      } else {
        set({
          user: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("인증 초기화 실패:", error);
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // 액션: 로그인 후 사용자 정보 설정
  setAuthenticatedUser: (userData) => {
    set({
      user: userData,
      isAuthenticated: true,
    });
  },

  // 액션: 프로필 업데이트
  updateProfile: (profileData) => {
    set({ profile: profileData });
  },

  // 액션: 로그아웃
  logout: async () => {
    try {
      await axios.post("/sign_out");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      set({
        user: null,
        profile: {
          name: "Anonymous.png",
          nickname: "Anonymous",
          id: "",
        },
        isAuthenticated: false,
      });
    }
  },

  // 액션: 인증 상태 초기화
  clearAuth: () => {
    set({
      user: null,
      profile: {
        name: "Anonymous.png",
        nickname: "Anonymous",
        id: "",
      },
      isAuthenticated: false,
    });
  },
}));

// 선택적 selectors (성능 최적화)
export const useUser = () => useAuthStore((state) => state.user);
export const useProfile = () => useAuthStore((state) => state.profile);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);

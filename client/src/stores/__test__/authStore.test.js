import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import axios from "axios";
import {
  useAuthStore,
  useUser,
  useProfile,
  useIsAuthenticated,
  useIsLoading,
} from "../authStore";

// Mock axios
vi.mock("axios");

describe("authStore - Zustand", () => {
  beforeEach(() => {
    // 테스트 전에 스토어 리셋
    useAuthStore.setState({
      user: null,
      profile: {
        name: "Anonymous.png",
        nickname: "Anonymous",
        id: "",
      },
      isLoading: false,
      isAuthenticated: false,
    });
    vi.clearAllMocks();
  });

  describe("initializeAuth", () => {
    it("인증 정보를 성공적으로 초기화해야 함", async () => {
      const mockAuthData = "user123";
      const mockProfileData = [
        {
          name: "profile.png",
          nickname: "testuser",
          id: "user123",
        },
      ];

      axios.post.mockResolvedValueOnce({ data: mockAuthData });
      axios.post.mockResolvedValueOnce({ data: mockProfileData });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.initializeAuth();
      });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).toBe(mockAuthData);
        expect(result.current.profile.nickname).toBe("testuser");
      });
    });

    it("인증 실패 시 상태를 초기화해야 함", async () => {
      axios.post.mockRejectedValueOnce(new Error("Auth failed"));

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.initializeAuth();
      });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
      });
    });

    it("initializeAuth 중에 isLoading이 true가 되어야 함", async () => {
      axios.post.mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ data: "user" }), 100),
          ),
      );
      axios.post.mockResolvedValueOnce({ data: [] });

      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.initializeAuth();
      });

      // 비동기 작업 시작 직후 isLoading 확인
      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe("setAuthenticatedUser", () => {
    it("사용자 정보를 설정하고 프로필을 조회해야 함", async () => {
      const mockProfileData = [
        {
          name: "user.png",
          nickname: "john",
          id: "user456",
        },
      ];

      axios.post.mockResolvedValueOnce({ data: mockProfileData });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.setAuthenticatedUser("user456");
      });

      await waitFor(() => {
        expect(result.current.user).toBe("user456");
        expect(result.current.isAuthenticated).toBe(true);
      });
    });
  });

  describe("logout", () => {
    it("로그아웃 요청을 하고 상태를 초기화해야 함", async () => {
      // 초기 상태 설정
      useAuthStore.setState({
        user: "user123",
        isAuthenticated: true,
        profile: { name: "user.png", nickname: "testuser", id: "user123" },
      });

      axios.post.mockResolvedValueOnce({ data: "success" });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.logout();
      });

      await waitFor(() => {
        expect(result.current.user).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
      });
    });

    it("로그아웃 실패 시에도 상태를 초기화해야 함", async () => {
      useAuthStore.setState({
        user: "user123",
        isAuthenticated: true,
      });

      axios.post.mockRejectedValueOnce(new Error("Logout failed"));

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.logout();
      });

      // 에러가 발생해도 상태는 초기화되어야 함
      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(false);
      });
    });
  });

  describe("updateProfile", () => {
    it("프로필 정보를 업데이트해야 함", async () => {
      const { result } = renderHook(() => useAuthStore());
      const newProfile = {
        name: "newprofile.png",
        nickname: "newtestuser",
        id: "user123",
      };

      act(() => {
        result.current.updateProfile(newProfile);
      });

      expect(result.current.profile).toEqual(newProfile);
    });
  });

  describe("clearAuth", () => {
    it("인증 정보를 초기값으로 리셋해야 함", async () => {
      useAuthStore.setState({
        user: "user123",
        isAuthenticated: true,
        profile: { name: "user.png", nickname: "testuser", id: "user123" },
      });

      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.clearAuth();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.profile.nickname).toBe("Anonymous");
    });
  });

  describe("Selector hooks", () => {
    it("useUser 선택자가 user 값을 반환해야 함", async () => {
      useAuthStore.setState({ user: "testuser" });
      const { result } = renderHook(() => useUser());
      expect(result.current).toBe("testuser");
    });

    it("useProfile 선택자가 profile 값을 반환해야 함", async () => {
      const mockProfile = {
        name: "profile.png",
        nickname: "john",
        id: "user123",
      };
      useAuthStore.setState({ profile: mockProfile });
      const { result } = renderHook(() => useProfile());
      expect(result.current).toEqual(mockProfile);
    });

    it("useIsAuthenticated 선택자가 인증 상태를 반환해야 함", async () => {
      useAuthStore.setState({ isAuthenticated: true });
      const { result } = renderHook(() => useIsAuthenticated());
      expect(result.current).toBe(true);
    });

    it("useIsLoading 선택자가 로딩 상태를 반환해야 함", async () => {
      useAuthStore.setState({ isLoading: true });
      const { result } = renderHook(() => useIsLoading());
      expect(result.current).toBe(true);
    });
  });
});

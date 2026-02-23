import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useApi } from "../useApi";

// Mock modules
vi.mock("axios");
vi.mock("../../components/common/NotificationContext", () => ({
  useNotification: () => ({
    toastError: vi.fn(),
    toastWarning: vi.fn(),
    toastSuccess: vi.fn(),
  }),
}));

vi.mock("../errorConfig", () => ({
  errorConfig: {
    AUTH: { title: "인증 오류", message: "인증에 실패했습니다." },
    NETWORK: { title: "네트워크 오류", message: "네트워크 연결을 확인하세요." },
    SERVER: { title: "서버 오류", message: "서버에 문제가 발생했습니다." },
  },
}));

describe("useApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("훅이 올바르게 초기화되어야 함", () => {
    const { result } = renderHook(() => useApi());

    expect(result.current).toBeDefined();
    expect(typeof result.current.request).toBe("function");
  });

  it("request 함수가 존재해야 함", () => {
    const { result } = renderHook(() => useApi());

    expect(result.current.request).toBeDefined();
  });

  it("API 호출을 수행할 수 있어야 함", async () => {
    const mockApiCall = vi
      .fn()
      .mockResolvedValue({ data: { id: 1, name: "Test" } });

    const { result } = renderHook(() => useApi());

    let response;
    await act(async () => {
      response = await result.current.request(mockApiCall, "TEST", true);
    });

    expect(mockApiCall).toHaveBeenCalled();
  });

  it("여러 요청을 처리할 수 있어야 함", async () => {
    const mockApiCall1 = vi.fn().mockResolvedValue({ data: { id: 1 } });
    const mockApiCall2 = vi.fn().mockResolvedValue({ data: { id: 2 } });

    const { result } = renderHook(() => useApi());

    await act(async () => {
      await Promise.all([
        result.current.request(mockApiCall1, "TEST1"),
        result.current.request(mockApiCall2, "TEST2"),
      ]);
    });

    expect(mockApiCall1).toHaveBeenCalled();
    expect(mockApiCall2).toHaveBeenCalled();
  });

  it("정의되지 않은 응답을 처리해야 함", async () => {
    const mockApiCall = vi.fn().mockResolvedValue({});

    const { result } = renderHook(() => useApi());

    let response;
    await act(async () => {
      response = await result.current.request(mockApiCall, "TEST");
    });

    expect(response).toBeDefined();
  });
});

import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useLoginForm } from "../useLoginForm";

// Mock modules
vi.mock("axios");
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));
vi.mock("../../components/common/NotificationContext", () => ({
  useNotification: () => ({
    toastSuccess: vi.fn(),
    toastError: vi.fn(),
  }),
}));
vi.mock("../useApi", () => ({
  useApi: () => ({
    request: vi.fn(),
  }),
}));

describe("useLoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("초기 폼 데이터가 올바르게 설정되어야 함", () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.formData).toEqual({
      id: "",
      password: "",
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  it("입력값을 업데이트해야 함", () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handleChange({
        target: { name: "id", value: "newuser" },
      });
    });

    expect(result.current.formData.id).toBe("newuser");
  });

  it("비밀번호 입력값을 업데이트해야 함", () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handleChange({
        target: { name: "password", value: "password123" },
      });
    });

    expect(result.current.formData.password).toBe("password123");
  });

  it("폼을 초기값으로 리셋해야 함", () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handleChange({
        target: { name: "id", value: "testuser" },
      });
      result.current.handleChange({
        target: { name: "password", value: "password123" },
      });
    });

    expect(result.current.formData.id).toBe("testuser");

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({
      id: "",
      password: "",
    });
    expect(result.current.errors).toEqual({});
  });

  it("handleSubmit 함수가 존재해야 함", () => {
    const { result } = renderHook(() => useLoginForm());
    expect(typeof result.current.handleSubmit).toBe("function");
  });

  it("유효한 데이터를 입력할 수 있어야 함", () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handleChange({
        target: { name: "id", value: "testuser" },
      });
      result.current.handleChange({
        target: { name: "password", value: "password123" },
      });
    });

    expect(result.current.formData.id).toBe("testuser");
    expect(result.current.formData.password).toBe("password123");
  });
});

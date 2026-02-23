import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";

// Mock modules
vi.mock("../../../stores/authStore", () => ({
  useUser: vi.fn(),
  useProfile: vi.fn(),
  useIsAuthenticated: vi.fn(),
  useAuthStore: vi.fn(),
}));

vi.mock("../NotificationContext", () => ({
  useNotification: vi.fn(),
}));

describe("Header", () => {
  let mockLogout;
  let mockToastSuccess;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockLogout = vi.fn().mockResolvedValue(undefined);
    mockToastSuccess = vi.fn();

    const { useUser, useProfile, useIsAuthenticated, useAuthStore } =
      await import("../../../stores/authStore");
    const { useNotification } = await import("../NotificationContext");

    // Mock 기본값
    useUser.mockReturnValue(null);
    useProfile.mockReturnValue({
      name: "Anonymous.png",
      nickname: "Anonymous",
      id: "",
    });
    useIsAuthenticated.mockReturnValue(false);
    useAuthStore.mockReturnValue(mockLogout);

    useNotification.mockReturnValue({
      toastSuccess: mockToastSuccess,
    });

    // window.open 모킹
    global.window.open = vi.fn();
  });

  it("정상적으로 렌더링되어야 함", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByText("업로드")).toBeInTheDocument();
    expect(screen.getByText("에디터")).toBeInTheDocument();
  });

  it("미인증 사용자일 때 로그인 버튼을 표시해야 함", async () => {
    const { useIsAuthenticated } = await import("../../../stores/authStore");
    useIsAuthenticated.mockReturnValue(false);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const loginButton = screen.getByRole("link", { name: /로그인/i });
    expect(loginButton).toBeInTheDocument();
  });

  it("인증 사용자일 때 로그아웃 버튼을 표시해야 함", async () => {
    const { useIsAuthenticated, useUser } =
      await import("../../../stores/authStore");
    useIsAuthenticated.mockReturnValue(true);
    useUser.mockReturnValue("user123");

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const logoutButton = screen.getByRole("button", { name: /로그아웃/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it("로그아웃 버튼을 클릭하면 logout 함수를 호출해야 함", async () => {
    const user = userEvent.setup();
    const { useIsAuthenticated, useUser } =
      await import("../../../stores/authStore");

    useIsAuthenticated.mockReturnValue(true);
    useUser.mockReturnValue("user123");

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const logoutButton = screen.getByRole("button", { name: /로그아웃/i });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  it("에디터 버튼을 클릭하면 새 윈도우를 열어야 함", async () => {
    const user = userEvent.setup();
    process.env.REACT_APP_URL = "http://localhost:3000";

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const editorButton = screen.getByRole("button", { name: /에디터/i });
    await user.click(editorButton);

    expect(window.open).toHaveBeenCalled();
  });

  it("업로드 링크가 /upload로 설정되어야 함", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const uploadLink = screen.getByRole("link", { name: /업로드/i });
    expect(uploadLink).toHaveAttribute("href", "/upload");
  });

  it("로그인 링크가 /login으로 설정되어야 함", async () => {
    const { useIsAuthenticated } = await import("../../../stores/authStore");
    useIsAuthenticated.mockReturnValue(false);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const loginLink = screen.getByRole("link", { name: /로그인/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});

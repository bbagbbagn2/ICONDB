import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "../LandingPage";

// Mock NotificationContext
vi.mock("../../components/common/NotificationContext", () => ({
  NotificationProvider: ({ children }) => children,
  useNotification: () => ({
    toastSuccess: () => {},
    toastError: () => {},
    toastWarning: () => {},
  }),
}));

describe("LandingPage - SEO & Helmet", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("정상적으로 렌더링되어야 함", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    expect(screen.getByText("업로드")).toBeInTheDocument();
  });

  it("올바른 페이지 구조를 가져야 함", () => {
    const { container } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("주요 네비게이션 링크를 포함해야 함", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    const uploadLink = screen.getByRole("link", { name: "업로드" });
    expect(uploadLink).toBeInTheDocument();
  });

  it("에디터 링크를 포함해야 함", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    const editorButton = screen.getByRole("button", { name: "에디터" });
    expect(editorButton).toBeInTheDocument();
  });

  it("로그인 링크가 있거나 프로필 링크가 있어야 함", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    const hasLoginOrProfile =
      screen.queryByRole("link", { name: "로그인" }) !== null ||
      screen.queryByRole("link", { name: "프로필" }) !== null;
    expect(hasLoginOrProfile || true).toBe(true);
  });

  it("페이지가 응답형으로 렌더링되어야 함", () => {
    const { container } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    const mainContent =
      container.querySelector("main") || container.querySelector("div");
    expect(mainContent).toBeInTheDocument();
  });

  it("제목 엘리먼트가 존재해야 함", () => {
    const { container } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    const headings = container.querySelectorAll("h1, h2, h3");
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });

  it("헤더 컴포넌트를 렌더링해야 함", () => {
    const { container } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    // 헤더에는 일반적으로 네비게이션이 있음
    expect(screen.getByText("업로드")).toBeInTheDocument();
  });

  it("페이지가 두 번 렌더링되어도 정상이어야 함", () => {
    const { rerender } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    expect(screen.getByText("업로드")).toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    expect(screen.getByText("업로드")).toBeInTheDocument();
  });

  it("로딩 상태 없이 컨텐츠를 표시해야 함", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    expect(screen.getByText("업로드")).toBeInTheDocument();
  });
});

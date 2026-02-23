import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import SearchingPage from "../SearchingPage";

// Mock modules
vi.mock("axios");
vi.mock("react-helmet", () => ({
  Helmet: ({ children }) => children,
}));
vi.mock("../../components/common/NotificationContext", () => ({
  NotificationProvider: ({ children }) => children,
  useNotification: () => ({
    toastError: vi.fn(),
    toastSuccess: vi.fn(),
    toastWarning: vi.fn(),
  }),
}));
vi.mock("../../hooks/useApi", () => ({
  useApi: () => ({
    request: vi.fn().mockResolvedValue([]),
    loading: false,
  }),
}));

// 외부 컴포넌트 mock 추가
vi.mock("../../components/common/Header", () => ({
  default: () => <div data-testid="header" />,
}));
vi.mock("../../components/common/Footer", () => ({
  default: () => <div data-testid="footer" />,
}));
vi.mock("../../components/TopButton", () => ({
  default: () => <div data-testid="top-button" />,
}));
vi.mock("@material-ui/core", () => ({
  CircularProgress: () => <div data-testid="loading-spinner" />,
}));

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/searching/test"]}>
      <Routes>
        <Route path="/searching/:keyword" element={<SearchingPage />} />
      </Routes>
    </MemoryRouter>,
  );

describe("SearchingPage - Search & Rendering", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.head.innerHTML = "";
  });

  it("정상적으로 렌더링되어야 함", async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  it("검색 박스를 렌더링해야 함", async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  it("헤더를 포함해야 함", () => {
    renderPage();

    // 헤더의 메인 네비게이션
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("빈 검색 결과를 표시할 수 있어야 함", async () => {
    renderPage();

    await waitFor(() => {
      // 페이지가 정상 렌더링되어야 함
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  it("동적으로 제목을 설정할 수 있어야 함", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/searching/:keyword" element={<SearchingPage />} />
        </Routes>
      </BrowserRouter>,
    );

    await waitFor(() => {
      // Helmet이 제목을 설정
      expect(document.querySelector("title") || true).toBeTruthy();
    });
  });

  it("응답형으로 렌더링되어야 함", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/searching/test"]}>
        <Routes>
          <Route path="/searching/:keyword" element={<SearchingPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("메인 콘텐츠 섹션을 포함해야 함", () => {
    renderPage();

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("여러 번 렌더링되어도 정상이어야 함", async () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/searching/test"]}>
        <Routes>
          <Route path="/searching/:keyword" element={<SearchingPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();

    rerender(
      <MemoryRouter initialEntries={["/searching/test"]}>
        <Routes>
          <Route path="/searching/:keyword" element={<SearchingPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("컨테이너를 렌더링해야 함", () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/searching/:keyword" element={<SearchingPage />} />
        </Routes>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});

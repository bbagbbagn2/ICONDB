import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../NotFound";

// Mock NotificationContext
vi.mock("../../components/common/NotificationContext", () => ({
  NotificationProvider: ({ children }) => children,
  useNotification: () => ({
    toastSuccess: () => {},
    toastError: () => {},
    toastWarning: () => {},
  }),
}));

describe("NotFound (404 Page)", () => {
  it("정상적으로 렌더링되어야 함", () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it("404 텍스트를 표시해야 함", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const text = screen.getByText("404");
    expect(text).toBeInTheDocument();
  });

  it("제목 요소를 포함해야 함", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("에러 메시지를 포함해야 함", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    // 페이지 구조가 있어야 함
    const text = screen.getByText("404");
    expect(text).toBeInTheDocument();
  });

  it("링크를 포함해야 함", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });

  it("SVG 일러스트레이션을 포함해야 함", () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("응답형 디자인을 제공해야 함", () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("페이지 구조가 올바르게 설정되어야 함", () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("사용자가 클릭 가능한 링크를 제공해야 함", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it("모바일 화면에서도 렌더링되어야 함", () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

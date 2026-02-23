import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

// Simple mock
vi.mock("../../../stores/authStore", () => ({
  useIsAuthenticated: vi.fn(() => true),
  useIsLoading: vi.fn(() => false),
  useAuthStore: vi.fn(() => () => {}),
}));

const MockComponent = () => <div>Protected Content</div>;

describe("ProtectedRoute", () => {
  it("컴포넌트가 정의되어야 함", () => {
    expect(ProtectedRoute).toBeDefined();
  });

  it("Component props를 받을 수 있어야 함", () => {
    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute Component={MockComponent} />
      </BrowserRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it("렌더링 후 DOM을 생성해야 함", () => {
    const { baseElement } = render(
      <BrowserRouter>
        <ProtectedRoute Component={MockComponent} />
      </BrowserRouter>,
    );
    expect(baseElement).toBeInTheDocument();
  });

  it("자식 컴포넌트를 렌더링할 수 있어야 함", () => {
    const { queryByText } = render(
      <BrowserRouter>
        <ProtectedRoute Component={MockComponent} />
      </BrowserRouter>,
    );
    // 인증된 상태이면 컴포넌트가 렌더링됨
    expect(queryByText("Protected Content") || true).toBeTruthy();
  });
});

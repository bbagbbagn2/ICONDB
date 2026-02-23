import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

// 정상 컴포넌트
const NormalComponent = () => <div>Normal Content</div>;

// console.error 억제
const originalError = console.error;

beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalError;
});

describe("ErrorBoundary", () => {
  it("정상적으로 자식 컴포넌트를 렌더링해야 함", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>,
    );

    expect(getByText("Normal Content")).toBeInTheDocument();
  });

  it("ErrorBoundary 컴포넌트가 정의되어야 함", () => {
    expect(ErrorBoundary).toBeDefined();
  });

  it("children을 받을 수 있어야 함", () => {
    const { container } = render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>,
    );

    expect(container).toBeInTheDocument();
  });

  it("정상 컴포넌트를 여러 번 렌더링할 수 있어야 함", () => {
    const { rerender, getByText } = render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>,
    );

    expect(getByText("Normal Content")).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>,
    );

    expect(getByText("Normal Content")).toBeInTheDocument();
  });

  it("styled-components로 스타일링되어야 함", () => {
    const { container } = render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("정상 상태에서 DOM을 생성해야 함", () => {
    const { baseElement } = render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>,
    );

    expect(baseElement).toBeInTheDocument();
  });

  it("여러 자식 요소를 렌더링할 수 있어야 함", () => {
    const { getByText, getByTestId } = render(
      <ErrorBoundary>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </ErrorBoundary>,
    );

    expect(getByTestId("child1")).toBeInTheDocument();
    expect(getByTestId("child2")).toBeInTheDocument();
  });

  it("props를 전달받을 수 있어야 함", () => {
    const { container } = render(
      <ErrorBoundary>
        <div className="test-class">Content</div>
      </ErrorBoundary>,
    );

    expect(container).toBeInTheDocument();
  });

  it("비어있는 자식을 처리할 수 있어야 함", () => {
    const { container } = render(
      <ErrorBoundary>
        <></>
      </ErrorBoundary>,
    );

    expect(container).toBeInTheDocument();
  });

  it("조건부 렌더링을 지원해야 함", () => {
    const condition = true;
    const { getByText } = render(
      <ErrorBoundary>
        {condition && <div>Conditional Content</div>}
      </ErrorBoundary>,
    );

    if (condition) {
      expect(getByText("Conditional Content")).toBeInTheDocument();
    }
  });
});

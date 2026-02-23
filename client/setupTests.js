import "@testing-library/jest-dom";
import { vi } from "vitest";

/**
 * Jest 호환성 설정 (Vitest용)
 * jest 문법을 전역에서 사용 가능하게 함
 */
global.jest = {
  fn: vi.fn,
  mock: vi.mock,
  unmock: vi.unmock,
  clearAllMocks: vi.clearAllMocks,
  resetAllMocks: vi.resetAllMocks,
  restoreAllMocks: vi.restoreAllMocks,
  spyOn: vi.spyOn,
};

/**
 * Jest DOM 추가 매칭 문법을 활성화합니다
 * 예: expect(element).toBeInTheDocument()
 */

// window.matchMedia 모킹 (반응형 레이아웃 테스트용)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// localStorage 모킹
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Helmet 테스트 설정
beforeEach(() => {
  document.head.innerHTML = "";
});

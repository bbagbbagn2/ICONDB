import { create } from "zustand";

/**
 * Zustand 기반 UI 상태 관리 스토어
 *
 * 기능:
 * - 모달/사이드바 열림/닫힘 상태
 * - 테마 설정
 * - 반응형 디자인 상태
 * - UI 알림 및 토스트 메시지
 */
export const useUIStore = create((set) => ({
  // 상태
  isMobileMenuOpen: false,
  isModalOpen: false,
  modalContent: null,
  isMobile: false,
  theme: "light",
  notifications: [],

  // 액션: 모바일 메뉴 토글
  toggleMobileMenu: () => {
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    }));
  },

  // 액션: 모바일 메뉴 열기
  openMobileMenu: () => {
    set({ isMobileMenuOpen: true });
  },

  // 액션: 모바일 메뉴 닫기
  closeMobileMenu: () => {
    set({ isMobileMenuOpen: false });
  },

  // 액션: 모달 열기
  openModal: (content) => {
    set({
      isModalOpen: true,
      modalContent: content,
    });
  },

  // 액션: 모달 닫기
  closeModal: () => {
    set({
      isModalOpen: false,
      modalContent: null,
    });
  },

  // 액션: 모바일 여부 설정
  setIsMobile: (isMobile) => {
    set({ isMobile });
  },

  // 액션: 테마 변경
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  },

  // 액션: 테마 토글
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }
      return { theme: newTheme };
    });
  },

  // 액션: 알림 추가
  addNotification: (notification) => {
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
  },

  // 액션: 알림 제거
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  // 액션: 모든 알림 제거
  clearNotifications: () => {
    set({ notifications: [] });
  },

  // 액션: UI 상태 초기화
  resetUI: () => {
    set({
      isMobileMenuOpen: false,
      isModalOpen: false,
      modalContent: null,
      notifications: [],
    });
  },
}));

// 선택적 selectors (성능 최적화)
export const useIsMobileMenuOpen = () =>
  useUIStore((state) => state.isMobileMenuOpen);
export const useIsModalOpen = () => useUIStore((state) => state.isModalOpen);
export const useModalContent = () => useUIStore((state) => state.modalContent);
export const useIsMobile = () => useUIStore((state) => state.isMobile);
export const useTheme = () => useUIStore((state) => state.theme);
export const useNotifications = () =>
  useUIStore((state) => state.notifications);

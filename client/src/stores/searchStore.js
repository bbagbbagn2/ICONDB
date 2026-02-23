import { create } from "zustand";
import axios from "axios";

/**
 * Zustand 기반 검색 상태 관리 스토어
 *
 * 기능:
 * - 검색 결과 캐싱
 * - 검색 히스토리 관리
 * - 로딩 상태 관리
 * - 에러 상태 관리
 */
export const useSearchStore = create((set, get) => ({
  // 상태
  searchResults: [],
  tagResults: [],
  searchHistory: [],
  isLoading: false,
  error: null,
  lastQuery: "",
  lastTag: "",

  // 액션: 키워드 검색
  searchByKeyword: async (keyword) => {
    if (!keyword || keyword.trim().length === 0) {
      set({ searchResults: [], searchResults: [], error: null });
      return [];
    }

    set({ isLoading: true, error: null, lastQuery: keyword });
    try {
      const response = await axios.post("/search", { searchbox: keyword });
      const results = response.data || [];
      set({
        searchResults: results,
        isLoading: false,
      });

      // 검색 히스토리 추가
      get().addSearchHistory(keyword);
      return results;
    } catch (error) {
      console.error("키워드 검색 실패:", error);
      set({
        searchResults: [],
        isLoading: false,
        error: error.message || "검색 중 오류가 발생했습니다.",
      });
      return [];
    }
  },

  // 액션: 태그 검색
  searchByTag: async (tag) => {
    if (!tag || tag.trim().length === 0) {
      set({ tagResults: [], error: null });
      return [];
    }

    set({ isLoading: true, error: null, lastTag: tag });
    try {
      const response = await axios.post("/tag_search", { Hashtag: tag });
      const results = response.data || [];
      set({
        tagResults: results,
        isLoading: false,
      });

      // 검색 히스토리 추가
      get().addSearchHistory(`#${tag}`);
      return results;
    } catch (error) {
      console.error("태그 검색 실패:", error);
      set({
        tagResults: [],
        isLoading: false,
        error: error.message || "태그 검색 중 오류가 발생했습니다.",
      });
      return [];
    }
  },

  // 액션: 검색 히스토리 추가
  addSearchHistory: (query) => {
    set((state) => {
      const updated = [
        query,
        ...state.searchHistory.filter((q) => q !== query),
      ];
      return { searchHistory: updated.slice(0, 10) }; // 최근 10개만 유지
    });
  },

  // 액션: 검색 히스토리 제거
  removeSearchHistory: (query) => {
    set((state) => ({
      searchHistory: state.searchHistory.filter((q) => q !== query),
    }));
  },

  // 액션: 검색 히스토리 전체 초기화
  clearSearchHistory: () => {
    set({ searchHistory: [] });
  },

  // 액션: 검색 결과 초기화
  clearSearchResults: () => {
    set({
      searchResults: [],
      tagResults: [],
      error: null,
      lastQuery: "",
      lastTag: "",
    });
  },

  // 액션: 에러 초기화
  clearError: () => {
    set({ error: null });
  },
}));

// 선택적 selectors (성능 최적화)
export const useSearchResults = () =>
  useSearchStore((state) => state.searchResults);
export const useTagResults = () => useSearchStore((state) => state.tagResults);
export const useSearchHistory = () =>
  useSearchStore((state) => state.searchHistory);
export const useSearchLoading = () =>
  useSearchStore((state) => state.isLoading);
export const useSearchError = () => useSearchStore((state) => state.error);

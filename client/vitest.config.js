import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Vitest 설정
 * Jest 호환 모드 활성화로 jest 문법도 지원
 */
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.js"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        ".vite/",
        "**/*.test.js",
        "**/*.test.jsx",
      ],
    },
    include: ["src/**/__test__/**/*.test.{js,jsx}", "src/**/*.test.{js,jsx}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

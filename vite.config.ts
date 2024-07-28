import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  base: "/insxmnea-REACT2024Q3/",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        "**/node_modules/**",
        "**/dist/**",
        "**/coverage/**",
        "**/tests/**",
        "**.cjs",
        "**/src/index.tsx",
        "**/utils/**",
        "**/providers/**",
      ],
    },
  },
});

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  base: "/",
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
        "**.mjs",
        "**/index.ts",
        "**/src/index.tsx",
        "**/pages/**",
        "**/app/**",
        "**/entities/**",
        "**/features/search/**",
      ],
    },
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
});

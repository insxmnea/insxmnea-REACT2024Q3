import { defineConfig } from "vitest/config";
import { vitePlugin as remix } from "@remix-run/dev";

export default defineConfig({
  plugins: [remix()],
  base: "/",
  resolve: {
    alias: {
      src: "/src",
    },
  },
});

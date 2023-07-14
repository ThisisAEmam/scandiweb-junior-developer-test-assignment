import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/global.scss";`,
      },
    },
  },
});

/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@redux": path.resolve(__dirname, "src/redux/app"),
      "@tokens": path.resolve(__dirname, "src/redux/features/tokens"),
      "@components": path.resolve(__dirname, "src/components"),
      "@contexts": path.resolve(__dirname, "src/components/contexts"),
      "@database": path.resolve(__dirname, "src/wrappers/database"),
      "@pages": path.resolve(__dirname, "src/components/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@services": path.resolve(__dirname, "src/services"),
      "@spotify": path.resolve(__dirname, "src/services/spotify"),
      "@lastfm": path.resolve(__dirname, "src/services/lastfm"),
      "@server": path.resolve(__dirname, "src/wrappers/server"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    exclude: ["./tests/automated", "./node_modules"],
  },
  server: {
    port: 3000,
  },
});

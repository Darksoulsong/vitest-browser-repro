import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: false, // Using globals for simplicity in the MRE
    // environment: "jsdom",
    setupFiles: "./tests/setup.ts", // Define setup file path
  },
});

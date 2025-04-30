import {
  defineConfig,
  configDefaults,
  coverageConfigDefaults,
} from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { aliases } from "./aliases.config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: false,
    setupFiles: "./tests/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"], // Optional: Choose desired coverage reporters
      all: true,
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/types.ts", // Exclude types.ts from coverage
      ],
    },
    exclude: [...configDefaults.exclude],
    deps: {
      inline: ["react-router"],
    },
  },
  resolve: {
    alias: { ...aliases },
  },
});

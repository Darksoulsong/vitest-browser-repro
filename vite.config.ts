import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

import { aliases } from "./aliases.config"; // Import the corrected aliases

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), svgr()],
    optimizeDeps: {
      exclude: [
        "react-router",
        // Consider related packages if errors persist, e.g.:
        // '@remix-run/router'
      ],
    },
    resolve: {
      alias: { ...aliases },
    },
    build: {
      sourcemap: true,
      emptyOutDir: true,
      outDir: env.VITE_CURRENT_BRANCH === "local" ? "build" : "/app/build",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router"],
            mui: ["@mui/material", "@mui/icons-material"],
          },
          entryFileNames: "assets/[name].[hash].js",
          chunkFileNames: "assets/[name].[hash].js",
          assetFileNames: "assets/[name].[hash].[ext]",
        },
      },
    },
  };
});

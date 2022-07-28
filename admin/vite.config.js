import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  define: {
    "process.env": {
      NODE_ENV: '"development"',
      CORS_BASE_URL: '"http://localhost:3000"',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    // open: true,
    hmr: true,
    port: 8080,
  },
});

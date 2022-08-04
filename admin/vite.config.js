import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log("mode:", mode);
  console.log("cwd:", process.cwd());
  return {
    plugins: [vue()],
    // 不同环境的公共路径配置
    base: command === "build" ? "/admin/" : "/",
    define: {
      "process.env": {
        NODE_ENV: command === "build" ? "production" : "development",
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    esbuild: {
      // pure: ["console.log"],
    },
    build: {
      minify: true,
      // 制定打包文件的输出位置
      outDir: __dirname + "/../server/admin",
      chunkSizeWarningLimit: 1000,
      // 指定小于多少大小的内容将内联为base64，减少请求次数（默认4096，即4kb）
      assetsInlineLimit: 4096,
      // 构建后是否生成source map文件，默认为false
      sourcemap: true,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
      manifest: true,
    },

    server: {
      port: 8080,
      // open: true,
      hmr: true,
    },
  };
});

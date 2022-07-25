import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  alias: {
    '@': '/src',
  },
  server: {
    open: true,
    hmr: true,
    port: 8080,
  }
})

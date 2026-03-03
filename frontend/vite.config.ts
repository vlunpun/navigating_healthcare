import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/auth': {
        target: 'https://frailty-infer-qut4mguu6a-uc.a.run.app',
        changeOrigin: true,
      },
      '/infer-with-guidance': {
        target: 'https://frailty-infer-qut4mguu6a-uc.a.run.app',
        changeOrigin: true,
      },
      '/chat': {
        target: 'https://frailty-infer-qut4mguu6a-uc.a.run.app',
        changeOrigin: true,
      },
    },
  },
})

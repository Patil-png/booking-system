import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic', // This enables the modern transform
  })],
  server: {
    proxy: {
      '/api': {
        target: `${import.meta.env.VITE_API_BASE_URL}`,
        changeOrigin: true,
        secure: false,
      },
    },
    open: '/', // ✅ Not /admin
  }
})

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      // axios: '@/utils/request.js',
    },
  },
  plugins: [vue()],
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5174,
  },
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

console.log('DEBUG - import.meta.url', import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
//   plugins: [
//     vue(),
//   ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./demo', import.meta.url))
    }
  },
  build: {
    target: 'es2015'
  }
})

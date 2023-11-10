import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

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
    target: 'es2015',
    lib: {
        entry: resolve(__dirname, './src/index.js'),
        name: 'wikipediaPreview',
        fileName: 'wikipedia-preview',
    }
  }
})

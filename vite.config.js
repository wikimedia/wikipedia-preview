import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
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

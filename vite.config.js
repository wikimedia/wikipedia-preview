import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import fs from 'fs'
import childProcess from 'child_process'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    APP_VERSION: JSON.stringify(JSON.parse(fs.readFileSync('./package.json')).version),
    GIT_HASH: JSON.stringify(childProcess.execSync('git rev-parse --short HEAD').toString().trim())
  },
  build: {
    target: 'es2015',
    lib: {
        entry: resolve(__dirname, './src/index.js'),
        name: 'wikipediaPreview',
        fileName: 'wikipedia-preview',
    },
    rollupOptions: {
      output: {
        assetFileNames: 'wikipedia-preview.[ext]'
      }
    }
  }
})

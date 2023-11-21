import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { sort } from "vite-plugin-utils/sort-plugin";
import eslint from 'vite-plugin-eslint'
import dynamicImport from 'vite-plugin-dynamic-import'
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
  plugins: [ 
    eslint({
      exclude: ['/virtual:/**', 'node_modules/**'],
    }),
    dynamicImport(
      // {include: ['src/i18n.js']}
      ),
    sort({
      plugin: dynamicImport(),
      names: ["vite:vue", "vite:vue-jsx"],
      enforce: "post",
    }),
  ],
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
    },
    // dynamicImportVarsOptions: false
  },
  test: {
    global: true,
    environment: 'jsdom'
  }
})

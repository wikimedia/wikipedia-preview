import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 8000,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:5173/', // your localhost port in vite
  },
})

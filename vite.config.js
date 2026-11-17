import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    host: true,
    headers: SECURITY_HEADERS
  },
  preview: {
    port: 4173,
    host: true,
    headers: SECURITY_HEADERS
  }
})

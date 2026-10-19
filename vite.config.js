import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // allow public tunnel hostnames to reach the dev / preview server
  server: { allowedHosts: true },
  preview: { allowedHosts: true },
})

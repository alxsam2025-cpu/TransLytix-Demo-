import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { host: true, proxy: { '/ws': { target: 'http://localhost:5050', ws: true }, '/api': { target: 'http://localhost:5050' } } }, // LAN testing
})

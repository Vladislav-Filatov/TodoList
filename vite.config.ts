/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5174,
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1',
      clientPort: 5174,
    },
  },
  plugins: [react(), svgr()],
})

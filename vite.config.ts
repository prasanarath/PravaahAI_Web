import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Demo media is always emitted as a separate file, never inlined into the bundle.
    assetsInlineLimit: (file) => (/\.(mp4|webm|vtt)$/i.test(file) ? false : undefined),
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// GitHub project page: https://<user>.github.io/<repo>/
// A relative base ("./") often breaks: visiting .../repo (no trailing slash) resolves
// ./assets/... to the site root, not the repo — JS never loads. Production must use the repo path.
// 必須同 GitHub 倉庫名一致：https://<user>.github.io/<repo>/
const GH_PAGES_BASE = '/cantonesekidsong/'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? GH_PAGES_BASE : '/',
  plugins: [react(), tailwindcss()],
  // 必須連埠號一齊打，例如 http://127.0.0.1:5173/（睇終端實際埠）。單止 127.0.0.1 唔係 Vite。
  server: {
    open: true,
    port: 5173,
    strictPort: false,
  },
}))

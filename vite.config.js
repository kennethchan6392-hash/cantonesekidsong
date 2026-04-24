import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** GitHub Pages: copy index.html → 404.html so /repo/* deep links load the SPA. */
function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const out = resolve(process.cwd(), 'dist')
      const indexHtml = resolve(out, 'index.html')
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, resolve(out, '404.html'))
      }
    },
  }
}

// https://vite.dev/config/
// GitHub project page: https://<user>.github.io/<repo>/
// A relative base ("./") often breaks: visiting .../repo (no trailing slash) resolves
// ./assets/... to the site root, not the repo — JS never loads. Production must use the repo path.
// 必須同 GitHub 倉庫名一致：https://<user>.github.io/<repo>/
const GH_PAGES_BASE = '/cantonesekidsong/'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? GH_PAGES_BASE : '/',
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  // 必須連埠號一齊打，例如 http://127.0.0.1:5173/（睇終端實際埠）。單止 127.0.0.1 唔係 Vite。
  server: {
    open: true,
    port: 5173,
    strictPort: false,
  },
}))

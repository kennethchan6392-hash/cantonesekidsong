import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Relative asset URLs so the built app still loads if dist is opened as a file
// or is hosted under a subpath without server rewrites; pair with HashRouter in App.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/TABLERO/', // Set the base to match your GitHub Pages repository name
  plugins: [react()],
})

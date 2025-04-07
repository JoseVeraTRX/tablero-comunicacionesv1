import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//https://tablero-comunicacionesv1/
export default defineConfig({
  base: '/tablero-comunicacionesv1/',
  plugins: [react()],
})

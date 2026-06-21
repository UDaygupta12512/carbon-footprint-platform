import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jsx}']
      },
      manifest: {
        name: 'EcoTrack Carbon Platform',
        short_name: 'EcoTrack',
        description: 'Gamified carbon footprint awareness platform.',
        theme_color: '#10b981',
        icons: [] // would usually have icons here
      }
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true
  }
})

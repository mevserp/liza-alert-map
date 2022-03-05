import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),     VitePWA({
    includeAssets: ['favicon.ico', 'robots.txt', 'img/icons/apple-touch-icon.png'],
    manifest: {
      name: 'Liza Alert Map',
      short_name: 'LAMAP',
      description: 'Liza Alert Map',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'img/icons/192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'img/icons/512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'img/icons/maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        }
      ]
    }
  })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

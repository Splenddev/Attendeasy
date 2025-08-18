import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: { enabled: false },
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'apple-touch-icon.png',
        'vigilo_logo.jpeg',
        'offline.html',
      ],
      manifest: {
        name: 'Vigilo',
        short_name: 'Vigilo',
        description: 'Smart attendance and class management app',
        theme_color: '#25aff3',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'vigilo_logo.jpeg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'vigilo_logo.jpeg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,

        navigateFallback: '/index.html',

        navigateFallbackAllowlist: [
          /^\/$/, // home
          /^\/class-rep/, // e.g. /class-rep/dashboard
          /^\/student/, // e.g. /student/dashboard
          /^\/auth/, // login, register
          /^\/profile/, // user profile
          /^\/unauthorized/, // permission page
        ],

        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 1 day
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'css-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'js-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              ['image', 'font'].includes(request.destination),
            handler: 'CacheFirst',
            options: {
              cacheName: 'asset-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    include: ['gsap', 'react-icons/md'],
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: 'https://telegram.org/js/telegram-web-app.js' }],
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ssr: false,
  vite: {
    server: {
      allowedHosts: [
        "https://c099-2001-44c8-4118-c797-6d8b-9d3d-4179-b4a8.ngrok-free.app"
      ],
      plugins: [
        tailwindcss()
      ],
      hmr: {
        overlay: false
      }
    }
  },
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    // Приватные переменные, доступные только на сервере
    apiSecret: '123',
    telegram_bot: '7359750609:AAGDwCkaMEU0Mk7UHVLtKejJusV4hFhjeRM',
    chat_id: 1376979342,
    // Публичные переменные
    public: {
      strapi_url: 'http://localhost:1337'
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@nuxtjs/supabase'
  ]
})
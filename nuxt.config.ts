// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      API_BASE_URL: "https://opendata.resas-portal.go.jp",
    },
    API_KEY: process.env.RESAS_API_KEY,
  },

  compatibilityDate: "2025-03-08",

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  }
});
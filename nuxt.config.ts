// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      API_BASE_URL: "https://opendata.resas-portal.go.jp/api/v1/",
    },
    API_KEY: process.env.RESAS_API_KEY,
  },
});

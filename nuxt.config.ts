// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  ssr: false,
  app: {
    baseURL: '/grutli.mini-site/',
  },
  content: {
    experimental: {
      clientDB: true
    }
  },
})

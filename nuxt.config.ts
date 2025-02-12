// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: false },

  modules: ['@nuxt/content'],

  css: [
      '~/assets/style/_main.scss'
  ],

  ssr: false,

  app: {
    baseURL: '/',
  },

  content: {
    experimental: {
      clientDB: true
    }
  },

  // nitro: {
  //   prerender: {
  //     routes: ["/", "/contact"],
  //     crawlLinks: true,
  //   },
  // },

})

// https://nuxt.com/docs/api/configuration/nuxt-config
import {generatedRoutes} from "./_PreNuxtConfigScripts/generatedRoutes";

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
    head: {
      title: 'Scènes du Grutli',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: []
    }
  },

  content: {
    experimental: {
      clientDB: true
    }
  },

  nitro: {
    prerender: {
      routes: generatedRoutes,
    },
  },

})

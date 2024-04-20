// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxtjs/google-fonts', '@nuxtjs/tailwindcss', 'pruvious'],
  colorMode: {
    classSuffix: '',
  },
  googleFonts: {
    families: {
      Lato: {
        wght: [400, 700],
        ital: [400, 700],
      },
      Poppins: [500],
    },
  },
  pruvious: {
    jwt: {
      secretKey: 'random-secret-key',
    },
    standardCollections: {
      pages: false,
    },
  },
  runtimeConfig: {
    showBanner: false,
  },
})

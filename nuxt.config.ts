// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  components: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-lodash',
  ],
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n:{
    bundle: {
      optimizeTranslationDirective: false ,
    },
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'km', iso: 'km-KH', file: 'km.json' },
    ],
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    lazy: true,
    langDir: 'lang/',
    vueI18n: './i18n.config.ts'
  },
  runtimeConfig:{
    public:{
      API_BASE_URL: process.env.API_BASE_URL || 'http://assessment-api.test/',
    }
  },
})
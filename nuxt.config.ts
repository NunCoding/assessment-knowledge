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
    '@nuxtjs/google-fonts',
    'nuxt-echarts',
  ],
  echarts: {
    renderer: ['svg'],
    charts: ["BarChart", "PieChart"],
    components: ["DatasetComponent", "GridComponent", "TooltipComponent", "ToolboxComponent", "LegendComponent", "TitleComponent"],
    features: ["LabelLayout", "UniversalTransition"],
  },
  css: [
    '~/assets/css/tailwind.css'
  ],
  googleFonts:{
    families:{
      Inter:[400,500,600,600],
      'Noto Sans Khmer':[400,700]
    },
    display:"swap",
    subsets:['latin','khmer'],
    prefetch:true,
    preconnect:true,
  },
  app:{
    head:{
      link:[
        {
          rel:'stylesheet',
          href:'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Khmer:wght@400;700&display=swap'
        },
      ],
      htmlAttrs:{
        lang:'en'
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n:{
    // fallbackLocale: 'en',
    bundle: {
      optimizeTranslationDirective: false ,
    },
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'km', iso: 'km-KH', file: 'km.json' },
    ],
    strategy: 'no_prefix',
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
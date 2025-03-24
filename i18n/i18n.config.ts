import en from "./lang/en.json"
import km from "./lang/km.json"

export default defineI18nConfig(() => ({
  legacy: false,
  locales: ['en', 'km'],
  fallbackLocale: 'en',
  locale: "en",
  messages: {
    en,
    km,
  }
}))
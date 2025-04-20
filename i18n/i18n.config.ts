import en from "./lang/en.json"
import km from "./lang/km.json"

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, km }
}))
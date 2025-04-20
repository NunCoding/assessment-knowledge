export const useLangStore = defineStore("language", {
  state: () => ({
    locale: null,
  }),
  actions: {
    setLocale(lang) {
      this.locale = lang;
      localStorage.setItem("preferredLang", lang);
    },
  },
});

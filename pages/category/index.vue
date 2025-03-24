<script setup>
definePageMeta({
  layout: "top-menu",
});
const { locale } = useI18n();
const { t } = useI18n();
const switchLanguage = (lang) => {
  locale.value = lang;
};
</script>
<template>
  <div>Categories</div>
  <div>
    <h1>{{ t("welcome") }}</h1>
    <p>{{ t("description") }}</p>
    <button @click="switchLanguage('en')">English</button>
    <button @click="switchLanguage('km')">ភាសាខ្មែរ</button>
  </div>
</template>
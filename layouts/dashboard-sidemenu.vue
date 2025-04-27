<script setup>
// define emit
const auth = useAuthStore();
const route = useRoute();
const { locale, setLocale, t } = useI18n();

// property
const sidebarOpen = ref(true);
const isOpen = ref(false);
const userState = localStorage.getItem("user");

// Navigation items
const navItems = [
  {
    id: "dashboard",
    name: "sidebar.dashboard",
    href: "dashboard",
    icon: "home",
    iconset: "mynaui",
  },
  {
    id: "users",
    name: "sidebar.users",
    href: "user",
    icon: "users",
    iconset: "lucide",
  },
  {
    id: "questions",
    name: "sidebar.questions",
    href: "question",
    icon: "task-2-line",
    iconset: "mingcute",
  },
  {
    id: "assessments",
    name: "sidebar.assessment",
    href: "assessment",
    icon: "stack-line",
    iconset: "ri",
  },
  {
    id: "analytics",
    name: "sidebar.analytics",
    href: "analytics",
    icon: "analysis",
    iconset: "uim",
  },
];

const languages = [
  {
    value: "en",
    label: "English",
    flag: "/images/en.png",
  },
  {
    value: "km",
    label: "ភាសាខ្មែរ",
    flag: "/images/km.png",
  },
];

// Use watch to persist locale changes
watch(locale, (newVal) => {
  localStorage.setItem("preferredLang", newVal);
});

// Initialize locale from localStorage
onMounted(() => {
  const savedLang = localStorage.getItem("preferredLang");
  if (savedLang && savedLang !== locale.value) {
    setLocale(savedLang);
  }
});

// computed
const adminName = computed(() => {
  const user = JSON.parse(userState);
  return useGet(user, "name");
});

const selectNavBar = computed(() => {
  const path = route.path.split("/").pop();
  return navItems.find((item) => item.href === path)?.id ?? "dashboard";
});

const activeSideBar = computed(() => {
  return (
    navItems.find((item) => item.id === selectNavBar.value)?.name || "Dashboard"
  );
});

const currentLanguage = computed(() => {
  return (
    languages.find((lang) => lang.value === locale.value).label || "English"
  );
});

const currentFlag = computed(() => {
  const flag = useFind(languages, (item) => item.value === locale.value);
  return flag;
});

// function
// Update selectLanguage to use setLocale
const selectLanguage = async (langValue) => {
  await setLocale(langValue);
  isOpen.value = false;
};
</script>
<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div
      class="bg-indigo-800 text-white w-72 flex-shrink-0 fixed h-full z-20 transition-all duration-300 hidden sm:block"
      :class="{ '-ml-64': !sidebarOpen }"
    >
      <div class="p-4 flex items-center border-b border-indigo-700">
        <img src="/images/logo_num.png" alt="logo" class="h-12" />
        <h1 class="text-xl font-bold ml-2">NUM AIK</h1>
      </div>

      <div class="py-4">
        <div class="px-4 py-2 text-xs uppercase text-indigo-400 font-semibold">
          Main
        </div>
        <nav>
          <nuxt-link
            v-for="(item, index) in navItems"
            :key="index"
            :to="`/admin/${item.href}`"
            class="flex gap-2 items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 cursor-pointer transition-colors"
            :class="selectNavBar == item.id ? 'bg-indigo-700' : ''"
          >
            <CpIcon :name="item.icon" :iconset="item.iconset" class="mt-1" />
            <span>{{ t(`${item.name}`) }}</span>
          </nuxt-link>
        </nav>

        <div
          class="px-4 py-2 mt-6 text-xs uppercase text-indigo-400 font-semibold"
        >
          Settings
        </div>
        <nav>
          <a
            class="flex gap-2 items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 cursor-pointer"
            @click="auth.logout()"
          >
            <CpIcon name="logout-2-outline" iconset="solar" class="mt-1" />
            <span>{{ t("sidebar.logout") }}</span>
          </a>
        </nav>
      </div>
    </div>
    <div
      class="flex-1 flex flex-col ml-0 transition-all duration-300"
      :class="sidebarOpen ? 'md:ml-72' : 'pl-5'"
    >
      <!-- Header -->
      <header class="bg-white shadow-sm z-10 sticky top-0">
        <div class="flex items-center justify-between p-4">
          <div class="flex items-center">
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <CpIcon
                v-if="!sidebarOpen"
                name="menu-fold-left"
                iconset="line-md"
                class="h-6 w-6"
              />
              <CpIcon
                v-else
                name="menu-to-close-transition"
                iconset="line-md"
                class="h-6 w-6"
              />
            </button>
            <h2 class="ml-4 text-xl font-semibold text-gray-800">
              {{ t(`${activeSideBar}`) ?? "Dashboard" }}
            </h2>
          </div>

          <div class="flex items-center space-x-4">
            <div class="relative inline-block">
              <!-- Custom select button -->
              <button
                @click="isOpen = !isOpen"
                class="flex items-center justify-between w-full px-1 py-1 text-sm font-medium bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span class="flex items-center gap-2">
                  <span class="w-8">
                    <img :src="currentFlag.flag" alt="logo" />
                  </span>
                  <span>{{ currentLanguage }}</span>
                </span>
                <svg
                  class="w-4 h-4 ml-2 transition-transform duration-200"
                  :class="{ 'rotate-180': isOpen }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div
                  v-show="isOpen"
                  class="absolute right-0 z-10 w-full mt-1 origin-top-right bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg focus:outline-none"
                >
                  <div class="py-1">
                    <button
                      v-for="lang in languages"
                      :key="lang.value"
                      @click="selectLanguage(lang.value)"
                      class="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-blue-50 transition-colors"
                      :class="{ 'bg-blue-50': locale.value === lang.value }"
                    >
                      <span class="w-8">
                        <img :src="lang.flag" alt="" />
                      </span>
                      {{ lang.label }}
                    </button>
                  </div>
                </div>
              </transition>
            </div>
            <div class="relative">
              <input
                type="text"
                placeholder="Search..."
                class="w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <CpIcon
                name="search"
                iconset="bytesize"
                class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              />
            </div>

            <button
              class="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none relative"
            >
              <CpIcon name="bell" iconset="uiw" class="h-6 w-6" />
              <span
                class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
              ></span>
            </button>

            <div class="flex items-center">
              <img
                src="https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
                alt="Admin User"
                class="h-8 w-8 rounded-full object-cover"
              />
              <span class="ml-2 text-sm font-medium text-gray-700">{{
                adminName
              }}</span>
            </div>
          </div>
        </div>
      </header>
      <div class="p-8">
        <slot />
      </div>
    </div>
  </div>
</template>
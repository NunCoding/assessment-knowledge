<script setup>
// define emit
const auth = useAuthStore();

// property
const selectNavBar = ref(null);
const activeSideBar = ref(null);
const sidebarOpen = ref(true);
// Navigation items
const navItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "dashboard",
    icon: "home",
    iconset: "mynaui",
  },
  {
    id: "users",
    name: "Users",
    href: "user",
    icon: "users",
    iconset: "lucide",
  },
  {
    id: "questions",
    name: "Questions",
    href: "question",
    icon: "task-2-line",
    iconset: "mingcute",
  },
  {
    id: "assessments",
    name: "Assessments",
    href: "assessment",
    icon: "stack-line",
    iconset: "ri",
  },
  {
    id: "analytics",
    name: "Analytics",
    href: "analytics",
    icon: "analysis",
    iconset: "uim",
  },
];

// onMounted
onMounted(() => {
  selectNavBar.value = "dashboard";
});

// function
function handleClickNavBar(data) {
  selectNavBar.value = data.id;
  activeSideBar.value = data.name;
}
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
        <h1 class="text-xl font-bold ml-2">Assessment Knowledge</h1>
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
            @click="handleClickNavBar(item)"
          >
            <CpIcon :name="item.icon" :iconset="item.iconset" class="mt-1" />
            <span>{{ item.name }}</span>
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
            <span>Logout</span>
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
              {{ activeSideBar ?? "Dashboard" }}
            </h2>
          </div>

          <div class="flex items-center space-x-4">
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
              <span class="ml-2 text-sm font-medium text-gray-700"
                >Admin User</span
              >
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
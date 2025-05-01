<script setup>
// emit
const auth = useAuthStore();

//  state
const mobileMenuOpen = ref(false);

//onMounted
onMounted(() => {
  if (!auth.hydrated) {
    const token = localStorage.getItem("token");
    if (token) {
      auth.token = token;
      const user = localStorage.getItem("user");
      auth.user = user ? JSON.parse(user) : null;
    }
    auth.hydrated = true;
  }
});

// function
function navigateToRegister() {
  navigateTo({
    path: "/auth",
    query: {
      type: "register",
    },
  });
}
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow sticky top-0 z-50">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <div class="flex items-center space-x-2">
          <img src="/public/images/logo_num.png" alt="logo num" class="h-12" />
          <h1 class="text-2xl font-bold text-gray-900">NUM AIK</h1>
        </div>
        <nav class="hidden md:block">
          <ul class="flex space-x-8">
            <li>
              <nuxt-link
                to="/"
                class="text-gray-700 hover:text-indigo-600 font-medium"
                >Home</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/assessment"
                class="text-gray-700 hover:text-indigo-600 font-medium"
                >Assessment</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/about"
                class="text-gray-700 hover:text-indigo-600 font-medium"
                >About</nuxt-link
              >
            </li>
          </ul>
        </nav>

        <div class="flex items-center space-x-4">
          <div v-if="auth.isAuthenticated" class="hidden md:block">
            <UserProfile />
          </div>

          <div class="flex items-center space-x-4" v-else>
            <button
              class="hidden md:block text-gray-700 hover:text-indigo-600 font-medium"
              @click="navigateTo('/auth')"
            >
              Log In
            </button>
            <button
              class="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              @click="navigateToRegister()"
            >
              Sign Up Free
            </button>
          </div>
        </div>
        <button
          class="md:hidden text-gray-700"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <CpIcon
            v-if="!mobileMenuOpen"
            name="burger-arrow-right-duotone"
            iconset="stash"
            size="35"
          />
          <CpIcon
            v-else
            name="menu-to-close-transition"
            iconset="line-md"
            size="35"
          />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-white border-t border-gray-100 py-2"
      >
        <nav class="container mx-auto px-4">
          <ul class="space-y-2">
            <li>
              <nuxt-link
                to="/"
                class="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                >Home</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/assessment"
                class="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                >Assessment</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/about"
                class="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                >About</nuxt-link
              >
            </li>
            <div v-if="auth.isAuthenticated">
              <UserProfile />
            </div>
            <div v-else>
              <li>
                <nuxt-link
                  to="/auth"
                  class="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                  >Login</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/auth"
                  class="block text-center w-32 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                  >Sign Up</nuxt-link
                >
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </header>
    <slot />

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <img
                src="/public/images/logo_num.png"
                alt="logo num"
                class="h-12"
              />
              <span class="text-2xl font-bold">NUM AIK</span>
            </div>
            <p class="text-gray-400 mb-4">
              Test your knowledge, track your progress, and grow your skills
              with our comprehensive assessment platform.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition">
                <!-- <FacebookIcon class="h-6 w-6" /> -->
                facebook
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition">
                <!-- <TwitterIcon class="h-6 w-6" /> -->
                X
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition">
                <!-- <InstagramIcon class="h-6 w-6" /> -->
                Instagram
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition">
                <!-- <LinkedinIcon class="h-6 w-6" /> -->
                Linkedin
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition"
                  >Home</a
                >
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition"
                  >Categories</a
                >
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition"
                  >About Us</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Resources</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition"
                  >Blog</a
                >
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition"
                  >Help Center</a
                >
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition"
                  >Tutorials</a
                >
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition"
                  >FAQs</a
                >
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition"
                  >Contact Us</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Subscribe</h3>
            <p class="text-gray-400 mb-4">
              Stay updated with our latest assessments and features.
            </p>
            <div class="flex">
              <input
                type="email"
                placeholder="Your email"
                class="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
              />
              <button
                class="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition"
              >
                <!-- <SendIcon class="h-5 w-5" /> -->
                Send
              </button>
            </div>
          </div>
        </div>

        <div
          class="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
        >
          <div class="text-gray-400 mb-4 md:mb-0">
            <!-- &copy; {{ new Date().getFullYear() }}  -->
            KnowledgeCheck. All rights reserved.
          </div>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white transition"
              >Privacy Policy</a
            >
            <a href="#" class="text-gray-400 hover:text-white transition"
              >Terms of Service</a
            >
            <a href="#" class="text-gray-400 hover:text-white transition"
              >Cookie Policy</a
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
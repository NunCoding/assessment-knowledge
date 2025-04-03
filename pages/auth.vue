<script setup>
definePageMeta({
  layout: "top-menu",
});
const isLogin = ref(true);
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
};

// Login form
const loginForm = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

const loginErrors = reactive({
  email: "",
  password: "",
});

const isLoggingIn = ref(false);

const validateLoginForm = () => {
  let isValid = true;

  // Reset errors
  loginErrors.email = "";
  loginErrors.password = "";

  // Email validation
  if (!loginForm.email) {
    loginErrors.email = "Email is required";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(loginForm.email)) {
    loginErrors.email = "Please enter a valid email address";
    isValid = false;
  }

  // Password validation
  if (!loginForm.password) {
    loginErrors.password = "Password is required";
    isValid = false;
  }

  return isValid;
};

const handleLogin = async () => {
  if (!validateLoginForm()) return;

  isLoggingIn.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Login successful", loginForm);
    // Here you would typically:
    // 1. Call your authentication API
    // 2. Store the token/user data
    // 3. Redirect to dashboard or home page

    // For Nuxt.js, you might use:
    // await useAuth().login(loginForm)
    // navigateTo('/dashboard')
  } catch (error) {
    console.error("Login failed", error);
  } finally {
    isLoggingIn.value = false;
  }
};

// Register form
const registerForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const registerErrors = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: "",
});

const isRegistering = ref(false);

const validateRegisterForm = () => {
  let isValid = true;

  // Reset errors
  registerErrors.firstName = "";
  registerErrors.lastName = "";
  registerErrors.email = "";
  registerErrors.password = "";
  registerErrors.confirmPassword = "";
  registerErrors.acceptTerms = "";

  // First name validation
  if (!registerForm.firstName) {
    registerErrors.firstName = "First name is required";
    isValid = false;
  }

  // Last name validation
  if (!registerForm.lastName) {
    registerErrors.lastName = "Last name is required";
    isValid = false;
  }

  // Email validation
  if (!registerForm.email) {
    registerErrors.email = "Email is required";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(registerForm.email)) {
    registerErrors.email = "Please enter a valid email address";
    isValid = false;
  }

  // Password validation
  if (!registerForm.password) {
    registerErrors.password = "Password is required";
    isValid = false;
  } else if (registerForm.password.length < 8) {
    registerErrors.password = "Password must be at least 8 characters";
    isValid = false;
  }

  // Confirm password validation
  if (!registerForm.confirmPassword) {
    registerErrors.confirmPassword = "Please confirm your password";
    isValid = false;
  } else if (registerForm.password !== registerForm.confirmPassword) {
    registerErrors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  // Terms acceptance validation
  if (!registerForm.acceptTerms) {
    registerErrors.acceptTerms = "You must accept the terms and conditions";
    isValid = false;
  }

  return isValid;
};

const handleRegister = async () => {
  if (!validateRegisterForm()) return;

  isRegistering.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Registration successful", registerForm);
    // Here you would typically:
    // 1. Call your registration API
    // 2. Store the token/user data
    // 3. Redirect to dashboard or verification page

    // For Nuxt.js, you might use:
    // await useAuth().register(registerForm)
    // navigateTo('/verify-email')
  } catch (error) {
    console.error("Registration failed", error);
  } finally {
    isRegistering.value = false;
  }
};

// Password visibility toggles
const showLoginPassword = ref(false);
const showRegisterPassword = ref(false);
const showConfirmPassword = ref(false);
</script>
<template>
  <div
    class="bg-gray-50 flex flex-col justify-center p-5 sm:p-20 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ isLogin ? "Sign in to your account" : "Create your account" }}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        {{ isLogin ? "New to our platform?" : "Already have an account?" }}
        <a
          href="#"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          @click.prevent="toggleAuthMode"
        >
          {{ isLogin ? "Create an account" : "Sign in" }}
        </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Login Form -->
        <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="loginForm.email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p v-if="loginErrors.email" class="mt-1 text-sm text-red-600">
                {{ loginErrors.email }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="loginForm.password"
                :type="showLoginPassword ? 'text' : 'password'"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                @click="showLoginPassword = !showLoginPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <CpIcon
                  name="eye"
                  iconset="guidance"
                  size="20"
                  v-if="!showLoginPassword"
                  class="h-5 w-5 text-gray-400"
                />
                <CpIcon
                  name="eye-closed"
                  iconset="mage"
                  v-else
                  class="h-5 w-5 text-gray-400"
                />
              </button>
              <p v-if="loginErrors.password" class="mt-1 text-sm text-red-600">
                {{ loginErrors.password }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="loginForm.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoggingIn"
              class="w-full flex gap-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              @click="navigateTo('/admin/dashboard')"
            >
              <CpIcon
                name="loading-twotone-loop"
                iconset="line-md"
                v-if="isLoggingIn"
                class="h-4 w-4 text-white"
              />
              <span>Sign In</span>
            </button>
          </div>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister" class="space-y-6">
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label
                for="first-name"
                class="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <div class="mt-1">
                <input
                  id="first-name"
                  v-model="registerForm.firstName"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p
                  v-if="registerErrors.firstName"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ registerErrors.firstName }}
                </p>
              </div>
            </div>

            <div>
              <label
                for="last-name"
                class="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <div class="mt-1">
                <input
                  id="last-name"
                  v-model="registerForm.lastName"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p
                  v-if="registerErrors.lastName"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ registerErrors.lastName }}
                </p>
              </div>
            </div>
          </div>

          <div>
            <label
              for="register-email"
              class="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div class="mt-1">
              <input
                id="register-email"
                v-model="registerForm.email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p v-if="registerErrors.email" class="mt-1 text-sm text-red-600">
                {{ registerErrors.email }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="register-password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1 relative">
              <input
                id="register-password"
                v-model="registerForm.password"
                :type="showRegisterPassword ? 'text' : 'password'"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                @click="showRegisterPassword = !showRegisterPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <CpIcon
                  name="eye"
                  iconset="guidance"
                  v-if="!showRegisterPassword"
                  class="h-5 w-5 text-gray-400"
                />
                <CpIcon
                  name="eye-closed"
                  iconset="mage"
                  v-else
                  class="h-5 w-5 text-gray-400"
                />
              </button>
              <p
                v-if="registerErrors.password"
                class="mt-1 text-sm text-red-600"
              >
                {{ registerErrors.password }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="confirm-password"
              class="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <div class="mt-1 relative">
              <input
                id="confirm-password"
                v-model="registerForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <CpIcon
                  name="eye"
                  iconset="guidance"
                  v-if="!showConfirmPassword"
                  class="h-5 w-5 text-gray-400"
                />
                <CpIcon
                  name="eye-closed"
                  iconset="mage"
                  v-else
                  class="h-5 w-5 text-gray-400"
                />
              </button>
              <p
                v-if="registerErrors.confirmPassword"
                class="mt-1 text-sm text-red-600"
              >
                {{ registerErrors.confirmPassword }}
              </p>
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="terms"
              v-model="registerForm.acceptTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
                >Terms</a
              >
              and
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
                >Privacy Policy</a
              >
            </label>
          </div>
          <p
            v-if="registerErrors.acceptTerms"
            class="mt-1 text-sm text-red-600"
          >
            {{ registerErrors.acceptTerms }}
          </p>

          <div>
            <button
              type="submit"
              :disabled="isRegistering"
              class="w-full flex gap-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <CpIcon
                name="loading-twotone-loop"
                iconset="line-md"
                v-if="isRegistering"
                class="h-4 w-4 text-white"
              />
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
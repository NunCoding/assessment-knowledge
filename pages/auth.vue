<script setup>
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();

definePageMeta({
  layout: "top-menu",
});
const isLogin = ref(true);
const auth = useAuthStore();
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
};

// Login form
const loginForm = ref({
  email: "",
  password: "",
});

const loginErrors = ref({
  email: "",
  password: "",
});

const isLoggingIn = ref(false);

const validateLoginForm = () => {
  let isValid = true;

  // Reset errors
  loginErrors.value.email = "";
  loginErrors.value.password = "";

  // Email validation
  if (!loginForm.value.email) {
    loginErrors.value.email = "Email is required";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(loginForm.value.email)) {
    loginErrors.value.email = "Please enter a valid email address";
    isValid = false;
  }

  // Password validation
  if (!loginForm.value.password) {
    loginErrors.value.password = "Password is required";
    isValid = false;
  } else if (loginForm.value.password.length < 8) {
    loginErrors.value.password = "Password must be at least 8 characters";
    isValid = false;
  }

  return isValid;
};

const handleLogin = async () => {
  if (!validateLoginForm()) return;
  isLoggingIn.value = true;
  await auth
    .login({
      ...loginForm.value,
    })
    .then(() => {
      navigateTo("/admin/dashboard", { replace: true });
    })
    .catch((error) => {
      console.log(error);

      // const message = response._data.message;
      // triggerAlert(message, "error");
    })
    .finally(() => {
      isLoggingIn.value = false;
    });
};

// Register form
const registerForm = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  acceptTerms: false,
});

const registerErrors = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  acceptTerms: "",
});

const isRegistering = ref(false);

function resetForm() {
  registerForm.value.name = "";
  registerForm.value.email = "";
  registerForm.value.password = "";
  registerForm.value.password_confirmation = "";
}

const validateRegisterForm = () => {
  let isValid = true;

  // Reset errors
  registerErrors.value = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    acceptTerms: "",
  };

  // Name validation
  if (!registerForm.value.name) {
    registerErrors.value.name = "User name is required";
    isValid = false;
  }

  // Email validation
  if (!registerForm.value.email) {
    registerErrors.value.email = "Email is required";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(registerForm.value.email)) {
    registerErrors.value.email = "Please enter a valid email address";
    isValid = false;
  }

  // Password validation
  if (!registerForm.value.password) {
    registerErrors.value.password = "Password is required";
    isValid = false;
  } else if (registerForm.value.password.length < 8) {
    registerErrors.value.password = "Password must be at least 8 characters";
    isValid = false;
  }

  // Confirm password validation
  if (!registerForm.value.password_confirmation) {
    registerErrors.value.password_confirmation = "Please confirm your password";
    isValid = false;
  } else if (
    registerForm.value.password !== registerForm.value.password_confirmation
  ) {
    registerErrors.value.password_confirmation = "Passwords do not match";
    isValid = false;
  }

  // Terms acceptance validation
  if (!registerForm.value.acceptTerms) {
    registerErrors.value.acceptTerms =
      "You must accept the terms and conditions";
    triggerAlert("You must accept the terms and conditions", "error");
    isValid = false;
  }

  return isValid;
};

const handleRegister = async () => {
  // if (!validateRegisterForm()) return;
  isRegistering.value = true;
  useFetchApi(api.register, {
    method: "post",
    body: registerForm.value,
  })
    .then((response) => {
      const { token, user } = response;
      auth.setAuth(token, user);
      resetForm();
      navigateTo("/", { replace: true });
    })
    .catch((error) => {
      triggerAlert(`${error}`, "error");
    })
    .finally(() => {
      isRegistering.value = false;
    });
};

// clear error
const clearErrorOnType = (field) => {
  loginErrors.value[field] = "";
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
        <form v-if="isLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="loginForm.email"
                type="email"
                @keyup="clearErrorOnType('email')"
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
              :disabled="auth.isLoggingIn"
              class="w-full flex gap-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              @click="handleLogin"
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
        <form v-else class="space-y-6">
          <div class="grid grid-cols-1">
            <div>
              <label
                for="first-name"
                class="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <div class="mt-1">
                <input
                  id="first-name"
                  v-model="registerForm.name"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p v-if="registerErrors.name" class="mt-1 text-sm text-red-600">
                  {{ registerErrors.name }}
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
                v-model="registerForm.password_confirmation"
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
                v-if="registerErrors.password_confirmation"
                class="mt-1 text-sm text-red-600"
              >
                {{ registerErrors.password_confirmation }}
              </p>
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="terms"
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
              @click="handleRegister"
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
    <AlertModal
      v-if="showAlert"
      :message="alertMessage"
      :type="alertType"
      @close="showAlert = false"
    />
  </div>
</template>
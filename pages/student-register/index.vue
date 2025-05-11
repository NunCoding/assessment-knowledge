<script setup>
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();

definePageMeta({
  layout: "top-menu",
});

// emit
const route = useRoute();
const auth = useAuthStore();

// property
const isRegistering = ref(false);
const showRegisterPassword = ref(false);
const showConfirmPassword = ref(false);
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
  if (!registerForm.value.name.trim()) {
    registerErrors.value.name = "Name is required";
    isValid = false;
  } else if (registerForm.value.name.length < 3) {
    registerErrors.value.name = "Name must be at least 3 characters";
    isValid = false;
  }

  // Email validation
  if (!registerForm.value.email.trim()) {
    registerErrors.value.email = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.value.email)) {
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
  } else if (!/[A-Z]/.test(registerForm.value.password)) {
    registerErrors.value.password =
      "Password must contain at least one uppercase letter";
    isValid = false;
  } else if (!/[a-z]/.test(registerForm.value.password)) {
    registerErrors.value.password =
      "Password must contain at least one lowercase letter";
    isValid = false;
  } else if (!/[0-9]/.test(registerForm.value.password)) {
    registerErrors.value.password = "Password must contain at least one number";
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

  // Terms validation
  if (!registerForm.value.acceptTerms) {
    registerErrors.value.acceptTerms =
      "You must accept the terms and conditions";
    isValid = false;
  }

  return isValid;
};

const handleRegister = async () => {
  if (!validateRegisterForm()) return;

  isRegistering.value = true;
  useFetchApi(api.register, {
    method: "post",
    body: registerForm.value,
  })
    .then((response) => {
      const { token, user } = response;
      auth.setAuth(token, user);
      resetForm();
      navigateTo(`${route.query.redirect}`);
    })
    .catch((error) => {
      triggerAlert(`${error}`, "error");
    })
    .finally(() => {
      isRegistering.value = false;
    });
};

const resetForm = () => {
  registerForm.value = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    acceptTerms: false,
  };
};
</script>

<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-20">
    <div class="sm:mx-auto sm:w-full sm:max-w-md mb-5">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
    </div>
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" @submit.prevent="handleRegister">
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
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': registerErrors.name }"
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
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': registerErrors.email }"
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
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': registerErrors.password }"
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
            <p v-if="registerErrors.password" class="mt-1 text-sm text-red-600">
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
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{
                'border-red-500': registerErrors.password_confirmation,
              }"
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
            v-model="registerForm.acceptTerms"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            :class="{ 'border-red-500': registerErrors.acceptTerms }"
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
        <p v-if="registerErrors.acceptTerms" class="mt-1 text-sm text-red-600">
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
  <AlertModal
    v-if="showAlert"
    :message="alertMessage"
    :type="alertType"
    @close="showAlert = false"
  />
</template>
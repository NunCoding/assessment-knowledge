<script setup>
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();
definePageMeta({
  layout: "top-menu",
});

// Reactive state
const formData = ref({
  email: "",
  password: "",
  password_confirmation: "",
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);

// Computed properties
const passwordHasMinLength = computed(
  () => formData.value.password.length >= 8
);

const passwordsMatch = computed(
  () =>
    formData.value.password &&
    formData.value.password_confirmation &&
    formData.value.password === formData.value.password_confirmation
);

const isFormValid = computed(
  () =>
    formData.value.email && passwordHasMinLength.value && passwordsMatch.value
);

// function
const handleSubmit = async () => {
  if (!isFormValid.value) return;

  isLoading.value = true;

  await useFetchApi(api.resetPassword, {
    method: "post",
    body: formData.value,
  })
    .then(() => {
      triggerAlert("Password reset successfully!", "success");
      resetForm();
    })
    .catch(({ response }) => {
      triggerAlert(response._data.message, "error");
    })
    .finally(() => {
      isLoading.value = false;
    });
};

function resetForm() {
  formData.value.email = "";
  formData.value.password = "";
  formData.value.password_confirmation = "";
  showPassword.value = false;
  showConfirmPassword.value = false;
}
</script>
<template>
  <div
    class="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-5 sm:p-20 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg">
      <!-- Header -->
      <div class="p-6 pb-4 space-y-1">
        <h1 class="text-2xl font-bold text-center text-gray-900">
          Reset Password
        </h1>
        <p class="text-center text-gray-600">
          Enter your email and create a new password
        </p>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="handleSubmit" class="p-6 pt-0 space-y-4">
        <!-- Email Field -->
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium text-gray-700"
            >Email Address</label
          >
          <div class="relative">
            <CpIcon
              name="mail-24-regular"
              iconset="fluent"
              class="absolute left-3 top-3 h-4 w-4 text-gray-400"
            />
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Enter your email address"
              autocomplete="username"
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <!-- Password Field -->
        <div class="space-y-2">
          <label for="password" class="text-sm font-medium text-gray-700"
            >New Password</label
          >
          <div class="relative">
            <CpIcon
              name="lock-key-light"
              iconset="ph"
              class="absolute left-3 top-3 h-4 w-4 text-gray-400"
            />
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter new password"
              autocomplete="new-password"
              class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <CpIcon
                v-if="showPassword"
                name="eyeclosed"
                iconset="formkit"
                class="h-4 w-4"
              />
              <CpIcon
                v-else
                name="eye-24"
                iconset="qlementine-icons"
                class="h-4 w-4"
              />
            </button>
          </div>
          <div
            v-if="formData.password"
            class="flex items-center space-x-2 text-sm"
          >
            <div
              :class="[
                'h-2 w-2 rounded-full',
                passwordHasMinLength ? 'bg-green-500' : 'bg-red-500',
              ]"
            />
            <span
              :class="passwordHasMinLength ? 'text-green-600' : 'text-red-600'"
              >At least 8 characters</span
            >
          </div>
        </div>

        <!-- Confirm Password Field -->
        <div class="space-y-2">
          <label for="confirmPassword" class="text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <div class="relative">
            <CpIcon
              name="lock-key-light"
              iconset="ph"
              class="absolute left-3 top-3 h-4 w-4 text-gray-400"
            />
            <input
              id="confirmPassword"
              v-model="formData.password_confirmation"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm your password"
              autocomplete="new-password"
              class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <CpIcon
                v-if="showConfirmPassword"
                name="eyeclosed"
                iconset="formkit"
                class="h-4 w-4"
              />
              <CpIcon
                v-else
                name="eye-24"
                iconset="qlementine-icons"
                class="h-4 w-4"
              />
            </button>
          </div>
          <div
            v-if="formData.password_confirmation"
            class="flex items-center space-x-2 text-sm"
          >
            <CpIcon
              v-if="passwordsMatch"
              name="check"
              iconset="mynaui"
              class="h-4 w-4 text-green-500"
            />
            <div v-else class="h-2 w-2 rounded-full bg-red-500" />
            <span :class="passwordsMatch ? 'text-green-600' : 'text-red-600'">
              {{
                passwordsMatch ? "Passwords match" : "Passwords do not match"
              }}
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-4 space-y-4">
          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            :class="[
              'w-full py-3 px-4 rounded-md font-medium text-white transition duration-200',
              isFormValid && !isLoading
                ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                : 'bg-gray-400 cursor-not-allowed',
            ]"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Resetting Password...
            </span>
            <span v-else>Reset Password</span>
          </button>

          <div class="text-center">
            <button
              type="button"
              @click="navigateTo('/auth')"
              class="text-sm text-gray-600 hover:text-gray-800 focus:outline-none focus:underline"
            >
              Back to Login
            </button>
          </div>
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
<style scoped>
/* Custom styles for better visual feedback */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Focus styles for better accessibility */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
<script setup>
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  dataSource: {
    type: [Array, Object, String],
    default: () => {
      return {};
    },
  },
});

// emit
const emit = defineEmits(["update:modelValue", "submit"]);
const { t } = useI18n();

// property
const isLoading = ref(false);
const user = localStorage.getItem("user");
const userData = JSON.parse(user);

// property
const form = ref({
  sender_id: null,
  receiver_id: null,
  message: "",
  link: "",
});

// Form validation errors
const errors = ref({
  message: "",
});

// function
function closeModal() {
  emit("update:modelValue", false);
}

function validateForm() {
  let hasError = false;

  if (!form.value.message || form.value.message.trim() === "") {
    errors.value.message = t("error.required");
    hasError = true;
  }

  // Validate link if provided (must be a valid URL)
  if (form.value.link) {
    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(form.value.link)) {
      errors.value.link = t("error.invalidateUrl");
      hasError = true;
    }
  }

  return hasError;
}

function handleSubmit() {
  if (validateForm()) return;

  let formData = {
    sender_id: userData.id,
    receiver_id: props.dataSource.id,
    message: form.value.message,
    link: form.value.link,
  };

  isLoading.value = true;
  useFetchApi(api.sendMessage, {
    method: "POST",
    query: { ...formData },
  })
    .then(() => {
      closeModal();
      triggerAlert(t("message.sendMessage"), "success");
    })
    .catch((error) => {
      // Handle error
      triggerAlert(t("error.title"), "error");
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>
<template>
  <CpModal
    :model-value="modelValue"
    :title="t('student.messageTo') + ' ' + dataSource?.name"
    :action-title="t('action.send')"
    action-icon="send-outline"
    action-icon-set="lsicon"
    @close="closeModal"
    @submit="handleSubmit"
  >
    <template #body>
      <div>
        <!-- Message input -->
        <div class="mb-4">
          <label
            for="message"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            {{ t("student.message") }}
          </label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500"
            placeholder="Type your message here..."
            required
          ></textarea>
          <p v-if="errors.message" class="mt-1 text-sm text-red-600">
            {{ errors.message }}
          </p>
        </div>

        <!-- Link input -->
        <div class="mb-4">
          <label
            for="link"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            {{ t("student.resourceLink") + ` (${t("student.optional")})` }}
          </label>
          <div
            class="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500"
          >
            <span class="pl-3 text-gray-500 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-link"
              >
                <path
                  d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                />
                <path
                  d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                />
              </svg>
            </span>
            <input
              id="link"
              v-model="form.link"
              type="url"
              class="w-full px-3 py-2 bg-transparent border-0 focus:outline-none focus:ring-0"
              placeholder="https://example.com/resource"
            />
          </div>
          <p v-if="errors.link" class="mt-1 text-sm text-red-600">
            {{ errors.link }}
          </p>
        </div>
      </div>
    </template>
  </CpModal>

  <!-- modal -->
  <AlertModal
    v-if="showAlert"
    :message="alertMessage"
    :type="alertType"
    @close="showAlert = false"
  />
</template>
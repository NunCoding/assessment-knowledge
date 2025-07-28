<script setup>
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();
const props = defineProps({
  modelValue: { type: Boolean, default: false },
});

// emit
const emit = defineEmits(["update:modelValue", "submit"]);
const { t } = useI18n();

// validate
const formData = ref({
  name: "",
  email: "",
  role: "student",
});

const errors = ref({
  name: "",
  email: "",
});

// close modal
function closeModal() {
  emit("update:modelValue", false);
}

function resetForm() {
  formData.value = {
    name: "",
    email: "",
    role: "student",
  };
  errors.value = {
    name: "",
    email: "",
  };
}

// validate form
function validateForm() {
  let valid = true;
  errors.value = { name: "", email: "" };

  if (!formData.value.name) {
    errors.value.name = "Name is required.";
    valid = false;
  }
  if (!formData.value.email) {
    errors.value.email = "Email is required.";
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = "Email format is invalid.";
    valid = false;
  }

  return valid;
}

function saveUser() {
  if (!validateForm()) return;
  useFetchApi(api.createUser, {
    method: "post",
    body: { ...formData.value },
  })
    .then(() => {
      resetForm();
      closeModal();
      triggerAlert(t("message.createUser"), "success");
      emit("submit");
    })
    .catch(() => {
      triggerAlert("Something went wrong!.", "error");
    });
}
</script>
<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    v-if="props.modelValue"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">{{ t("user.create") }}</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <CpIcon name="close-duotone" iconset="iconamoon" />
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{
            t("user.name")
          }}</label>
          <input
            v-model="formData.name"
            type="text"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter user name"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">
            {{ errors.name }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{
            t("user.email")
          }}</label>
          <input
            v-model="formData.email"
            type="email"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter email address"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{
            t("user.role")
          }}</label>
          <select
            v-model="formData.role"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <!-- <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Status</label
          >
          <select
            v-model="formData.status"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div> -->
      </div>

      <div class="mt-8 flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          {{ t("action.cancel") }}
        </button>
        <button
          @click="saveUser"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          {{ t("action.create") }}
        </button>
      </div>
    </div>
  </div>

  <AlertModal
    v-if="showAlert"
    :message="alertMessage"
    :type="alertType"
    @close="showAlert = false"
  />
</template>
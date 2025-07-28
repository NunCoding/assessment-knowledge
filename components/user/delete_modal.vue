<script setup>
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  userId: { type: [String, Number], default: "" },
});

// emit
const emit = defineEmits(["update:modelValue", "submit"]);
const { t } = useI18n();

// function
// close modal
function closeModal() {
  emit("update:modelValue", false);
}

async function handleDeleteUser() {
  let id = props.userId;
  // console.log(props.dataSource);

  useFetchApi(api.deleteUser, {
    method: "delete",
    params: { id },
  })
    .then(() => {
      closeModal();
      emit("submit");
      triggerAlert(t("user.deleteSuccess"), "success");
    })
    .catch(({ response }) => {
      const message = response?._data?.message;
      triggerAlert(message, "error");
    });
}
</script>
<template>
  <div
    v-if="props.modelValue"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">{{ t("user.delete") }}</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <CpIcon name="close-duotone" iconset="iconamoon" />
        </button>
      </div>
      <div class="space-y-4">{{ t("user.deleteConfirmation") }}</div>
      <div class="mt-8 flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          {{ t("action.cancel") }}
        </button>
        <button
          @click="handleDeleteUser"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          {{ t("action.delete") }}
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
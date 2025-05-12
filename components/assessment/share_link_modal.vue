<script setup>
const { copied, copy } = useClipboard();
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();

// props
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  dataSource: {
    type: [Array, Object, String],
    default: () => {
      return "";
    },
  },
});

// emit
const emit = defineEmits(["update:modelValue", "submit"]);
const { t } = useI18n();

// function
function closeModal() {
  emit("update:modelValue", false);
}

function handleCopy(link) {
  copy(link);
  if (copied) {
    triggerAlert("copied successful!", "success");
  }
}
</script>
<template>
  <CpModal
    :model-value="modelValue"
    :title="t('assessment.shareLink')"
    @close="closeModal"
  >
    <template #body>
      <div class="px-3">
        <p class="text-gray-500 text-md">{{ t("assessment.link") }}</p>
      </div>
      <div class="flex flex-nowrap gap-2 mt-1 p-3">
        <input
          type="text"
          :value="dataSource"
          class="w-full border border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <button
          class="border border-gray-200 px-4 py-2 rounded-md"
          @click="handleCopy(dataSource)"
        >
          <CpIcon class="text-green-600" name="check" v-if="copied" size="25" />
          <CpIcon
            class="text-blue-600"
            name="copy-line"
            iconset="si"
            size="25"
            v-else
          />
        </button>
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
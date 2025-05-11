<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "" },
  showAction: { type: Boolean, default: false },
});

// emit
const emit = defineEmits(["update:modelValue", "submit", "close"]);

// function
function closeModal() {
  emit("close");
}
</script>
<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    v-if="modelValue"
  >
    <div class="bg-white rounded-lg shadow-lg p-4 px-6 max-w-md w-full">
      <div class="flex justify-between items-center">
        <h3 class="text-xl whitespace-nowrap font-medium">{{ props.title }}</h3>
        <span
          @click="closeModal"
          class="px-3 py-1.5 flex justify-center items-center bg-gray-100 rounded-full cursor-pointer"
        >
          <CpIcon
            name="close"
            iconset="simple-line-icons"
            class="mt-1 text-red-600"
          />
        </span>
      </div>
      <div class="mt-5 mb-3">
        <slot name="body" />
      </div>
      <div class="flex justify-end gap-3 mt-5">
        <button
          class="bg-blue-600 rounded-lg px-5 py-2 text-white"
          v-if="showAction"
        >
          Save
        </button>
        <button
          @click="closeModal"
          class="rounded-lg px-5 py-2 text-gray-800 ring-1 ring-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
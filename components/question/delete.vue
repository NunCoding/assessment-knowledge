<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  dataSource: {
    type: [Array, Object],
    default: () => {
      return {};
    },
  },
});

// emit
const emit = defineEmits(["update:modelValue", "submit"]);

// function
// close modal
function closeModal() {
  emit("update:modelValue", false);
}
</script>
<template>
  <div
    v-if="props.modelValue"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Confirm Delete</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <CpIcon name="close-duotone" iconset="iconamoon" />
        </button>
      </div>
      <div class="space-y-4">Are you sure confirm delete this question</div>
      <div class="mt-8 flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          @click="saveUser"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
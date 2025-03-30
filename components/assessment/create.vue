<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
});
// define emit
const emit = defineEmits(["update:modelValue", "submit"]);
const formData = ref({
  name: "",
  description: "",
  category: "Programming",
  status: "Draft",
  questions: 10,
  timeEstimate: 15,
});
// function
function closeModal() {
  emit("update:modelValue", false);
}
function saveAssessment() {
  emit("save", formData.value);
}
</script>
<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    v-if="props.modelValue"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Create New Assessment</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <CpIcon name="close-duotone" iconset="iconamoon" />
        </button>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Assessment Name</label
          >
          <input
            v-model="formData.name"
            type="text"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter assessment name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label
          >
          <textarea
            v-model="formData.description"
            rows="3"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter assessment description"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Category</label
            >
            <select
              v-model="formData.category"
              class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Programming</option>
              <option>Data Science</option>
              <option>Cloud</option>
              <option>Design</option>
              <option>Security</option>
              <option>AI & ML</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Time Estimate (minutes)</label
            >
            <input
              v-model="formData.timeEstimate"
              type="number"
              min="1"
              class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          @click="saveAssessment"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Create Assessment
        </button>
      </div>
    </div>
  </div>
</template>
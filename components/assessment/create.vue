<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
});

// Define emit
const emit = defineEmits(["update:modelValue", "submit"]);

const formData = ref({
  title: "",
  description: "",
  category_id: null,
  rating: 0,
  difficulty: "Intermediate",
  time_estimate: 15,
  image: null,
  tags: [],
});

// Close modal
function closeModal() {
  emit("update:modelValue", false);
}

// Submit form
function saveAssessment() {
  console.log(formData.value);
  emit("submit", formData.value);
}

// Handle adding tags
const newTag = ref("");

function addTag() {
  if (newTag.value.trim() && !formData.value.tags.includes(newTag.value)) {
    formData.value.tags.push(newTag.value.trim());
    newTag.value = "";
  }
}

// Remove tag
function removeTag(index) {
  formData.value.tags.splice(index, 1);
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
          ✕
        </button>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Title</label
          >
          <input
            v-model="formData.title"
            type="text"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter title"
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
            placeholder="Enter description"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Category</label
            >
            <select
              v-model="formData.category_id"
              class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option :value="1">Programming</option>
              <option :value="2">Data Science</option>
              <option :value="3">Cloud</option>
              <option :value="4">Design</option>
              <option :value="5">Security</option>
              <option :value="6">AI & ML</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Time Estimate (minutes)</label
            >
            <input
              v-model="formData.time_estimate"
              type="number"
              min="1"
              class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <!-- Tags Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Tags</label
          >
          <div class="flex gap-2">
            <input
              v-model="newTag"
              @keyup.enter="addTag"
              type="text"
              class="flex-1 rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a tag and press Enter"
            />
            <button
              @click="addTag"
              class="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="(tag, index) in formData.tags"
              :key="index"
              class="px-2 py-1 bg-gray-200 text-sm rounded-md flex items-center gap-1"
            >
              {{ tag }}
              <button
                @click="removeTag(index)"
                class="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </span>
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

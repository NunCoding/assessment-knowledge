<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
});

// emit
const emit = defineEmits(["update:modelValue"]);

// state
const rating = ref(0);
const hoveredRating = ref(0);

// form data
const formData = ref({
  share: "",
  rating: "",
  comment: "",
  is_contact_back: false,
});

// data
const recommendationOptions = [
  { value: "very-likely", label: "Very Likely" },
  { value: "likely", label: "Likely" },
  { value: "neutral", label: "Neutral" },
  { value: "unlikely", label: "Unlikely" },
  { value: "very-unlikely", label: "Very Unlikely" },
];

// function
function closeModal() {
  emit("update:modelValue", false);
}
</script>
<template>
  <CpModal
    :model-value="modelValue"
    @close="closeModal"
    :class-width="'max-w-2xl'"
  >
    <template #body>
      <div class="p-6 max-w-2xl mx-auto">
        <form class="space-y-6">
          <!-- Overall Rating -->
          <div class="space-y-3">
            <label class="block text-base font-medium text-gray-900"
              >Overall Experience</label
            >
            <div class="flex items-center space-x-1">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                class="p-1 hover:scale-110 transition-transform"
                @mouseenter="hoveredRating = star"
                @mouseleave="hoveredRating = 0"
                @click="rating = star"
              >
                <svg
                  class="w-8 h-8 transition-colors"
                  :class="
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  "
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
              </button>
              <span v-if="rating > 0" class="ml-3 text-sm text-gray-600">
                {{ rating }} of 5 stars
                <span v-if="rating === 5"> - Excellent!</span>
                <span v-else-if="rating === 4"> - Very Good</span>
                <span v-else-if="rating === 3"> - Good</span>
                <span v-else-if="rating === 2"> - Fair</span>
                <span v-else-if="rating === 1"> - Poor</span>
              </span>
            </div>
          </div>

          <!-- Recommendation -->
          <div class="space-y-3">
            <label class="block text-base font-medium text-gray-900">
              How likely are you to recommend us to others?
            </label>
            <div class="flex flex-wrap gap-4">
              <label
                v-for="option in recommendationOptions"
                :key="option.value"
                class="flex items-center space-x-2"
              >
                <input
                  v-model="formData.share"
                  :value="option.value"
                  type="radio"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700">{{ option.label }}</span>
              </label>
            </div>
          </div>

          <!-- Detailed Feedback -->
          <div class="space-y-3">
            <label
              for="feedback"
              class="block text-base font-medium text-gray-900"
            >
              Tell us more about your experience
            </label>
            <textarea
              id="feedback"
              v-model="formData.comment"
              rows="5"
              placeholder="What did you like? What could we improve? Any specific suggestions?"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
          </div>

          <!-- Follow-up Permission -->
          <div class="flex items-center space-x-2">
            <input
              id="follow-up"
              v-model="formData.is_contact_back"
              type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label for="follow-up" class="text-sm text-gray-600">
              I'm okay with being contacted about this feedback
            </label>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                v-if="!isSubmitting"
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
              <svg
                v-else
                class="w-4 h-4 mr-2 animate-spin"
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
              {{ isSubmitting ? "Sending..." : "Send Feedback" }}
            </button>
          </div>
        </form>
      </div>
    </template>
  </CpModal>
</template>
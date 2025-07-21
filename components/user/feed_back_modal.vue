<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
});

// emit
const emit = defineEmits(["update:modelValue"]);

// state
const rating = ref(0);
const hoveredRating = ref(0);
const isSubmitting = ref(false);
const isShowThankYou = ref(false);

// form data
const formData = ref({
  share: null,
  rating: null,
  comment: null,
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

async function handleSubmit() {
  isSubmitting.value = true;
  await useFetchApi(api.feedback, {
    method: "POST",
    body: {
      ...formData.value,
      rating: rating.value,
    },
  })
    .then(() => {
      isShowThankYou.value = true;
      // closeModal();
      resetForm();
    })
    .catch((error) => {
      console.error("Error submitting feedback:", error);
    })
    .finally(() => {
      isSubmitting.value = false;
    });
}

function resetForm() {
  rating.value = 0;
  hoveredRating.value = 0;
  formData.value = {
    share: null,
    rating: null,
    comment: null,
    is_contact_back: false,
  };
}
</script>
<template>
  <CpModal
    :model-value="modelValue"
    :class-width="'max-w-2xl'"
    :is-show-cancel="false"
    @close="closeModal"
  >
    <template #body>
      <div class="px-5 max-w-2xl mx-auto" v-if="!isShowThankYou">
        <!-- Header -->
        <div class="text-center mb-6">
          <div
            class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto"
          >
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">
            We'd love your feedback
          </h2>
          <p class="text-gray-600 mt-2">
            Help us improve by sharing your thoughts and suggestions
          </p>
        </div>

        <div class="space-y-6">
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
              @click="handleSubmit"
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
              Send Feedback
            </button>
          </div>
        </div>
      </div>
      <div class="w-full max-w-2xl mx-auto" v-else>
        <div>
          <div class="text-center space-y-4">
            <div
              class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
            >
              <CpIcon
                name="hand-thumbsup"
                iconset="f7"
                class="text-green-600"
                size="24"
              />
            </div>
            <h3 class="text-xl font-semibold text-green-800">
              Thank you for your feedback!
            </h3>
            <p className="text-muted-foreground">
              We appreciate you taking the time to help us improve our service.
            </p>
          </div>
        </div>
      </div>
    </template>
  </CpModal>
</template>
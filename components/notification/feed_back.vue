<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "We'd love your feedback!" },
  message: {
    type: String,
    default: "Help us improve by sharing your experience",
  },
  autoHide: { type: Boolean, default: true },
  hideDelay: { type: Number, default: 10000 },
});

// emit
const emit = defineEmits(["update:modelValue", "action"]);

// properties
const isGiveFeedbackModal = ref(false);

onMounted(() => {
  if (props.autoHide) {
    setTimeout(() => {
      handleClose();
    }, props.hideDelay);
  }
});

// function
const handleClose = () => {
  emit("update:modelValue", false);
};
</script>
<template>
  <transition name="fade-slide" @after-leave="handleClose">
    <div
      v-if="modelValue"
      class="fixed bottom-9 left-5 right-5 md:right-auto md:w-80 z-50 bg-white"
    >
      <div
        class="shadow-lg border-l-4 border-l-blue-600 animate-in slide-in-from-bottom-4 duration-500"
      >
        <div class="p-4">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-3 flex-1">
              <div
                class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              >
                <CpIcon
                  name="message"
                  iconset="tabler"
                  class="text-blue-600 mt-1"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-semibold text-gray-900 mb-1">
                  {{ title }}
                </h4>
                <p class="text-sm text-gray-600 mb-3">{{ message }}</p>
                <div class="flex items-center space-x-2">
                  <button
                    @click="isGiveFeedbackModal = true"
                    size="sm"
                    class="flex gap-1 justify-center items-center px-3 rounded-md py-2 text-white bg-blue-600 hover:bg-blue-700 text-xs"
                  >
                    <CpIcon
                      name="star-outline"
                      iconset="material-symbols-light"
                    />
                    Give Feedback
                  </button>
                  <button
                    @click="handleClose"
                    variant="ghost"
                    size="sm"
                    class="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
            <button
              @click="handleClose"
              variant="ghost"
              size="sm"
              class="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <CpIcon name="round-close" iconset="ic" class="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <!-- Give Feedback Modal -->
  <UserFeedBackModal v-model="isGiveFeedbackModal" />
</template>
<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
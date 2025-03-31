<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "info",
    validator: (value) =>
      ["info", "success", "warning", "error"].includes(value),
  },
  timeout: {
    type: Number,
    default: 3000,
  },
  position: {
    type: String,
    default: "top",
    validator: (value) =>
      [
        "top",
        "bottom",
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
      ].includes(value),
  },
});

const emit = defineEmits(["close"]);

// Auto-close after timeout
onMounted(() => {
  setTimeout(() => {
    emit("close");
  }, props.timeout);
});

// Dynamic classes based on alert type
const alertClasses = computed(() => {
  return {
    info: "bg-blue-100 text-blue-800 border-blue-300",
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
  }[props.type];
});

// Position classes
const positionClasses = computed(() => {
  return {
    top: "top-4 left-1/2 -translate-x-1/2",
    bottom: "bottom-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  }[props.position];
});
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-200 ease-in"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      class="fixed flex items-start p-4 pointer-events-none z-50"
      :class="positionClasses"
    >
      <div
        class="p-4 rounded-lg shadow-lg pointer-events-auto border"
        :class="alertClasses"
      >
        <div class="flex items-center">
          <span class="mr-2">
            <span v-if="type === 'info'">ℹ️</span>
            <span v-else-if="type === 'success'">✅</span>
            <span v-else-if="type === 'warning'">⚠️</span>
            <span v-else-if="type === 'error'">❌</span>
          </span>
          <span>{{ message }}</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Custom transition for different positions */
.bottom .enter-from-class,
.bottom .leave-to-class {
  transform: translate(-50%, 20px);
}
</style>
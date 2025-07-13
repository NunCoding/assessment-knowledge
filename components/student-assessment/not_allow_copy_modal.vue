<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "" },
  actionTitle: { type: String, default: "" },
  actionIcon: { type: String, default: "" },
  actionIconSet: { type: String, default: "" },
});

// emit
const emit = defineEmits(["update:modelValue"]);

// function
function closeModal() {
  emit("update:modelValue", false);
}
</script>
<template>
  <CpModal :modelValue="modelValue" @close="closeModal">
    <template #body>
      <div>
        <!-- Watermark Overlay -->
        <div class="absolute inset-0 pointer-events-none z-10 opacity-10">
          <div
            class="absolute top-1/4 left-1/4 transform -rotate-45 text-6xl font-bold text-gray-500 select-none"
          >
            CONFIDENTIAL
          </div>
          <div
            class="absolute top-3/4 right-1/4 transform -rotate-45 text-6xl font-bold text-gray-500 select-none"
          >
            DO NOT COPY
          </div>
        </div>

        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100"
        >
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-gray-800 ml-4 select-none">
              Protected Content
            </h2>
          </div>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-200"
          >
            <CpIcon name="close" iconset="line-md" class="w-6 h-6" />
          </button>
        </div>

        <!-- Security Notice -->
        <div
          class="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4 rounded-r-lg"
        >
          <div class="flex items-center">
            <CpIcon
              name="shield-alert-outline"
              iconset="mdi"
              class="w-5 h-5 text-red-500 mr-2"
            />
            <p class="text-sm text-red-700 font-medium select-none">
              This content is protected. Copying, printing, or sharing is
              prohibited.
            </p>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-6 max-h-96 overflow-y-auto no-scrollbar">
          <!-- Content Section 1 -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800 select-none">
              This is our policy
            </h3>
            <div
              class="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300"
            >
              <p
                class="text-gray-700 leading-relaxed select-none"
                style="
                  user-select: none;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                "
              >
                Copying is disabled during the assessment to ensure fairness and
                to help accurately evaluate your own knowledge and skills.
                Please do your best without referring to outside resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CpModal>
</template>
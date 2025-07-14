<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "" },
  actionTitle: { type: String, default: "" },
  actionIcon: { type: String, default: "" },
  actionIconSet: { type: String, default: "" },
  classWidth: { type: String, default: "max-w-md" },
  isShowCancel: { type: Boolean, default: true },
});

// emit
const emit = defineEmits(["update:modelValue", "submit", "close"]);
const { t } = useI18n();

// function
function closeModal() {
  emit("close");
}

function handleSubmit() {
  emit("submit");
}
</script>
<template>
  <div>
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-0"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-0"
    >
      <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        v-if="modelValue"
      >
        <div
          class="bg-white mx-auto rounded-lg shadow-lg p-4 px-6 w-full"
          :class="classWidth"
        >
          <div class="flex justify-between items-center">
            <h3 class="text-xl whitespace-nowrap font-semibold text-gray-700">
              {{ props.title }}
            </h3>
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
              @click="handleSubmit"
              class="bg-blue-600 flex justify-center items-center rounded-lg px-5 py-2 text-white"
              v-if="actionTitle"
            >
              <CpIcon
                :name="props.actionIcon"
                :iconset="props.actionIconSet"
                class="mr-2 text-white"
                size="25"
              />
              {{ props.actionTitle ?? t("action.save") }}
            </button>
            <button
              v-if="isShowCancel"
              @click="closeModal"
              class="rounded-lg px-5 py-2 text-gray-800 ring-1 ring-gray-200"
            >
              {{ t("action.cancel") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup>
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  assessmentId: { type: [String, Number], default: false },
});

const emit = defineEmits(["update:modelValue", "submitted"]);
const { t } = useI18n();

// Property
const listAssessments = ref([]);
const isLoading = ref(false);

const formData = ref({
  title: null,
  assessment_id: null,
  options: ["", "", "", ""],
  correctAnswer: null,
  explanation: null,
});

const errors = ref({
  title: "",
  assessment_id: "",
  options: "",
  correctAnswer: "",
});

// watch
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      fetchAssessments();
      formData.value.assessment_id = props.assessmentId;
    }
  }
);

// Methods
function closeModal() {
  emit("update:modelValue", false);
  resetForm();
  resetError();
}

function addOption() {
  formData.value.options.push("");
}

// fetch list assessments from API
function fetchAssessments() {
  useFetchApi(api.listAssessment, {
    method: "get",
  })
    .then((pass) => {
      listAssessments.value = pass;
    })
    .catch(({ response }) => {
      const message = response._data.message;
      triggerAlert(message, "error");
    });
}

function removeOption(index) {
  formData.value.options.splice(index, 1);

  // Adjust correctAnswer if needed
  if (formData.value.correctAnswer === index) {
    formData.value.correctAnswer = 0;
  } else if (formData.value.correctAnswer > index) {
    formData.value.correctAnswer--;
  }
}

function resetError() {
  errors.value = {
    title: "",
    assessment_id: "",
    options: "",
    correctAnswer: "",
  };
}

function validateForm() {
  // Clear previous errors
  errors.value = {
    title: "",
    assessment_id: "",
    options: "",
    correctAnswer: "",
  };

  let isValid = true;

  if (!formData.value.title || formData.value.title.trim() === "") {
    errors.value.title = "Question text is required.";
    isValid = false;
  }

  if (!formData.value.assessment_id) {
    errors.value.assessment_id = "Please select an assessment.";
    isValid = false;
  }

  const filledOptions = formData.value.options.filter(
    (opt) => opt.trim() !== ""
  );
  if (filledOptions.length < 2) {
    errors.value.options = "At least 2 answer options are required.";
    isValid = false;
  }

  const correctIndex = formData.value.correctAnswer;
  if (
    correctIndex === null ||
    correctIndex < 0 ||
    correctIndex >= formData.value.options.length ||
    formData.value.options[correctIndex].trim() === ""
  ) {
    errors.value.correctAnswer = "Please select a valid correct answer.";
    isValid = false;
  }

  return isValid;
}

function handleSubmit() {
  if (!validateForm()) return;
  isLoading.value = true;
  useFetchApi(api.createQuestion, {
    method: "post",
    body: { ...formData.value },
  })
    .then(() => {
      closeModal();
      emit("submitted");
      triggerAlert(t("message.createQuestion"), "success");
    })
    .catch((error) => {
      if (error) {
        triggerAlert(error, "error");
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function resetForm() {
  formData.value.title = null;
  formData.value.assessment_id = null;
  formData.value.options = ["", "", "", ""];
  formData.value.correctAnswer = null;
  formData.value.explanation = null;
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5"
    v-if="props.modelValue"
  >
    <div class="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">
          {{ t("question.create") }}
        </h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <CpIcon name="close-duotone" iconset="iconamoon" />
        </button>
      </div>
      <div class="max-h-[70vh] overflow-y-auto">
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Question Text</label
            >
            <textarea
              v-model="formData.title"
              rows="3"
              class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your question here..."
            ></textarea>
            <p v-if="errors.title" class="text-red-500 text-sm mt-1">
              {{ errors.title }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Assessment</label
              >
              <select
                v-model="formData.assessment_id"
                class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option
                  v-for="assessment in listAssessments"
                  :key="assessment.id"
                  :value="assessment.id"
                >
                  {{ assessment.title }} ({{ assessment.difficulty }})
                </option>
              </select>
              <p v-if="errors.assessment_id" class="text-red-500 text-sm mt-1">
                {{ errors.assessment_id }}
              </p>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700"
                >Answer Options</label
              >
              <button
                v-if="formData.options.length < 6"
                @click="addOption"
                class="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Add Option
              </button>
            </div>

            <div class="space-y-3">
              <div
                v-for="(option, index) in formData.options"
                :key="index"
                class="flex items-center"
              >
                <input
                  type="radio"
                  :name="'correct-answer'"
                  :id="'option-' + index"
                  :value="index"
                  v-model="formData.correctAnswer"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label
                  :for="'option-' + index"
                  class="ml-2 block text-sm text-gray-700 w-full"
                >
                  <div class="flex items-center">
                    <input
                      v-model="formData.options[index]"
                      type="text"
                      class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      :placeholder="'Option ' + (index + 1)"
                    />
                    <button
                      v-if="formData.options.length > 2"
                      @click="removeOption(index)"
                      class="ml-2 text-red-500 hover:text-red-700"
                    >
                      <CpIcon name="close-duotone" iconset="iconamoon" />
                    </button>
                  </div>
                </label>
              </div>
              <p v-if="errors.options" class="text-red-500 text-sm mt-1">
                {{ errors.options }}
              </p>
              <p v-if="errors.correctAnswer" class="text-red-500 text-sm mt-1">
                {{ errors.correctAnswer }}
              </p>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              Select the radio button next to the correct answer.
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Explanation</label
            >
            <textarea
              v-model="formData.explanation"
              rows="3"
              class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Explain why the correct answer is right..."
            ></textarea>
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
          v-if="!isLoading"
          @click="handleSubmit"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          {{ t("question.create") }}
        </button>
      </div>
    </div>
  </div>
  <AlertModal
    v-if="showAlert"
    :message="alertMessage"
    :type="alertType"
    @close="showAlert = false"
  />
</template>

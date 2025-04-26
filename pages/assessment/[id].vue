<script setup>
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();
definePageMeta({
  layout: "top-menu",
});

// emit
const route = useRoute();
const auth = useAuthStore();

// State
const currentQuestionIndex = ref(0);
const userAnswers = ref([]);
const assessmentTask = ref({});
const isSubmitted = ref(false);
const isLoading = ref(false);
const confirmExit = ref(false);
const showResults = ref(false);
const timer = ref(0);
const timerInterval = ref(null);

// Computed properties
const currentQuestion = computed(() => {
  const questions = assessmentTask.value?.questions;
  if (Array.isArray(questions) && questions.length > 0) {
    return (
      questions[currentQuestionIndex.value] || { question: "", options: [] }
    );
  }
  return { question: "", options: [] };
});

const isLastQuestion = computed(() => {
  return (
    currentQuestionIndex.value === assessmentTask.value.questions?.length - 1
  );
});

const isCorrect = computed(() => {
  if (
    isSubmitted.value &&
    userAnswers.value[currentQuestionIndex.value] !== undefined
  ) {
    return (
      userAnswers.value[currentQuestionIndex.value] ===
      currentQuestion.value.correctAnswer
    );
  }
  return false;
});

const score = computed(() => {
  const totalQuestions = assessmentTask.value.questions.length;
  const correctAnswers = userAnswers.value.reduce((total, answer, index) => {
    if (
      assessmentTask.value.questions[index] &&
      answer === assessmentTask.value.questions[index].correctAnswer
    ) {
      return total + 1;
    }
    return total;
  }, 0);

  if (totalQuestions === 0) return 0;

  return Math.round((correctAnswers / totalQuestions) * 100);
});

const scorePercentage = computed(() => {
  return Math.min(100, Math.max(0, score.value));
});

// onMounted
onMounted(async () => {
  await assessmentTaskTake();
});

// functions
async function assessmentTaskTake() {
  let id = route.params.id;
  isLoading.value = true;
  await useFetchApi(api.taskAssessment, {
    method: "get",
    params: { id },
  })
    .then((data) => {
      assessmentTask.value = data;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function selectOption(index) {
  if (!isSubmitted.value) {
    userAnswers.value[currentQuestionIndex.value] = index;
  }
}

function submitAnswer() {
  if (userAnswers.value[currentQuestionIndex.value] !== undefined) {
    isSubmitted.value = true;
  }
}

function nextQuestion() {
  if (isLastQuestion.value) {
    finishAssessment();
  } else {
    currentQuestionIndex.value++;
    isSubmitted.value = false;
  }
}

function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    isSubmitted.value =
      userAnswers.value[currentQuestionIndex.value] !== undefined;
  }
}

function jumpToQuestion(index) {
  if (index !== currentQuestionIndex.value) {
    currentQuestionIndex.value = index;
    isSubmitted.value =
      userAnswers.value[currentQuestionIndex.value] !== undefined;
  }
}

function getQuestionButtonClass(index) {
  if (index === currentQuestionIndex.value) {
    return "bg-indigo-500 text-white";
  }

  if (userAnswers.value[index] === undefined) {
    return "bg-gray-200 text-gray-700 hover:bg-gray-300";
  }

  if (
    userAnswers.value[index] ===
    assessmentTask.value.questions[index].correctAnswer
  ) {
    return "bg-green-500 text-white";
  }

  return "bg-red-500 text-white";
}

function isQuestionCorrect(index) {
  return (
    userAnswers.value[index] ===
    assessmentTask.value.questions[index].correctAnswer
  );
}

function exitAssessment() {
  // In a real app, you would navigate to the home page
  // For this example, we'll just reset the state
  confirmExit.value = false;
  goToHome();
}

function finishAssessment() {
  clearInterval(timerInterval.value);
  showResults.value = true;
}

function reviewAssessment() {
  showResults.value = false;
}

function handleSubmitResult() {
  let formData = {
    user_id: auth.user.id,
    assessment_id: useGet(route, "params.id"),
    score: score.value,
    completion_time: timer.value,
  };

  isLoading.value = true;
  useFetchApi(api.submitAssessment, {
    method: "post",
    body: { ...formData },
  })
    .then(() => {
      triggerAlert(
        "The result assessment has been submitted successfully",
        "success"
      );
    })
    .catch((error) => {
      triggerAlert("Something went wrong!.", "error");
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function goToHome() {
  userAnswers.value = [];
  currentQuestionIndex.value = 0;
  isSubmitted.value = false;
  showResults.value = false;
  confirmExit.value = false;
  clearInterval(timerInterval.value);
  navigateTo("/");
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

function startTimer() {
  timerInterval.value = setInterval(() => {
    timer.value++;
  }, 1000);
}

// Lifecycle hooks
onMounted(() => {
  startTimer();

  // Handle page refresh or navigation away
  // window.addEventListener("beforeunload", (e) => {
  //   if (!showResults.value) {
  //     e.preventDefault();
  //     e.returnValue = "";
  //   }
  // });
});

// onBeforeUnmount(() => {
//   clearInterval(timerInterval.value);
//   window.removeEventListener("beforeunload", () => {});
// });
</script>
<template>
  <div class="min-h-screen bg-gray-50 mt-10">
    <!-- Assessment Header -->
    <header
      class="bg-white shadow sticky container mx-auto px-4 py-8"
      v-if="!showResults"
    >
      <div class="container mx-auto px-4 py-4">
        <div
          class="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
        >
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ assessmentTask.title }}
            </h1>
            <p class="text-gray-600">{{ assessmentTask.category }}</p>
          </div>

          <div class="flex items-center gap-6">
            <!-- Timer -->
            <div class="flex items-center gap-2 text-gray-700">
              <CpIcon name="clock" iconset="lucide" />
              <span>{{ formatTime(timer) }}</span>
            </div>

            <!-- Progress -->
            <div class="flex items-center gap-2">
              <span class="text-indigo-600 font-medium">
                {{ currentQuestionIndex + 1 }} /
                {{ assessmentTask.questions?.length }}
              </span>
            </div>

            <!-- Exit Button -->
            <button
              @click="confirmExit = true"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            >
              Exit
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            class="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            :style="`width: ${
              ((currentQuestionIndex + 1) / assessmentTask.questions?.length) *
              100
            }%`"
          ></div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8" v-if="!showResults">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Question Panel -->
        <div class="lg:w-3/4">
          <div class="bg-white rounded-lg shadow-md p-6 md:p-8">
            <!-- Question -->
            <div class="mb-8">
              <h2 class="text-xl md:text-2xl font-medium text-gray-800 mb-6">
                {{ currentQuestion.question }}
              </h2>

              <!-- Options -->
              <div class="space-y-4">
                <div
                  v-for="(option, index) in currentQuestion.options"
                  :key="index"
                  class="border rounded-lg p-4 cursor-pointer transition"
                  :class="[
                    userAnswers[currentQuestionIndex] === index
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300',
                    {
                      'opacity-75':
                        isSubmitted &&
                        userAnswers[currentQuestionIndex] !== index,
                    },
                  ]"
                  @click="selectOption(index)"
                >
                  <div class="flex items-center">
                    <div
                      class="w-6 h-6 rounded-full border flex items-center justify-center mr-3"
                      :class="
                        userAnswers[currentQuestionIndex] === index
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-gray-300'
                      "
                    >
                      <CpIcon
                        name="check"
                        iconset="iconoir"
                        v-if="userAnswers[currentQuestionIndex] === index"
                        class="mt-1"
                        size="23"
                      />
                    </div>
                    <span>{{ option }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Feedback (if submitted) -->
            <div
              v-if="isSubmitted"
              class="mb-8 p-4 rounded-lg"
              :class="isCorrect ? 'bg-green-50' : 'bg-red-50'"
            >
              <div class="flex items-start">
                <div class="mr-3">
                  <CpIcon
                    name="check-circle-linear"
                    iconset="solar"
                    v-if="isCorrect"
                    class="text-green-500"
                    size="25"
                  />
                  <CpIcon
                    name="close-circle-outline"
                    iconset="solar"
                    v-else
                    class="text-red-500"
                    size="25"
                  />
                </div>
                <div>
                  <p
                    class="font-medium"
                    :class="isCorrect ? 'text-green-700' : 'text-red-700'"
                  >
                    {{ isCorrect ? "Correct!" : "Incorrect" }}
                  </p>
                  <p v-if="!isCorrect" class="text-gray-700 mt-1">
                    The correct answer is:
                    <span class="font-medium">{{
                      currentQuestion.options[currentQuestion.correctAnswer]
                    }}</span>
                  </p>
                  <p class="text-gray-700 mt-2">
                    {{
                      currentQuestion.explanation || "No explanation provided."
                    }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between">
              <button
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                :disabled="currentQuestionIndex === 0"
                @click="previousQuestion"
              >
                <div class="flex items-center gap-1">
                  <CpIcon name="chevron-left" iconset="mage" class="h-5 w-5" />
                  <span>Previous</span>
                </div>
              </button>

              <div>
                <button
                  v-if="!isSubmitted"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                  :disabled="userAnswers[currentQuestionIndex] === undefined"
                  @click="submitAnswer"
                >
                  Submit Answer
                </button>

                <button
                  v-else
                  class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                  @click="nextQuestion"
                >
                  <div class="flex items-center gap-1">
                    <span>{{
                      isLastQuestion ? "Finish Assessment" : "Next Question"
                    }}</span>
                    <CpIcon
                      name="chevron-right"
                      iconset="mi"
                      v-if="!isLastQuestion"
                      class="h-5 w-5"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Question Navigation (Mobile) -->
          <div class="lg:hidden mt-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-medium text-gray-800 mb-4">
                Question Navigation
              </h3>
              <div class="grid grid-cols-5 sm:grid-cols-8 gap-2">
                <button
                  v-for="(_, index) in assessmentTask.questions"
                  :key="index"
                  class="w-10 h-10 rounded-md flex items-center justify-center font-medium transition"
                  :class="getQuestionButtonClass(index)"
                  @click="jumpToQuestion(index)"
                >
                  {{ index + 1 }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="hidden lg:block lg:w-1/4">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-28">
            <h3 class="text-lg font-medium text-gray-800 mb-4">
              Question Navigation
            </h3>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="(_, index) in assessmentTask.questions"
                :key="index"
                class="w-10 h-10 rounded-md flex items-center justify-center font-medium transition"
                :class="getQuestionButtonClass(index)"
                @click="jumpToQuestion(index)"
              >
                {{ index + 1 }}
              </button>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-4 h-4 rounded-full bg-green-500"></div>
                <span class="text-sm text-gray-600">Correct</span>
              </div>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-4 h-4 rounded-full bg-red-500"></div>
                <span class="text-sm text-gray-600">Incorrect</span>
              </div>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-4 h-4 rounded-full bg-indigo-500"></div>
                <span class="text-sm text-gray-600">Current</span>
              </div>
              <div class="flex items-center gap-3">
                <div
                  class="w-4 h-4 rounded-full bg-gray-200 border border-gray-300"
                ></div>
                <span class="text-sm text-gray-600">Unanswered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Exit Confirmation Modal -->
    <div
      v-if="confirmExit"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Exit Assessment?</h3>
        <p class="text-gray-600 mb-6">
          Your progress will be lost if you exit now. Are you sure you want to
          continue?
        </p>
        <div class="flex justify-end gap-4">
          <button
            @click="confirmExit = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            @click="exitAssessment"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Exit Assessment
          </button>
        </div>
      </div>
    </div>

    <!-- Results Modal -->
    <div v-if="showResults" class="flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <div class="text-center mb-8">
          <div class="inline-block p-4 rounded-full bg-indigo-100 mb-4">
            <CpIcon
              name="award"
              iconset="lucide"
              class="h-16 w-16 text-indigo-600"
              size="50"
            />
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Assessment Complete!
          </h2>
          <p class="text-xl text-gray-600">
            You scored {{ score }} out of {{ assessmentTask.questions?.length }}
          </p>
        </div>

        <div class="mb-8">
          <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              class="h-4 rounded-full transition-all duration-500"
              :class="
                scorePercentage > 70
                  ? 'bg-green-500'
                  : scorePercentage > 40
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              "
              :style="`width: ${scorePercentage}%`"
            ></div>
          </div>
          <div class="text-right text-gray-600">{{ scorePercentage }}%</div>
        </div>

        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Time Taken</h3>
          <p class="text-lg text-gray-700">{{ formatTime(timer) }}</p>
        </div>

        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Question Summary</h3>
          <div class="space-y-4">
            <div
              v-for="(question, index) in assessmentTask.questions"
              :key="index"
              class="border rounded-lg p-4"
              :class="
                isQuestionCorrect(index)
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              "
            >
              <div class="flex items-start">
                <div class="mt-1 mr-3">
                  <CpIcon
                    name="check-circle-outline"
                    iconset="solar"
                    v-if="isQuestionCorrect(index)"
                    class="h-5 w-5 text-green-500"
                  />
                  <CpIcon
                    name="close-circle-outline"
                    iconset="solar"
                    v-else
                    class="h-5 w-5 text-red-500"
                  />
                </div>
                <div>
                  <p class="font-medium text-gray-900 mb-2">
                    {{ question.question }}
                  </p>
                  <p class="text-sm text-gray-600 mb-1">
                    Your answer:
                    <span
                      :class="
                        isQuestionCorrect(index)
                          ? 'text-green-600 font-medium'
                          : 'text-red-600 font-medium'
                      "
                    >
                      {{ question.options[userAnswers[index]] }}
                    </span>
                  </p>
                  <p
                    v-if="!isQuestionCorrect(index)"
                    class="text-sm text-gray-600"
                  >
                    Correct answer:
                    <span class="text-green-600 font-medium">
                      {{ question.options[question.correctAnswer] }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-between gap-4">
          <button
            @click="goToHome"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            Back to Home
          </button>
          <div class="flex gap-4">
            <button
              @click="reviewAssessment"
              class="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
            >
              Review Answers
            </button>
            <button
              @click="handleSubmitResult"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Submit Results
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- alert modal -->
  <AlertModal
    v-if="showAlert"
    :message="alertMessage"
    :type="alertType"
    @close="showAlert = false"
  />
</template>
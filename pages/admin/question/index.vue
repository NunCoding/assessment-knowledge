<script setup>
definePageMeta({
  layout: "dashboard-sidemenu",
  middleware: ["auth"],
});

// Composables
const { t } = useI18n();

// UI States
const isCreateQuestionModal = ref(false);
const isUpdateQuestionModal = ref(false);
const isDeleteQuestionModal = ref(false);
const isLoading = ref(false);

// Data
const listQuestion = ref([]);
const listAssessment = ref([]);
const selectedQuestion = ref({});
const selectDeleteQuestion = ref({});

// Pagination
const pagination = ref({});
const totalPage = ref({});

// Filters
const filterQuestion = reactive({
  id: null,
  difficulty: null,
  title: null,
});

// Lifecycle
onMounted(async () => {
  await fetchListAssessment();
  await fetchQuestion();
});

// Fetch Question
async function fetchQuestion(url = api.listQuestion) {
  isLoading.value = true;
  try {
    const response = await useFetchApi(url, {
      method: "get",
      params: {
        assessment_id: filterQuestion.id,
        difficulty: filterQuestion.difficulty,
        title: filterQuestion.title,
      },
    });

    listQuestion.value = response.data;
    totalPage.value = response.meta;
    pagination.value = {
      next_page_url: response.links?.next,
      prev_page_url: response.links?.prev,
    };
  } catch (error) {
    triggerAlert("Something went wrong!", "error");
  } finally {
    isLoading.value = false;
  }
}

// Fetch Assessments
async function fetchListAssessment() {
  isLoading.value = true;
  try {
    const response = await useFetchApi(api.listAssessment, { method: "get" });
    listAssessment.value = response;
  } catch (error) {
    triggerAlert("Something went wrong!", "error");
  } finally {
    isLoading.value = false;
  }
}

// Handlers
function handleFilter() {
  fetchQuestion();
}

function handleEdit(id) {
  const found = listQuestion.value.find((item) => item.id === id);
  selectedQuestion.value = found;
  isUpdateQuestionModal.value = true;
}

function handleDelete(id) {
  const found = listQuestion.value.find((item) => item.id === id);
  selectDeleteQuestion.value = found;
  isDeleteQuestionModal.value = true;
}
</script>
<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-medium text-gray-900">
        {{ t("question.title") }}
      </h3>
      <button
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
        @click="isCreateQuestionModal = true"
      >
        <CpIcon name="plus" iconset="uil" class="h-5 w-5 mr-1" />
        {{ t("question.create") }}
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div
        class="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"
      >
        <div class="flex flex-wrap gap-4">
          <!-- Title filter -->
          <div class="flex flex-col">
            <label for="text">{{ t("question.name") }}</label>
            <div class="relative">
              <input
                v-model="filterQuestion.title"
                @input="handleFilter"
                type="text"
                placeholder="Search questions..."
                class="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <CpIcon
                name="search-outline"
                iconset="ion"
                class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              />
            </div>
          </div>

          <!-- Assessment filter -->
          <div class="flex flex-col">
            <label>{{ t("assessment.title") }}</label>
            <select
              v-model="filterQuestion.id"
              @change="handleFilter"
              class="rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All</option>
              <option
                v-for="item in listAssessment"
                :key="item.id"
                :value="item.id"
              >
                {{ item.title }}
              </option>
            </select>
          </div>

          <!-- Difficulty filter -->
          <div class="flex flex-col">
            <label>{{ t("question.difficulty") }}</label>
            <select
              v-model="filterQuestion.difficulty"
              @change="handleFilter"
              class="rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Question
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Difficulty
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(question, index) in listQuestion" :key="index">
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ question.title }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ question.category }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ question.difficulty }}
              </td>
              <td class="px-6 py-4 text-sm">
                <div class="flex space-x-2">
                  <button
                    class="text-indigo-600 hover:text-indigo-900"
                    @click="handleEdit(question.id)"
                  >
                    <CpIcon name="edit" iconset="lucide" class="h-5 w-5" />
                  </button>
                  <button
                    class="text-red-600 hover:text-red-900"
                    @click="handleDelete(question.id)"
                  >
                    <CpIcon
                      name="delete-outline-rounded"
                      iconset="material-symbols"
                      class="h-5 w-5"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
      >
        <div class="text-sm text-gray-700">
          Showing <span class="font-medium">{{ totalPage.from }}</span> to
          <span class="font-medium">{{ totalPage.to }}</span> of
          <span class="font-medium">{{ totalPage.total }}</span> questions
        </div>
        <div class="flex space-x-2">
          <button
            :disabled="!pagination.prev_page_url"
            @click="fetchQuestion(pagination.prev_page_url)"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm"
            :class="
              !pagination.prev_page_url
                ? 'bg-gray-100 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50'
            "
          >
            Previous
          </button>
          <button
            :disabled="!pagination.next_page_url"
            @click="fetchQuestion(pagination.next_page_url)"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm"
            :class="
              !pagination.next_page_url
                ? 'bg-gray-100 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50'
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <QuestionCreate v-model="isCreateQuestionModal" @submitted="fetchQuestion" />
  <QuestionUpdate
    v-model="isUpdateQuestionModal"
    :data-source="selectedQuestion"
    @submitted="fetchQuestion"
  />
  <QuestionDelete
    v-model="isDeleteQuestionModal"
    :data-source="selectDeleteQuestion"
    @submit="fetchQuestion"
  />
</template>
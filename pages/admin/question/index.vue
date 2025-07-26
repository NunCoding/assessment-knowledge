<script setup>
definePageMeta({
  layout: "dashboard-sidemenu",
  middleware: ["auth"],
});

// emit
const { t } = useI18n();

// property
const isCreateQuestionModal = ref(false);
const isUpdateQuestionModal = ref(false);
const isDeleteQuestionModal = ref(false);
const isLoading = ref(false);
const listQuestion = ref([]);
const listAssessment = ref([]);
const pagination = ref({});
const totalPage = ref({});
const selectedQuestion = ref({});
const selectDeleteQuestion = ref({});

// filter
const filterQuestion = {
  title: null,
  name: null,
  difficulty: null,
};

// onMounted
onMounted(async () => {
  await fetchQuestion();
  await fetchListAssessment();
});

// function
async function fetchQuestion(url = api.listQuestion) {
  isLoading.value = true;
  await useFetchApi(url, {
    method: "get",
  })
    .then((pass) => {
      listQuestion.value = pass.data;
      totalPage.value = pass.meta;
      pagination.value = {
        next_page_url: pass.links?.next,
        prev_page_url: pass.links?.prev,
      };
    })
    .catch((error) => {
      triggerAlert("Something went wrong!.", "error");
    })
    .finally(() => {
      isLoading.value = false;
    });
}

async function fetchListAssessment() {
  isLoading.value = true;
  await useFetchApi(api.listAssessment, {
    method: "get",
  })
    .then((pass) => {
      listAssessment.value = pass;
    })
    .catch((error) => {
      triggerAlert("Something went wrong!.", "error");
    })
    .finally(() => {
      isLoading.value = false;
    });
}

// handle filter
async function handleFilter() {
  console.log(filterQuestion.value);
}

// handle edit question
async function handleEdit(id) {
  const findQuestion = useFind(listQuestion.value, (item) => item.id === id);
  selectedQuestion.value = findQuestion;
  isUpdateQuestionModal.value = true;
}

function handleDelete(id) {
  const findQuestion = useFind(listQuestion.value, (item) => item.id === id);
  selectDeleteQuestion.value = findQuestion;
  isDeleteQuestionModal.value = true;
}
</script>
<template>
  <!-- Questions Management -->
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-medium text-gray-900">
        {{ t("question.title") }}
      </h3>
      <!-- <button
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
        @click="isCreateQuestionModal = true"
      >
        <CpIcon name="plus" iconset="uil" class="h-5 w-5 mr-1" />
        {{ t("question.create") }}
      </button> -->
    </div>

    <div class="bg-white rounded-lg shadow mb-6">
      <div
        class="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"
      >
        <div class="flex space-x-4">
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
          <div class="flex flex-col">
            <label for="text">{{ t("assessment.title") }}</label>
            <select
              @change="handleFilter"
              class="rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              v-model="filterQuestion.name"
            >
              <option
                v-for="item in listAssessment"
                :key="item.id"
                :value="item.id"
              >
                {{ item.title }}
              </option>
            </select>
          </div>
          <div class="flex flex-col">
            <label for="text">{{ t("question.difficulty") }}</label>
            <select
              v-model="filterQuestion.difficulty"
              class="rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Select difficulty..."
              @change="handleFilter"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Question
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Difficulty
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(question, id) in listQuestion" :key="id">
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-md truncate">
                  {{ question.title }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ question.category }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span>
                  {{ question.difficulty }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
            class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            :class="[
              !pagination.prev_page_url
                ? 'bg-gray-100 cursor-not-allowed'
                : 'bg-white cursor-pointer',
            ]"
            @click="fetchQuestion(pagination.prev_page_url)"
          >
            Previous
          </button>
          <button
            :disabled="!pagination.next_page_url"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            :class="[
              !pagination.next_page_url
                ? 'bg-gray-100 cursor-not-allowed'
                : 'bg-white cursor-pointer',
            ]"
            @click="fetchQuestion(pagination.next_page_url)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- modal -->
  <!-- create  -->
  <QuestionCreate v-model="isCreateQuestionModal" @submitted="fetchQuestion" />

  <!-- update -->
  <QuestionUpdate
    v-model="isUpdateQuestionModal"
    :data-source="selectedQuestion"
    @submitted="fetchQuestion"
  />

  <!-- delete -->
  <QuestionDelete
    v-model="isDeleteQuestionModal"
    :data-source="selectDeleteQuestion"
    @submitted="fetchQuestion"
  />
</template>
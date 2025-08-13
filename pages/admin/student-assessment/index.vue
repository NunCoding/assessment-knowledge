<script setup>
definePageMeta({
  layout: "dashboard-sidemenu",
  middleware: "auth",
});

const { t } = useI18n();

// State management
const state = reactive({
  students: [],
  selectedStudent: null,
  isSendMessageModal: false,
  isLoading: false,
  searchQuery: "",
  pagination: {},
  totalPage: {},
});

// Computed properties
const filteredStudents = computed(() => {
  if (!state.searchQuery) return state.students;

  const query = state.searchQuery.toLowerCase();
  return state.students.filter(
    (student) =>
      (student.name || "").toLowerCase().includes(query) ||
      (student.email || "").toLowerCase().includes(query)
  );
});

// Lifecycle hooks
onMounted(async () => {
  await fetchStudents();
});

// Functions
async function fetchStudents(url = api.studentResult) {
  state.isLoading = true;
  try {
    const response = await useFetchApi(url, {
      method: "get",
    });
    state.students = response.data || response;
    state.totalPage = response.meta || {};
    state.pagination = {
      next_page_url: response.links?.next_page_url
        ? response.links.next.replace("http://", "https://")
        : null,
      prev_page_url: response.links?.prev_page_url
        ? response.links.prev.replace("http://", "https://")
        : null,
    };
  } catch (error) {
    console.error("Error fetching students:", error);
    // Consider adding user feedback here
  } finally {
    state.isLoading = false;
  }
}

const scoreStatus = {
  excellent: {
    min: 95,
    class: "bg-green-100 text-green-800",
    text: "Excellent",
  },
  good: { min: 80, class: "bg-emerald-100 text-emerald-800", text: "Good" },
  needsImprovement: {
    min: 70,
    class: "bg-yellow-100 text-yellow-800",
    text: "Needs Improvement",
  },
  atRisk: { min: 60, class: "bg-orange-100 text-orange-800", text: "At Risk" },
  risk: { min: 50, class: "bg-red-100 text-red-800", text: "Risk" },
  failing: { min: 0, class: "bg-red-100 text-red-800", text: "Failing" },
};

function getStatusClasses(score) {
  const baseClasses =
    "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full";
  const status = Object.values(scoreStatus).find((s) => score >= s.min);
  return `${baseClasses} ${status.class}`;
}

function getStatusText(score) {
  const status = Object.values(scoreStatus).find((s) => score >= s.min);
  return status.text;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

function formatDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">
      {{ t("sidebar.userAssessment") }}
    </h1>

    <!-- Search Bar -->
    <div class="relative mb-6 flex justify-start">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none w-96"
      >
        <CpIcon name="search" iconset="pajamas" class="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        v-model="state.searchQuery"
        placeholder="Search students..."
        class="pl-10 rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <!-- Loading state -->
    <div v-if="state.isLoading" class="flex justify-center items-center py-8">
      <CpIcon name="spinner" class="animate-spin h-8 w-8 text-indigo-600" />
    </div>

    <!-- Student Table -->
    <div
      v-else
      class="overflow-hidden rounded-lg border border-gray-200 shadow"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Student
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Grade
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                Score
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                Time Completed
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                Last Assessment
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="student in filteredStudents"
              :key="student.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-10 w-10 bg-gray-50 flex justify-center items-center rounded-full"
                  >
                    <CpIcon name="user" class="rounded-full text-gray-600" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ student.name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ student.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ student.grade }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <div class="text-sm text-gray-900">{{ student.score }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-600">
                  {{ formatTime(student.time_completed) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <div class="text-sm text-gray-900">
                  {{ formatDate(student.submit_at) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClasses(student.score)">
                  {{ getStatusText(student.score) }}
                </span>
              </td>
            </tr>

            <tr v-if="filteredStudents.length === 0">
              <td
                colspan="6"
                class="px-6 py-10 text-center text-sm text-gray-500"
              >
                No students found matching your search.
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div
          v-if="state.totalPage.total > 0"
          class="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
        >
          <div class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ state.totalPage.from }}</span> to
            <span class="font-medium">{{ state.totalPage.to }}</span> of
            <span class="font-medium">{{ state.totalPage.total }}</span>
            students
          </div>
          <div class="flex space-x-2">
            <button
              :disabled="!state.pagination.prev_page_url"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              :class="[
                !state.pagination.prev_page_url
                  ? 'bg-gray-100 cursor-not-allowed'
                  : 'bg-white cursor-pointer',
              ]"
              @click="fetchStudents(state.pagination.prev_page_url)"
            >
              Previous
            </button>
            <button
              :disabled="!state.pagination.next_page_url"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              :class="[
                !state.pagination.next_page_url
                  ? 'bg-gray-100 cursor-not-allowed'
                  : 'bg-white cursor-pointer',
              ]"
              @click="fetchStudents(state.pagination.next_page_url)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Send Message Modal -->
  <StudentAssessmentMessageModal
    v-model="state.isSendMessageModal"
    :data-source="state.selectedStudent"
  />
</template>
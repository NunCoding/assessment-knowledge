<script setup>
definePageMeta({
  layout: "dashboard-sidemenu",
  middleware: "auth",
});

// emit
const { t } = useI18n();

// properties
const listStudents = ref([]);
const user = localStorage.getItem("user");
// Message dialog state
const selectedStudent = ref(null);
const isSendMessageModal = ref(false);
const isLoading = ref(false);
const userData = JSON.parse(user);
const searchQuery = ref("");

// onMounted
onMounted(async () => {
  await fetchStudents();
});

// computed properties
const filteredStudents = computed(() => {
  if (!searchQuery.value) return listStudents.value;

  const query = searchQuery.value.toLowerCase();
  return listStudents.value.filter(
    (student) =>
      (student.name || "").toLowerCase().includes(query) ||
      (student.email || "").toLowerCase().includes(query)
  );
});

// functions
async function fetchStudents() {
  let id = useGet(userData, "id");
  isLoading.value = true;
  await useFetchApi(api.studentResult, {
    method: "get",
    params: { id },
  })
    .then((pass) => {
      listStudents.value = pass;
    })
    .catch((error) => {
      console.error("Error fetching students:", error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function getStatusClasses(score) {
  const baseClasses =
    "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full";

  if (score >= 95) {
    return `${baseClasses} bg-green-100 text-green-800`;
  } else if (score >= 80) {
    return `${baseClasses} bg-emerald-100 text-emerald-800`;
  } else if (score >= 70) {
    return `${baseClasses} bg-yellow-100 text-yellow-800`;
  } else if (score >= 60) {
    return `${baseClasses} bg-orange-100 text-orange-800`;
  } else {
    return `${baseClasses} bg-red-100 text-red-800`;
  }
}

function getStatusText(score) {
  if (score >= 95) {
    return "Excellent";
  } else if (score >= 80) {
    return "Good";
  } else if (score >= 70) {
    return "Needs Improvement";
  } else if (score >= 60) {
    return "At Risk";
  } else if (score >= 50) {
    return "Risk";
  } else {
    return "Failing";
  }
}

// Open message dialog
// const openMessageDialog = (student) => {
//   selectedStudent.value = student;
//   isSendMessageModal.value = true;
// };

function formateTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} m ${remainingSeconds} s`;
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
        v-model="searchQuery"
        placeholder="Search students..."
        class="pl-10 rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <!-- Student Table -->
    <div class="overflow-hidden rounded-lg border border-gray-200 shadow">
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
                  {{ formateTime(student.time_completed) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <div class="text-sm text-gray-900">
                  {{ formateDate(student.submit_at) }}
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
      </div>
    </div>
  </div>

  <!-- Send Message Modal -->
  <StudentAssessmentMessageModal
    v-model="isSendMessageModal"
    :data-source="selectedStudent"
  />
</template>
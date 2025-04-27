<script setup>
definePageMeta({
  layout: "dashboard-sidemenu",
  middleware: ["auth"],
});

// emit
const { t } = useI18n();

// property
const dataStats = ref({});
const listPopularAssessments = ref([]);
const recentActivity = ref([]);

// const recentActivity = [
//   {
//     title: "New user registered",
//     time: "5 minutes ago",
//   },
//   {
//     title: "John Doe completed Web Development Fundamentals",
//     time: "1 hour ago",
//   },
//   {
//     title: "New question added to Data Science Essentials",
//     time: "2 hours ago",
//   },
//   {
//     title: "New assessment created: Machine Learning Basics",
//     time: "3 hours ago",
//   },
// ];

// onMounted
onMounted(async () => {
  await fetchDashboardData();
  await fetchPopularAssessment();
});

// function
async function fetchDashboardData() {
  useFetchApi(api.dashboardStats, {
    method: "get",
  })
    .then((pass) => {
      dataStats.value = pass;
    })
    .catch(() => {})
    .finally(() => {});
}

async function fetchPopularAssessment() {
  useFetchApi(api.dashboardPopularAssessment, {
    method: "get",
  })
    .then((pass) => {
      listPopularAssessments.value = pass;
    })
    .catch(() => {})
    .finally(() => {});
}
</script>
<template>
  <!-- Dashboard Overview -->
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardStats
        :label="t('dashboard.totalUsers')"
        icon="user"
        class="text-blue-600"
        :value="useGet(dataStats.total_users, 'value')"
        :trend="useGet(dataStats.total_users, 'trend')"
      />
      <DashboardStats
        :label="t('dashboard.assessmentTaken')"
        icon="task-2-line"
        iconset="mingcute"
        class="text-teal-600"
        :value="useGet(dataStats.assessments_taken, 'value')"
        :trend="useGet(dataStats.assessments_taken, 'trend')"
      />
      <DashboardStats
        :label="t('dashboard.questionCreated')"
        icon="questionnaire-mirrored"
        iconset="fluent-mdl2"
        class="text-indigo-600"
        :value="useGet(dataStats.questions_created, 'value')"
        :trend="useGet(dataStats.questions_created, 'trend')"
      />
      <DashboardStats
        :label="t('dashboard.avgCompletionTime')"
        icon="clock"
        iconset="meteor-icons"
        class="text-green-600"
        :value="useGet(dataStats.avg_completion_time, 'value')"
        :trend="useGet(dataStats.avg_completion_time, 'trend')"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            {{ t("dashboard.recentActivity") }}
          </h3>
        </div>
        <div class="p-6">
          <div class="space-y-6">
            <div
              v-for="(activity, index) in recentActivity"
              :key="index"
              class="flex"
            >
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-10 w-10 rounded-md bg-indigo-100 text-indigo-600"
                >
                  <!-- <component :is="activity.icon" class="h-5 w-5" /> -->
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900">
                  {{ activity.title }}
                </p>
                <p class="text-sm text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Chart -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            {{ t("dashboard.assessmentCompletion") }}
          </h3>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center">
            <div class="text-center text-gray-500">
              <!-- <BarChartIcon class="h-16 w-16 mx-auto text-gray-300" /> -->
              <p class="mt-2">Chart visualization would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div
        class="p-6 border-b border-gray-200 flex justify-between items-center"
      >
        <h3 class="text-lg font-medium text-gray-900">
          {{ t("dashboard.popularAssessment") }}
        </h3>
        <button
          @click="$router.push('/admin/assessment')"
          class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View all
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assessment
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
                Completions
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Avg. Score
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(assessment, id) in listPopularAssessments" :key="id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-10 w-10 rounded bg-indigo-100 flex items-center justify-center"
                  >
                    <img :src="assessment.image" alt="" class="h-5 w-5" />
                    <!-- <component
                      :is="assessment.icon"
                      class="h-5 w-5 text-indigo-600"
                    /> -->
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ assessment.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ assessment.questions }} questions
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ assessment.category }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ assessment.completions }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ assessment.avg_score }}%
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
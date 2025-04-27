<script setup>
definePageMeta({
  layout: "dashboard-sidemenu",
  middleware: ["auth"],
});

// emit
const { t } = useI18n();

// property
const dataStats = ref({});

// Mock data
const stats = [
  {
    name: "Total Users",
    value: "2,543",
    color: "indigo",
    icon: "user",
    trend: 12,
  },
  {
    name: "Assessments Taken",
    value: "8,234",
    color: "green",
    icon: "check-one",
    iconset: "icon-park-outline",
    trend: 8,
  },
  {
    name: "Questions Created",
    value: "1,432",
    color: "blue",
    icon: "task-01",
    iconset: "hugeicons",
    trend: 24,
  },
  {
    name: "Avg. Completion Time",
    value: "18:42",
    color: "yellow",
    icon: "clock",
    iconset: "meteor-icons",
    trend: -5,
  },
];

const recentActivity = [
  {
    title: "New user registered",
    time: "5 minutes ago",
  },
  {
    title: "John Doe completed Web Development Fundamentals",
    time: "1 hour ago",
  },
  {
    title: "New question added to Data Science Essentials",
    time: "2 hours ago",
  },
  {
    title: "New assessment created: Machine Learning Basics",
    time: "3 hours ago",
  },
];

const popularAssessments = [
  {
    name: "Web Development Fundamentals",
    category: "Programming",
    completions: 1245,
    avgScore: 78,
    status: "Active",
    questions: 10,
  },
  {
    name: "Data Science Essentials",
    category: "Data Science",
    completions: 876,
    avgScore: 72,
    status: "Active",
    questions: 12,
  },
  {
    name: "Cloud Computing Basics",
    category: "Cloud",
    completions: 543,
    avgScore: 81,
    status: "Active",
    questions: 8,
  },
  {
    name: "UI/UX Design Principles",
    category: "Design",
    completions: 321,
    avgScore: 75,
    status: "Draft",
    questions: 15,
  },
  {
    name: "Cybersecurity Fundamentals",
    category: "Security",
    completions: 210,
    avgScore: 68,
    status: "Active",
    questions: 10,
  },
];

// onMounted
onMounted(async () => {
  await fetchDashboardData();
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
        icon="media-media-complete"
        iconset="nrk"
        class="text-green-600"
        :value="useGet(dataStats.avg_completion_time, 'value')"
        :trend="useGet(dataStats.avg_completion_time, 'trend')"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
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
          <div class="mt-6">
            <a
              href="#"
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all activity
            </a>
          </div>
        </div>
      </div>

      <!-- Performance Chart -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            Assessment Completion
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
        <h3 class="text-lg font-medium text-gray-900">Popular Assessments</h3>
        <button
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
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(assessment, index) in popularAssessments" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-10 w-10 rounded bg-indigo-100 flex items-center justify-center"
                  >
                    <component
                      :is="assessment.icon"
                      class="h-5 w-5 text-indigo-600"
                    />
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
                  {{ assessment.avgScore }}%
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
                    assessment.status === 'Active'
                      ? 'green'
                      : assessment.status === 'Draft'
                      ? 'yellow'
                      : 'gray'
                  }-100 text-${
                    assessment.status === 'Active'
                      ? 'green'
                      : assessment.status === 'Draft'
                      ? 'yellow'
                      : 'gray'
                  }-800`"
                >
                  {{ assessment.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
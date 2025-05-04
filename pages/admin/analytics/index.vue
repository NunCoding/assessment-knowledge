<script setup>
definePageMeta({
  layout: "dashboard-sidemenu",
});

// emit
const { t } = useI18n();

// property
const isLoading = ref(false);
const dataChartAssessmentCompletion = ref({});
const dataUserRegister = ref({});
const listUserPerformance = ref([]);

// onMounted
onMounted(async () => {
  await fetchCompletionAssessment();
  await fetchUserRegister();
  await fetchUserPerformance();
});

// function
async function fetchCompletionAssessment() {
  isLoading.value = true;
  await useFetchApi(api.assessmentCompletionRate, {
    method: "get",
  })
    .then((pass) => {
      dataChartAssessmentCompletion.value = pass;
    })
    .catch(() => {})
    .finally(() => {
      isLoading.value = false;
    });
}

async function fetchUserRegister() {
  isLoading.value = true;
  await useFetchApi(api.userRegister, {
    method: "get",
  })
    .then((pass) => {
      dataUserRegister.value = pass;
    })
    .catch(() => {})
    .finally(() => {
      isLoading.value = false;
    });
}

async function fetchUserPerformance() {
  isLoading.value = true;
  await useFetchApi(api.userPerformance, {
    method: "get",
  })
    .then((pass) => {
      listUserPerformance.value = pass.data;
    })
    .catch(() => {})
    .finally(() => {
      isLoading.value = false;
    });
}
</script>
<template>
  <!-- Analytics -->
  <div class="p-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            {{ t("dashboard.userRegister") }}
          </h3>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center">
            <div class="text-center text-gray-500">
              <DashboardUserChart
                :data-source="dataUserRegister"
                :loading="isLoading"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            {{ t("dashboard.averageScoresByCategory") }}
          </h3>
        </div>
        <div class="p-6">
          <div class="h-72 flex items-center justify-center">
            <div class="text-center text-gray-500">
              <DashboardCategoryChart
                :data-source="dataChartAssessmentCompletion"
                :loading="isLoading"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">
          {{ t("dashboard.userPerformance") }}
        </h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assessments Taken
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
                Completion Rate
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Active
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(user, index) in listUserPerformance" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img
                      class="h-10 w-10 rounded-full"
                      src="https://toppng.com/uploads/preview/avatar-png-115540218987bthtxfhls.png"
                      alt=""
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ user.assessment_taken }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.avg_score }}%</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ user.completion_rate }}%
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.last_active }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
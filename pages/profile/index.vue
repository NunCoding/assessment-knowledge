<script setup>
definePageMeta({
  layout: "top-menu",
});

useHead({
  title: "Profile",
});

// emit
const route = useRoute();
const router = useRouter();

// property
const isLoading = ref(false);
const isFeedbackVisible = ref(false);
const userProfile = ref({});
const userSkill = ref([]);
const userAssessment = ref([]);
const listRecentActivity = ref([]);
const listInstructorMessages = ref([]);
const user = localStorage.getItem("user");
const userData = JSON.parse(user);

// onMounted
onMounted(async () => {
  await fetchUserProfile();
  await fetchFeedbackCheck();
  await fetchUserSkill();
  await fetchUserAssessment();
  await fetchUserRecentActivity();
  await fetchInstructorMessages();
  router.replace({ query: {} });
});

// function
async function fetchUserProfile() {
  isLoading.value = true;
  let id = useGet(userData, "id");
  await useFetchApi(api.userProfile, {
    method: "get",
    params: { id },
  })
    .then((pass) => {
      userProfile.value = pass;
    })
    .catch((error) => {})
    .finally(() => {
      isLoading.value = false;
    });
}

async function fetchFeedbackCheck() {
  isLoading.value = true;
  let id = useGet(userData, "id");
  await useFetchApi(api.feedbackCheck, {
    method: "get",
    params: { id },
  })
    .then(({ data }) => {
      if (isEmpty(data)) {
        isFeedbackVisible.value = true;
      }
    })
    .catch((error) => {})
    .finally(() => {
      isLoading.value = false;
    });
}

async function fetchUserSkill() {
  isLoading.value = true;
  let id = useGet(userData, "id");
  await useFetchApi(api.userSkills, {
    method: "get",
    params: { id },
  })
    .then((pass) => {
      userSkill.value = pass;
    })
    .catch((error) => {})
    .finally(() => {
      isLoading.value = false;
    });
}

async function fetchUserAssessment() {
  isLoading.value = true;
  let id = useGet(userData, "id");
  await useFetchApi(api.userTakenAssessment, {
    method: "get",
    params: { id },
  })
    .then((pass) => {
      userAssessment.value = pass;
    })
    .catch((error) => {})
    .finally(() => {
      isLoading.value = false;
    });
}

async function fetchInstructorMessages() {
  isLoading.value = true;
  let id = useGet(userData, "id");
  await useFetchApi(api.showMessage, {
    method: "get",
    params: { id },
  })
    .then((pass) => {
      listInstructorMessages.value = pass;
    })
    .catch((error) => {})
    .finally(() => {
      isLoading.value = false;
    });
}

async function fetchUserRecentActivity() {
  isLoading.value = true;
  let id = useGet(userData, "id");
  await useFetchApi(api.userRecentActivity, {
    method: "get",
    params: { id },
  })
    .then((pass) => {
      listRecentActivity.value = pass;
    })
    .catch((error) => {})
    .finally(() => {
      isLoading.value = false;
    });
}

// Format date
const formatDate = (date) => {
  const now = new Date();
  const messageDate = new Date(date);

  // If today, show time
  if (messageDate.toDateString() === now.toDateString()) {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // If this year, show month and day
  if (messageDate.getFullYear() === now.getFullYear()) {
    return messageDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  }

  // Otherwise show full date
  return messageDate.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Helper functions
const getProgressColorClass = (score) => {
  if (score >= 90) return "bg-green-600";
  if (score >= 75) return "bg-blue-600";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

function formatTimeSpent(seconds) {
  const secs = Number(seconds);
  if (isNaN(secs) || secs <= 0) return "0 min";

  const minutes = Math.floor(secs / 60);
  const remainingSeconds = secs % 60;

  return remainingSeconds > 0
    ? `${minutes}m ${remainingSeconds}s`
    : `${minutes} min`;
}
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-[100rem] mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Profile Header -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div
          class="relative h-40 bg-gradient-to-r from-indigo-700 to-indigo-400"
        >
          <div class="absolute -bottom-16 left-8">
            <div class="relative bg-white rounded-full">
              <img
                src="https://images.icon-icons.com/3446/PNG/512/account_profile_user_avatar_icon_219236.png"
                alt="User avatar"
                class="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <div
                v-if="userProfile.online"
                class="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-2 border-white"
              ></div>
            </div>
          </div>
        </div>
        <div class="pt-20 pb-6 px-8">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                {{ userProfile.name }}
              </h1>
              <p class="text-gray-500">{{ userProfile.role }}</p>
            </div>
            <div class="mt-4 md:mt-0 flex space-x-3">
              <button
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-gray-50 text-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-medium text-gray-900">
                  {{ userProfile.completed_assessments }}
                </h2>
                <p class="text-sm text-gray-500">Assessments Completed</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-gray-50 text-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-medium text-gray-900">
                  {{ userProfile.average_score }}%
                </h2>
                <p class="text-sm text-gray-500">Average Score</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-gray-50 text-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-medium text-gray-900">
                  {{ userProfile.join_at }}
                </h2>
                <p class="text-sm text-gray-500">Joined at</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Assessment Progress -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
              Assessment Progress
            </h2>
            <div class="max-h-[350px] overflow-y-auto">
              <div class="space-y-6 max-h-[350px]">
                <div
                  v-for="(assessment, index) in userAssessment"
                  :key="index"
                  class="space-y-2"
                >
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-700">
                      {{ assessment.name }}
                    </span>
                    <span class="text-sm font-medium text-gray-900">
                      {{ assessment.score }}%
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      class="h-2.5 rounded-full"
                      :class="getProgressColorClass(assessment.score)"
                      :style="{ width: `${assessment.score}%` }"
                    ></div>
                  </div>
                  <div class="flex justify-between text-xs text-gray-500">
                    <span>Completed on {{ assessment.completed_date }}</span>
                    <span
                      >{{ formatTimeSpent(assessment.time_spent) }} Completed
                      Time
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
              Skill Proficiency
            </h2>
            <div class="max-h-[350px] overflow-x-auto">
              <div class="space-y-6 max-h-[350px]">
                <div
                  v-for="(skill, index) in userSkill"
                  :key="index"
                  class="flex items-center"
                >
                  <div class="w-full">
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-gray-700">{{
                        skill.name
                      }}</span>
                      <span class="text-sm font-medium text-gray-900"
                        >{{ skill.level }}/5</span
                      >
                    </div>
                    <div class="flex space-x-1">
                      <div
                        v-for="n in 5"
                        :key="n"
                        class="h-2 flex-1 rounded-sm"
                        :class="
                          n <= skill.level ? 'bg-indigo-600' : 'bg-gray-200'
                        "
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <!-- Recent Activity -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <CpIcon name="relativity" iconset="tdesign" class="mt-1" />
            <h2 class="text-xl font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div class="max-h-[350px] overflow-y-auto divide-y divide-gray-200">
            <div
              v-for="(activity, id) in listRecentActivity"
              :key="id"
              class="px-6 py-4"
            >
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div
                    class="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-indigo-600"
                  >
                    <CpIcon name="flow-logs-vpc" iconset="carbon" />
                  </div>
                </div>
                <div class="ml-4 flex-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium text-gray-900">
                      {{ activity.title }}
                    </h3>
                    <span class="text-xs text-gray-500">
                      {{ activity.time }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ activity.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <UserRecommend />
      </div>
    </div>
  </div>

  <!-- show feedback notification -->
  <NotificationFeedBack
    v-model="isFeedbackVisible"
    title="We'd love your feedback!"
    message="Help us improve by sharing your experience"
  />
</template>
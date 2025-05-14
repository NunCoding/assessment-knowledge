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
  await fetchUserSkill();
  await fetchUserAssessment();
  await fetchUserRecentActivity();
  await fetchInstructorMessages();
  router.replace({ query: {} });
});

// Message data
const messages = ref([
  {
    id: 1,
    sender: {
      name: "Dr. Sarah Williams",
      role: "Professor",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    subject: "Upcoming Project Deadline Extension",
    preview:
      "I wanted to inform all students that I've decided to extend the deadline for the final project by one week. This should give everyone more time to complete their work and address any challenges you might be facing...",
    date: new Date("2023-05-15T14:30:00"),
    unread: true,
  },
  {
    id: 2,
    sender: {
      name: "Prof. Michael Chen",
      role: "Teaching Assistant",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    subject: "Feedback on Your Recent Assignment",
    preview:
      "I've reviewed your latest assignment submission and wanted to provide some feedback. Overall, your work demonstrates a good understanding of the core concepts we've covered in class...",
    date: new Date("2023-05-12T09:15:00"),
    unread: true,
  },
  {
    id: 3,
    sender: {
      name: "Dr. James Peterson",
      role: "Department Head",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    },
    subject: "Invitation to Department Research Symposium",
    preview:
      "On behalf of the Computer Science Department, I would like to invite you to our annual Research Symposium taking place next month. This event showcases ongoing research projects and provides networking opportunities...",
    date: new Date("2023-05-10T16:45:00"),
    unread: false,
  },
  {
    id: 4,
    sender: {
      name: "Lisa Rodriguez",
      role: "Academic Advisor",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    subject: "Course Registration for Next Semester",
    preview:
      "As we approach the end of the current semester, I wanted to remind you that course registration for the fall semester will open next week. Based on your academic progress and career goals, I have some recommendations...",
    date: new Date("2023-05-08T11:20:00"),
    unread: false,
  },
  {
    id: 5,
    sender: {
      name: "Dr. Robert Thompson",
      role: "Professor",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    subject: "Office Hours Change This Week",
    preview:
      "Due to a faculty meeting, I need to reschedule my office hours this week. Instead of Tuesday 2-4 PM, I will be available on Wednesday 1-3 PM. If you had planned to meet with me during the original time slot...",
    date: new Date("2023-05-05T13:10:00"),
    unread: false,
  },
  {
    id: 5,
    sender: {
      name: "Dr. Robert Thompson",
      role: "Professor",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    subject: "Office Hours Change This Week",
    preview:
      "Due to a faculty meeting, I need to reschedule my office hours this week. Instead of Tuesday 2-4 PM, I will be available on Wednesday 1-3 PM. If you had planned to meet with me during the original time slot...",
    date: new Date("2023-05-05T13:10:00"),
    unread: false,
  },
  {
    id: 5,
    sender: {
      name: "Dr. Robert Thompson",
      role: "Professor",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    subject: "Office Hours Change This Week",
    preview:
      "Due to a faculty meeting, I need to reschedule my office hours this week. Instead of Tuesday 2-4 PM, I will be available on Wednesday 1-3 PM. If you had planned to meet with me during the original time slot...",
    date: new Date("2023-05-05T13:10:00"),
    unread: false,
  },
  {
    id: 5,
    sender: {
      name: "Dr. Robert Thompson",
      role: "Professor",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    subject: "Office Hours Change This Week",
    preview:
      "Due to a faculty meeting, I need to reschedule my office hours this week. Instead of Tuesday 2-4 PM, I will be available on Wednesday 1-3 PM. If you had planned to meet with me during the original time slot...",
    date: new Date("2023-05-05T13:10:00"),
    unread: false,
  },
]);

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
            <div class="relative">
              <img
                src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg"
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
            <div class="max-h-[350px] overflow-x-auto">
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
                    <span>{{ formatTimeSpent(assessment.time_spent) }} </span>
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
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div>
          <!-- Message List -->
          <div class="w-full">
            <div class="bg-white rounded-lg shadow">
              <!-- Message List Header -->
              <div
                class="px-6 py-4 border-b border-gray-200 flex items-center justify-between"
              >
                <h2 class="text-lg font-medium text-gray-900">
                  Instructor Messages
                </h2>
                <div class="flex items-center gap-2">
                  <div class="relative">
                    <input
                      type="text"
                      placeholder="Search messages..."
                      class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <CpIcon
                      name="search"
                      iconset="pajamas"
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                    />
                    <!-- <SearchIcon
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                    /> -->
                  </div>
                </div>
              </div>

              <!-- Message List -->
              <div
                class="max-h-[600px] overflow-y-auto divide-y divide-gray-200"
                v-if="!isEmpty(listInstructorMessages)"
              >
                <div
                  v-for="message in listInstructorMessages"
                  :key="message.id"
                  class="px-6 py-4 hover:bg-indigo-50 cursor-pointer transition-colors"
                >
                  <div class="flex items-start gap-4">
                    <div
                      class="flex-shrink-0 px-3 py-2 bg-gray-50 rounded-full"
                    >
                      <CpIcon
                        name="user"
                        class="rounded-full object-cover text-gray-500"
                        size="30"
                      />
                    </div>
                    <div class="flex-grow min-w-0">
                      <div class="flex items-center justify-between mb-1">
                        <h3 class="text-sm font-medium text-gray-900 truncate">
                          {{ message.instructor_name }}
                          <span class="ml-2 text-xs font-normal text-gray-500">
                            {{ message.email }}
                          </span>
                        </h3>
                        <div class="flex items-center gap-2">
                          <span class="text-xs text-gray-500">
                            {{ formatDate(message.created_at) }}
                          </span>
                        </div>
                      </div>
                      <h4
                        class="text-sm font-medium text-gray-900 mb-1"
                        v-if="message.assessment"
                      >
                        Assessment: {{ message.assessment }}
                      </h4>
                      <p class="text-sm text-gray-600 line-clamp-2">
                        {{ message.message }}
                      </p>
                      <a :href="message?.link" class="mt-2 text-blue-500">
                        {{ message?.link }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="flex items-center justify-center">
                <img
                  src="/public/images/no_data.jpg"
                  alt="no data"
                  class="max-h-96"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Recent Activity -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div class="divide-y divide-gray-200">
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
                    <span class="text-xs text-gray-500">{{
                      activity.time
                    }}</span>
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
    </div>
  </div>
</template>
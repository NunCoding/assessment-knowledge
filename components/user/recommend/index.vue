<script setup>
// property
const isLoading = ref(false);
const listRecommendCourse = ref([]);

const user = localStorage.getItem("user");
const dataUser = JSON.parse(user);

// computed
const dataSource = computed(() => {
  return useGet(listRecommendCourse.value, "recommendations");
});

// onMounted
onMounted(async () => {
  await fetchRecommendCourse();
});

//function
async function fetchRecommendCourse() {
  const id = useGet(dataUser, "id");
  isLoading.value = true;
  await useFetchApi(api.recommend, {
    method: "get",
    params: { id },
  })
    .then((pass) => {
      listRecommendCourse.value = pass;
    })
    .catch(() => {})
    .finally(() => {
      isLoading.value = false;
    });
}

const getTitle = (text) => {
  const firstLine = text.split("\n")[0];
  return firstLine.replace(/\*\*/g, "").replace(":", "").trim();
};

const cleanText = (text) => {
  const lines = text.split("\n");
  const contentLines = lines.slice(1).join("\n");
  return contentLines.replace(/\*\*/g, "").replace(/\*/g, "").trim();
};
</script>
<template>
  <div
    class="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3 flex-1">
        <div class="p-2 rounded-lg transition-colors">
          <CpIcon name="code" iconset="lucide" class="mt-1" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 -ml-2">
          Recommended Learning Resources
        </h3>
      </div>
      <div>
        <button
          @click="fetchRecommendCourse"
          :disabled="isLoading"
          class="bg-blue-500 px-3 py-2 text-sm text-white rounded-md shadow cursor-pointer"
        >
          New Source
        </button>
      </div>
    </div>
    <div class="mb-8 text-sm text-gray-500">
      Personalized recommendations to enhance skills
    </div>
    <!-- Content -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      v-if="!isEmpty(dataSource) && !isLoading"
    >
      <div
        v-for="(recommendation, index) in dataSource"
        :key="index"
        class="mb-6"
      >
        <div
          class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-300 h-full"
        >
          <!-- Header -->
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="flex items-center gap-3 flex-1">
              <div class="p-2 rounded-lg transition-colors">
                <CpIcon
                  v-if="recommendation.website || recommendation.youtube_link"
                  name="open-outline"
                  iconset="ion"
                  class="w-4 h-4"
                />
                <CpIcon
                  v-else
                  name="outline-tips-and-updates"
                  iconset="ic"
                  class="w-4 h-4"
                />
              </div>
              <h3
                class="text-sm font-semibold group-hover:text-purple-700 transition-colors"
                :class="
                  recommendation.youtube_link
                    ? 'text-blue-500 cursor-pointer line-clamp-2'
                    : ''
                "
              >
                <a
                  :href="recommendation.youtube_link ?? null"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ getTitle(recommendation.text) }}</a
                >
              </h3>
            </div>
            <span
              v-if="recommendation.website || recommendation.youtube_link"
              class="ring-1 ring-gray-100 text-xs px-2 py-1 rounded-full font-medium"
            >
              Resource
            </span>
            <span
              v-else
              class="ring-1 ring-gray-100 text-xs px-2 py-1 rounded-full font-medium"
            >
              Tip
            </span>
          </div>

          <!-- Content -->
          <div class="flex-1 flex flex-col">
            <p class="text-sm text-gray-600 line-clamp-5">
              {{ cleanText(recommendation.text) }}
            </p>

            <!-- Action Button -->
            <div v-if="recommendation.website" class="mt-5">
              <a
                :href="recommendation.website"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-500 ring-1 ring-gray-100 rounded-lg"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
                Visit Resource
              </a>
            </div>
            <div v-else class="mt-3">
              <div
                class="w-full text-center px-4 py-2.5 text-sm font-medium text-gray-600 ring-1 ring-gray-100 rounded-lg"
              >
                <span>
                  {{
                    recommendation.youtube_link ? "YouTube Link" : "Learn Tip"
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col justify-center items-center"
      v-if="isEmpty(dataSource) && !isLoading"
    >
      <h3 class="text-xl font-bold">You don't have weak skill!.</h3>
      <img src="/public/images/no_data.jpg" alt="no data" class="max-h-96" />
    </div>
    <div v-if="isLoading" class="flex justify-center items-center">
      <Skeleton />
    </div>
  </div>
</template>
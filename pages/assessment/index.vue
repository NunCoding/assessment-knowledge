<script setup>
definePageMeta({
  layout: "top-menu",
});

// emit
const router = useRouter();

// Pagination
const isLoading = ref(false);
const currentPage = ref(1);
const itemsPerPage = 5;
const listAssessmentsCategory = ref([]);
const listPopularAssessment = ref([]);

// Filters
const filters = ref({
  search: "",
  difficulty: [],
  duration: [],
  tags: [],
  sortBy: "popular",
});

const difficultyLevels = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
  { label: "Expert", value: "Expert" },
];

const durations = [
  { label: "Under 15 minutes", value: "short" },
  { label: "15-30 minutes", value: "medium" },
  { label: "30-60 minutes", value: "long" },
  { label: "Over 60 minutes", value: "very-long" },
];

const popularTags = [
  "JavaScript",
  "React",
  "Node.js",
  "HTML/CSS",
  "TypeScript",
  "Frontend",
  "Backend",
  "Full Stack",
  "API",
  "Frameworks",
];

// Mock data for subcategories
const subcategories = [
  { name: "Frontend", slug: "frontend" },
  { name: "Backend", slug: "backend" },
  { name: "Databases", slug: "databases" },
  { name: "Cloud & DevOps", slug: "cloud-devops" },
];

// Mock data for related categories
const relatedCategories = [
  {
    name: "JavaScript",
    slug: "javascript",
    assessmentCount: 47,
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    assessmentCount: 32,
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    assessmentCount: 28,
  },
  { name: "DevOps", slug: "devops", assessmentCount: 19 },
];

// Computed property for filtered assessments
const filteredAssessments = computed(() => {
  let result = [...listAssessmentsCategory.value];

  // Apply search filter
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    result = result.filter(
      (assessment) =>
        assessment.title.toLowerCase().includes(searchTerm) ||
        assessment.description.toLowerCase().includes(searchTerm) ||
        assessment.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Apply difficulty filter
  if (filters.value.difficulty.length > 0) {
    result = result.filter((assessment) =>
      filters.value.difficulty.includes(assessment.difficulty)
    );
  }

  // Apply duration filter
  if (filters.value.duration.length > 0) {
    result = result.filter((assessment) => {
      const duration = assessment.duration;
      return (
        (filters.value.duration.includes("short") && duration < 15) ||
        (filters.value.duration.includes("medium") &&
          duration >= 15 &&
          duration <= 30) ||
        (filters.value.duration.includes("long") &&
          duration > 30 &&
          duration <= 60) ||
        (filters.value.duration.includes("very-long") && duration > 60)
      );
    });
  }

  // Apply tags filter
  if (filters.value.tags.length > 0) {
    result = result.filter((assessment) =>
      assessment.tags.some((tag) => filters.value.tags.includes(tag))
    );
  }

  // Apply sorting
  switch (filters.value.sortBy) {
    case "newest":
      // In a real app, we would sort by date
      result = [...result].reverse();
      break;
    case "rating":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    case "easiest":
      const difficultyOrder = {
        Beginner: 1,
        Intermediate: 2,
        Advanced: 3,
        Expert: 4,
      };
      result = [...result].sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
      break;
    case "hardest":
      const difficultyOrderReverse = {
        Beginner: 1,
        Intermediate: 2,
        Advanced: 3,
        Expert: 4,
      };
      result = [...result].sort(
        (a, b) =>
          difficultyOrderReverse[b.difficulty] -
          difficultyOrderReverse[a.difficulty]
      );
      break;
    case "popular":
    default:
      // Sort by completions (most popular first)
      result = [...result].sort((a, b) => {
        const getCompletions = (val) => {
          if (!val?.completions) return 0;
          const str = String(val.completions).toLowerCase();
          if (str.includes("k")) return parseFloat(str) * 1000;
          if (str.includes("m")) return parseFloat(str) * 1000000;
          return parseInt(str) || 0;
        };

        return getCompletions(b) - getCompletions(a);
      });

      break;
  }

  return result;
});

// Computed property for total pages
const totalPages = computed(() =>
  Math.ceil(filteredAssessments.value.length / itemsPerPage)
);

// onMounted
onMounted(async () => {
  await fetchAssessments();
  await fetchPopularAssessments();
});

// function
async function fetchAssessments() {
  isLoading.value = true;
  await useFetchApi(api.assessmentCategory, {
    method: "GET",
  })
    .then((pass) => {
      listAssessmentsCategory.value = pass;
    })
    .catch((error) => {
      console.error("Error fetching assessments:", error);
      triggerAlert("Something went wrong!.", "error");
    })
    .finally(() => {
      isLoading.value = false;
    });
}

async function fetchPopularAssessments() {
  isLoading.value = true;
  await useFetchApi(api.popularAssessment, {
    method: "GET",
  })
    .then((pass) => {
      listPopularAssessment.value = pass;
    })
    .catch((error) => {
      triggerAlert("Something went wrong!.", "error");
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function toggleTag(tag) {
  const index = filters.value.tags.indexOf(tag);
  if (index === -1) {
    filters.value.tags.push(tag);
  } else {
    filters.value.tags.splice(index, 1);
  }
}

function navigateToAssessment(id) {
  const userAllReadyLogin = localStorage.getItem("token");
  if (userAllReadyLogin) {
    navigateTo({
      name: "assessment-id",
      params: { id },
    });
  } else {
    router.push("/auth");
  }
}

function parseTags(tags) {
  if (Array.isArray(tags)) {
    const jsonString = tags.join(",");
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("JSON parse failed:", jsonString, e);
      return [];
    }
  }

  return [];
}

function resetFilters() {
  filters.value = {
    search: "",
    difficulty: [],
    duration: [],
    tags: [],
    sortBy: "popular",
  };
  currentPage.value = 1;
}
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Category Header -->
    <section
      class="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-12"
    >
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center md:items-start">
          <div
            class="bg-white rounded-full px-6 py-5 shadow-lg mb-6 md:mb-0 md:mr-8"
          >
            <CpIcon
              name="earth-line"
              iconset="mingcute"
              class="text-indigo-600"
              size="32"
            />
          </div>
          <div class="text-center md:text-left">
            <h1 class="text-3xl md:text-4xl font-bold mb-3">Assessment</h1>
            <p class="text-indigo-100 text-lg max-w-2xl mb-6">
              Test your knowledge of web development technologies, frameworks,
              and best practices. From frontend, these assessments cover all
              aspects of modern web development.
            </p>
            <div class="flex flex-wrap justify-center md:justify-start gap-6">
              <div class="flex items-center">
                <CpIcon
                  name="clipboard-check"
                  iconset="lucide"
                  class="h-5 w-5 mr-2"
                />
                <span>93 Assessments</span>
              </div>
              <div class="flex items-center">
                <CpIcon
                  name="user-group-light"
                  iconset="stash"
                  class="h-5 w-5 mr-2 font-semibold"
                />
                <span>15.2k+ Users</span>
              </div>
              <div class="flex items-center">
                <CpIcon
                  name="star-outline"
                  iconset="mdi"
                  class="h-5 w-5 mr-2 font-semibold"
                />
                <span>4.7 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Filters</h2>

            <!-- Search -->
            <div class="mb-6">
              <label
                for="search"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Search</label
              >
              <div class="relative">
                <input
                  v-model="filters.search"
                  type="text"
                  id="search"
                  placeholder="Search assessments..."
                  class="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <CpIcon
                  name="search"
                  iconset="wpf"
                  class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                />
              </div>
            </div>

            <!-- Difficulty -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-2">Difficulty</h3>
              <div class="space-y-2">
                <label
                  v-for="level in difficultyLevels"
                  :key="level.value"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :value="level.value"
                    v-model="filters.difficulty"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-gray-700">{{ level.label }}</span>
                </label>
              </div>
            </div>

            <!-- Duration -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-2">Duration</h3>
              <div class="space-y-2">
                <label
                  v-for="duration in durations"
                  :key="duration.value"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :value="duration.value"
                    v-model="filters.duration"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-gray-700">{{ duration.label }}</span>
                </label>
              </div>
            </div>

            <!-- Tags -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in popularTags"
                  :key="tag"
                  @click="toggleTag(tag)"
                  :class="[
                    'px-3 py-1 rounded-full text-sm',
                    filters.tags.includes(tag)
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200',
                  ]"
                >
                  {{ tag }}
                </button>
              </div>
            </div>

            <!-- Sort By -->
            <div class="mb-6">
              <label
                for="sortBy"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Sort By</label
              >
              <select
                v-model="filters.sortBy"
                id="sortBy"
                class="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
                <option value="easiest">Easiest First</option>
                <option value="hardest">Hardest First</option>
              </select>
            </div>

            <!-- Reset Filters -->
            <button
              @click="resetFilters"
              class="w-full py-2 px-4 border border-indigo-300 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:w-3/4">
          <!-- Featured Assessments -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold text-gray-900">
                Popular Assessments
              </h2>
              <button
                class="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
              >
                View All
                <CpIcon
                  name="chevron-right"
                  iconset="ci"
                  class="h-4 w-4 ml-1"
                />
              </button>
            </div>

            <div
              class="max-w-7xl overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            >
              <div class="flex gap-5 flex-nowrap w-max">
                <div
                  v-for="assessment in listPopularAssessment"
                  :key="assessment.id"
                  class="bg-white max-w-[500px] rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
                >
                  <div class="relative">
                    <img
                      :src="assessment.image"
                      alt=""
                      class="w-full h-48 object-cover"
                    />
                    <div
                      class="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg"
                    >
                      Popular
                    </div>
                  </div>
                  <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                      <h3 class="text-lg font-bold text-gray-900">
                        {{ assessment.title }}
                      </h3>
                      <div class="flex justify-center items-center">
                        <CpIcon
                          name="star-outline"
                          iconset="flowbite"
                          class="h-4 w-4 mb-1 text-yellow-400"
                        />
                        <span class="ml-2 text-sm font-medium">
                          {{ assessment.rating }}
                        </span>
                      </div>
                    </div>
                    <p class="text-gray-600 mb-4 whitespace-break-spaces">
                      {{ assessment.description }}
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span
                        v-for="tag in assessment.tags"
                        :key="tag"
                        class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {{ tag }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center">
                      <div class="flex items-center space-x-4">
                        <div
                          class="flex justify-center items-center text-sm text-gray-500"
                        >
                          <CpIcon
                            name="chart-bar-solid"
                            iconset="mynaui"
                            class="h-4 w-4 mr-2"
                          />
                          <span>{{ assessment.difficulty }}</span>
                        </div>
                        <div
                          class="flex justify-center items-center text-sm text-gray-500"
                        >
                          <CpIcon
                            name="clock-12-regular"
                            iconset="fluent"
                            class="h-4 w-4 mr-2"
                          />
                          <span>{{ assessment.timeEstimate }} min</span>
                        </div>
                        <div
                          class="flex justify-center items-center text-sm text-gray-500"
                        >
                          <CpIcon name="user" class="h-4 w-4 mr-2" />
                          <span>{{ assessment.users }} users</span>
                        </div>
                      </div>
                      <button
                        @click="navigateToAssessment(assessment.id)"
                        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- All Assessments -->
          <div>
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold text-gray-900">All Assessments</h2>
              <div class="text-sm text-gray-500">
                Showing {{ filteredAssessments.length }} of
                {{ listAssessmentsCategory.length }} assessments
              </div>
            </div>

            <div
              v-if="filteredAssessments.length === 0"
              class="bg-white rounded-lg shadow-md p-8 text-center"
            >
              <CpIcon
                name="search"
                iconset="wpf"
                class="text-gray-400 mx-auto mb-4"
                size="32"
              />
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                No assessments found
              </h3>
              <p class="text-gray-600 mb-4">
                Try adjusting your filters or search criteria
              </p>
              <button
                @click="resetFilters"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Reset Filters
              </button>
            </div>

            <div v-else class="grid grid-cols-1 gap-4">
              <div
                v-for="assessment in filteredAssessments"
                :key="assessment.id"
                class="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition p-4"
              >
                <div class="flex flex-col sm:flex-row">
                  <div class="sm:w-1/4 mb-4 sm:mb-0 sm:mr-6">
                    <img
                      :src="assessment.image"
                      alt=""
                      class="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div class="sm:w-3/4">
                    <div class="flex justify-between items-start mb-2">
                      <h3 class="text-lg font-bold text-gray-900">
                        {{ assessment.title }}
                      </h3>
                      <div class="flex justify-center items-center">
                        <CpIcon
                          name="star-outline"
                          iconset="flowbite"
                          class="h-4 w-4 mb-1 text-yellow-400"
                        />
                        <span class="ml-2 text-sm font-medium">
                          {{ assessment.rating }}
                        </span>
                      </div>
                    </div>
                    <p class="text-gray-600 mb-3">
                      {{ assessment.description }}
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span
                        v-for="tag in parseTags(assessment.tags)"
                        :key="tag"
                        class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {{ tag }}
                      </span>
                    </div>
                    <div
                      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                    >
                      <div class="flex items-center space-x-4">
                        <div class="flex items-center text-sm text-gray-500">
                          <CpIcon
                            name="chart-bar-solid"
                            iconset="mynaui"
                            class="h-4 w-4 mr-2"
                          />
                          <span>{{ assessment.difficulty }}</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-500">
                          <CpIcon
                            name="clock-12-regular"
                            iconset="fluent"
                            class="h-4 w-4 mr-2"
                          />
                          <span>{{ assessment.duration }} min</span>
                        </div>
                        <div
                          class="flex justify-center items-center text-sm text-gray-500"
                        >
                          <CpIcon
                            name="user-group"
                            iconset="nimbus"
                            class="h-4 w-4 mr-2"
                          />
                          <span class="text-lg">
                            {{ assessment.users }}
                            <span class="text-sm">Users</span>
                          </span>
                        </div>
                      </div>
                      <div class="flex space-x-2">
                        <button
                          class="px-4 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                          @click="navigateToAssessment(assessment.id)"
                        >
                          Start
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="mt-8 flex justify-center">
              <nav class="flex items-center space-x-2">
                <button
                  @click="currentPage > 1 ? currentPage-- : null"
                  :disabled="currentPage === 1"
                  :class="[
                    'px-3 py-1 rounded-md',
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
                  ]"
                >
                  <CpIcon
                    name="chevron-left-32-filled"
                    iconset="fluent"
                    class="h-5 w-5"
                  />
                </button>

                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'px-3 py-1 rounded-md',
                    currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
                  ]"
                >
                  {{ page }}
                </button>

                <button
                  @click="currentPage < totalPages ? currentPage++ : null"
                  :disabled="currentPage === totalPages"
                  :class="[
                    'px-3 py-1 rounded-md',
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
                  ]"
                >
                  <CpIcon
                    name="chevron-right"
                    iconset="line-md"
                    class="h-5 w-5"
                  />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Categories -->
    <section class="bg-gray-100 py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          Related Categories
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="category in relatedCategories"
            :key="category.slug"
            class="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer"
          >
            <component
              :is="category.icon"
              class="h-10 w-10 text-indigo-600 mx-auto mb-3"
            />
            <h3 class="font-medium text-gray-900 mb-1">{{ category.name }}</h3>
            <p class="text-sm text-gray-500">
              {{ category.assessmentCount }} assessments
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="bg-indigo-600 py-12">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">
          Stay Updated with New Assessments
        </h2>
        <p class="text-indigo-100 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive updates when new assessments
          are added to this category.
        </p>
        <div class="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            class="px-4 py-3 rounded-l-md w-full focus:outline-none text-gray-800 mb-2 sm:mb-0"
          />
          <button
            class="bg-indigo-800 text-white px-6 py-3 rounded-r-md hover:bg-indigo-900 transition sm:w-auto w-full"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
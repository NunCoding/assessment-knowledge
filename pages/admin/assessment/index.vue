<script setup>
definePageMeta({
  layout: "dashboard-sidemenu",
});

// fake data
const assessments = [
  {
    name: "Web Development Fundamentals",
    description: "Test your knowledge of HTML, CSS, and JavaScript basics.",
    category: "Programming",
    questions: 10,
    timeEstimate: 15,
    completions: 1245,
    status: "Active",
  },
  {
    name: "Data Science Essentials",
    description:
      "Evaluate your understanding of data science concepts and tools.",
    category: "Data Science",
    questions: 12,
    timeEstimate: 20,
    completions: 876,
    status: "Active",
  },
  {
    name: "Cloud Computing Basics",
    description:
      "Test your knowledge of cloud services, deployment models, and best practices.",
    category: "Cloud",
    questions: 8,
    timeEstimate: 12,
    completions: 543,
    status: "Active",
  },
  {
    name: "UI/UX Design Principles",
    description:
      "Assess your understanding of user interface and experience design.",
    category: "Design",
    questions: 15,
    timeEstimate: 25,
    completions: 321,
    status: "Draft",
  },
  {
    name: "Cybersecurity Fundamentals",
    description:
      "Test your knowledge of security concepts, threats, and protections.",
    category: "Security",
    questions: 10,
    timeEstimate: 15,
    completions: 210,
    status: "Active",
  },
  {
    name: "Machine Learning Basics",
    description:
      "Evaluate your understanding of ML algorithms and applications.",
    category: "AI & ML",
    questions: 12,
    timeEstimate: 18,
    completions: 156,
    status: "Draft",
  },
];
</script>
<template>
  <!-- Assessments Management -->
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-medium text-gray-900">Assessments</h3>
      <button
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
      >
        <!-- <PlusIcon class="h-5 w-5 mr-1" /> -->
        Create Assessment
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div
        v-for="(assessment, index) in assessments"
        :key="index"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <div class="h-40 bg-gray-200 relative">
          <img
            :src="assessment.image"
            alt=""
            class="w-full h-full object-cover"
          />
          <div class="absolute top-0 right-0 m-2">
            <span
              :class="`px-2 py-1 text-xs font-semibold rounded-full bg-${
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
          </div>
        </div>
        <div class="p-6">
          <h4 class="text-lg font-medium text-gray-900 mb-2">
            {{ assessment.name }}
          </h4>
          <p class="text-sm text-gray-600 mb-4">{{ assessment.description }}</p>
          <div
            class="flex justify-between items-center text-sm text-gray-500 mb-4"
          >
            <div>{{ assessment.questions }} questions</div>
            <div>{{ assessment.timeEstimate }} min</div>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-sm text-gray-500">
              {{ assessment.completions }} completions
            </div>
            <div class="flex space-x-2">
              <button class="p-1 text-indigo-600 hover:text-indigo-900">
                <!-- <EditIcon class="h-5 w-5" /> -->
              </button>
              <button class="p-1 text-red-600 hover:text-red-900">
                <!-- <TrashIcon class="h-5 w-5" /> -->
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
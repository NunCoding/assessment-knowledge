<script setup>
definePageMeta({
  layout: "dashboard-sidemenu",
});

// property
const isCreateQuestionModal = ref(false);

// make fake data
const questions = [
  {
    text: "What does HTML stand for?",
    category: "Programming",
    type: "Multiple Choice",
    difficulty: "Easy",
    usedIn: 3,
  },
  {
    text: "Which CSS property is used to change the text color?",
    category: "Programming",
    type: "Multiple Choice",
    difficulty: "Easy",
    usedIn: 2,
  },
  {
    text: "Which of the following is NOT a JavaScript data type?",
    category: "Programming",
    type: "Multiple Choice",
    difficulty: "Medium",
    usedIn: 3,
  },
  {
    text: "What is the time complexity of binary search?",
    category: "Programming",
    type: "Multiple Choice",
    difficulty: "Hard",
    usedIn: 1,
  },
  {
    text: "Which of the following is a supervised learning algorithm?",
    category: "Data Science",
    type: "Multiple Choice",
    difficulty: "Medium",
    usedIn: 2,
  },
  {
    text: "What is the purpose of normalization in database design?",
    category: "Data Science",
    type: "Multiple Choice",
    difficulty: "Hard",
    usedIn: 1,
  },
  {
    text: "Which cloud service model provides virtualized computing resources over the internet?",
    category: "Cloud",
    type: "Multiple Choice",
    difficulty: "Medium",
    usedIn: 2,
  },
  {
    text: "What principle states that related elements should be grouped together?",
    category: "Design",
    type: "Multiple Choice",
    difficulty: "Easy",
    usedIn: 1,
  },
  {
    text: "Which encryption algorithm is considered more secure: AES or DES?",
    category: "Security",
    type: "Multiple Choice",
    difficulty: "Medium",
    usedIn: 1,
  },
  {
    text: "What is the difference between HTTP and HTTPS?",
    category: "Security",
    type: "Multiple Choice",
    difficulty: "Easy",
    usedIn: 3,
  },
];
</script>
<template>
  <!-- Questions Management -->
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-medium text-gray-900">Question Bank</h3>
      <button
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
        @click="isCreateQuestionModal = true"
      >
        <CpIcon name="plus" iconset="uil" class="h-5 w-5 mr-1" />
        Add Question
      </button>
    </div>

    <div class="bg-white rounded-lg shadow mb-6">
      <div
        class="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"
      >
        <div class="flex space-x-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search questions..."
              class="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <!-- <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" /> -->
          </div>
          <select
            class="rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>All Categories</option>
            <option>Programming</option>
            <option>Data Science</option>
            <option>Cloud Computing</option>
            <option>UI/UX Design</option>
          </select>
          <select
            class="rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>All Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Question
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
                Type
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Difficulty
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Used In
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(question, index) in questions" :key="index">
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-md truncate">
                  {{ question.text }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ question.category }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ question.type }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
                    question.difficulty === 'Easy'
                      ? 'green'
                      : question.difficulty === 'Medium'
                      ? 'yellow'
                      : 'red'
                  }-100 text-${
                    question.difficulty === 'Easy'
                      ? 'green'
                      : question.difficulty === 'Medium'
                      ? 'yellow'
                      : 'red'
                  }-800`"
                >
                  {{ question.difficulty }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ question.usedIn }} assessments
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900">
                    <!-- <EyeIcon class="h-5 w-5" /> -->
                  </button>
                  <button class="text-indigo-600 hover:text-indigo-900">
                    <!-- <EditIcon class="h-5 w-5" /> -->
                  </button>
                  <button class="text-red-600 hover:text-red-900">
                    <!-- <TrashIcon class="h-5 w-5" /> -->
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
      >
        <div class="text-sm text-gray-700">
          Showing <span class="font-medium">1</span> to
          <span class="font-medium">10</span> of
          <span class="font-medium">{{ questions.length }}</span> questions
        </div>
        <div class="flex space-x-2">
          <button
            class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- modal -->
  <QuestionCreate v-model="isCreateQuestionModal" />
</template>
<script setup>
definePageMeta({
  layout: "top-menu",
});

// function
function handleNavigatePage() {
  const token = localStorage.getItem("token");
  if (token) {
    navigateTo("/assessment");
  } else {
    navigateTo("/auth");
  }
}
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-r from-indigo-600 to-indigo-800 text-white"
    >
      <div class="absolute inset-0 opacity-20">
        <svg
          class="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="grid-pattern"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="currentColor"
              stroke-width="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      <div class="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            About Program of Skill Ability Assessment
          </h1>
          <p class="text-xl md:text-2xl text-indigo-100 mb-8">
            Empowering learners and organizations with intelligent assessment
            solutions
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <button
              @click="handleNavigatePage"
              class="px-6 py-3 bg-white text-indigo-700 rounded-md hover:bg-indigo-50 transition font-medium"
            >
              Get Started
            </button>
            <button
              class="px-6 py-3 border border-white text-white rounded-md hover:bg-indigo-700 transition font-medium"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16">
        <svg
          viewBox="0 0 1440 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full"
        >
          <path
            d="M0 96L60 80C120 64 240 32 360 21.3C480 10.7 600 21.3 720 32C840 42.7 960 53.3 1080 58.7C1200 64 1320 64 1380 64H1440V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V96Z"
            fill="currentColor"
            class="text-gray-50"
          />
        </svg>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p class="text-xl text-gray-600">
            We're on a mission to redefine how programming skills are assessed
            making skill development more practical, personalized, and
            accessible for all learners.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-lg shadow-md text-center">
            <div
              class="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CpIcon name="brain" iconset="lucide" size="35" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Skill Focused Learning
            </h3>
            <p class="text-gray-600">
              We believe assessments should do more than test knowledge. Our
              platform helps learners understand their true abilities and focus
              on the skills that matter in real-world programming.
            </p>
          </div>

          <div class="bg-white p-8 rounded-lg shadow-md text-center">
            <div
              class="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CpIcon name="user-group" iconset="hugeicons" size="35" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Inclusive Access to Opportunities
            </h3>
            <p class="text-gray-600">
              Everyone deserves the chance to grow. We’re committed to building
              a platform that supports diverse learners with varying
              backgrounds, skill levels, and learning needs.
            </p>
          </div>

          <div class="bg-white p-8 rounded-lg shadow-md text-center">
            <div
              class="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CpIcon name="chart-line" iconset="icon-park-outline" size="30" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Data-Driven Insights
            </h3>
            <p class="text-gray-600">
              We harness the power of data to provide meaningful insights that
              help learners improve and educators enhance their teaching
              methods.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 md:py-24 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Platform Features
          </h2>
          <p class="text-xl text-gray-600">
            Our comprehensive assessment platform offers powerful tools for
            learners and educators alike.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-8 rounded-lg shadow-md flex">
            <div class="mr-6">
              <div
                class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center"
              >
                <CpIcon name="book" iconset="tabler" size="30" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Diverse Assessment Types
              </h3>
              <p class="text-gray-600">
                From multiple-choice to coding challenges, our platform supports
                various assessment formats to effectively evaluate different
                types of knowledge and skills.
              </p>
            </div>
          </div>

          <div class="bg-white p-8 rounded-lg shadow-md flex">
            <div class="mr-6">
              <div
                class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center"
              >
                <CpIcon name="chart-bar-solid" iconset="mynaui" size="30" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Detailed Analytics
              </h3>
              <p class="text-gray-600">
                Gain insights into performance with comprehensive analytics that
                identify strengths, weaknesses, and learning patterns.
              </p>
            </div>
          </div>

          <div class="bg-white p-8 rounded-lg shadow-md flex">
            <div class="mr-6">
              <div
                class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center"
              >
                <CpIcon name="shield-check-light" iconset="stash" size="30" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Secure Assessment Environment
              </h3>
              <p class="text-gray-600">
                Our platform ensures the integrity of assessments with advanced
                security features and anti-cheating measures.
              </p>
            </div>
          </div>

          <div class="bg-white p-8 rounded-lg shadow-md flex">
            <div class="mr-6">
              <div
                class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center"
              >
                <CpIcon name="ai-learning" iconset="hugeicons" size="30" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Adaptive Learning
              </h3>
              <p class="text-gray-600">
                Our intelligent system adapts to each learner's performance,
                providing personalized question difficulty and focus areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p class="text-xl text-gray-600">
            Our simple yet powerful process makes assessment and learning
            seamless.
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="relative">
            <!-- Vertical Line -->
            <div
              class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200 z-0"
            ></div>

            <!-- Steps -->
            <div class="relative z-10 space-y-12">
              <!-- Step 1 -->
              <div class="flex items-center">
                <div class="w-1/2 text-right pr-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-3">
                    Choose Your Assessment
                  </h3>
                  <p class="text-gray-600">
                    Browse our extensive library of assessments across various
                    subjects and difficulty levels, or take a custom assessment
                    created by your organization.
                  </p>
                </div>
                <div
                  class="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mx-auto"
                >
                  1
                </div>
                <div class="w-1/2"></div>
              </div>

              <!-- Step 2 -->
              <div class="flex items-center">
                <div class="w-1/2"></div>
                <div
                  class="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mx-auto"
                >
                  2
                </div>
                <div class="w-1/2 pl-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-3">
                    Complete the Assessment
                  </h3>
                  <p class="text-gray-600">
                    Take the assessment at your own pace, with interactive
                    questions, helpful resources, and real-time feedback to
                    guide your learning.
                  </p>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="flex items-center">
                <div class="w-1/2 text-right pr-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-3">
                    Review Your Results
                  </h3>
                  <p class="text-gray-600">
                    Get detailed insights into your performance, including
                    strengths, areas for improvement, and personalized learning
                    recommendations.
                  </p>
                </div>
                <div
                  class="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mx-auto"
                >
                  3
                </div>
                <div class="w-1/2"></div>
              </div>

              <!-- Step 4 -->
              <div class="flex items-center">
                <div class="w-1/2"></div>
                <div
                  class="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mx-auto"
                >
                  4
                </div>
                <div class="w-1/2 pl-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-3">
                    Improve and Grow
                  </h3>
                  <p class="text-gray-600">
                    Use your assessment results to guide further learning, track
                    your progress over time, and celebrate your achievements
                    with certificates and badges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- CTA Section -->
    <EngagementUser />
  </div>
</template>
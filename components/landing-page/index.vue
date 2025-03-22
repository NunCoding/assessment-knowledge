<script setup>
// fake data
const categories = [
  { name: "Programming", count: 124 },
  { name: "Data Science", count: 87 },
  { name: "Cloud Computing", count: 56 },
  { name: "Design", count: 72 },
  { name: "Security", count: 43 },
  { name: "AI & ML", count: 38 },
  { name: "Business", count: 65 },
  { name: "Education", count: 51 },
  { name: "Web Development", count: 93 },
  { name: "DevOps", count: 47 },
  { name: "Mobile Dev", count: 62 },
  { name: "Networking", count: 39 },
];

const popularAssessments = [
  {
    title: "Web Development Fundamentals",
    description: "Test your knowledge of HTML, CSS, and JavaScript basics.",
    category: "Programming",
    image: "/placeholder.svg?height=300&width=500",
    users: "12.5k",
    timeEstimate: 15,
  },
  {
    title: "Data Science Essentials",
    description:
      "Evaluate your understanding of data science concepts and tools.",
    category: "Data Science",
    image: "/placeholder.svg?height=300&width=500",
    users: "8.7k",
    timeEstimate: 20,
  },
  {
    title: "Cloud Computing Basics",
    description:
      "Test your knowledge of cloud services, deployment models, and best practices.",
    category: "Cloud",
    image: "/placeholder.svg?height=300&width=500",
    users: "5.4k",
    timeEstimate: 12,
  },
  {
    title: "UI/UX Design Principles",
    description:
      "Assess your understanding of user interface and experience design.",
    category: "Design",
    image: "/placeholder.svg?height=300&width=500",
    users: "7.2k",
    timeEstimate: 25,
  },
  {
    title: "Cybersecurity Fundamentals",
    description:
      "Test your knowledge of security concepts, threats, and protections.",
    category: "Security",
    image: "/placeholder.svg?height=300&width=500",
    users: "4.3k",
    timeEstimate: 15,
  },
  {
    title: "Machine Learning Basics",
    description:
      "Evaluate your understanding of ML algorithms and applications.",
    category: "AI & ML",
    image: "/placeholder.svg?height=300&width=500",
    users: "3.8k",
    timeEstimate: 18,
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Software Developer",
    quote:
      "KnowledgeCheck helped me identify gaps in my programming knowledge and prepare for technical interviews. The detailed feedback after each assessment was incredibly valuable.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Chen",
    title: "Data Scientist",
    quote:
      "I use KnowledgeCheck regularly to stay sharp on data science concepts. The platform offers challenging questions that really test your understanding of complex topics.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Emily Rodriguez",
    title: "UX Designer",
    quote:
      "As someone transitioning into UX design, the assessments on KnowledgeCheck helped me validate my learning and build confidence in my new skills. Highly recommended!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
];
</script>
<template>
  <!-- Hero Section -->
  <section
    class="bg-gradient-to-br from-indigo-50 to-indigo-100 py-16 md:py-24"
  >
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0">
          <h2
            class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
          >
            Test Your Knowledge,
            <span class="text-indigo-600">Grow Your Skills</span>
          </h2>
          <p class="text-xl text-gray-600 mb-8 max-w-lg">
            Take interactive assessments on various topics to test your
            knowledge, identify gaps, and track your progress over time.
          </p>
          <div
            class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button
              class="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition text-lg font-medium"
            >
              Get Started
            </button>
            <button
              class="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition text-lg font-medium flex items-center justify-center"
            >
              <!-- <PlayIcon class="h-5 w-5 mr-2" /> -->
              How It Works
            </button>
          </div>
        </div>
        <div class="md:w-2/5">
          <img
            src="/public/images/test_illustrate.png"
            alt="Knowledge Assessment Illustration"
            class="w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
  <!-- Stats Section -->
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
            500+
          </div>
          <div class="text-gray-600">Assessments</div>
        </div>
        <div>
          <div class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
            25k+
          </div>
          <div class="text-gray-600">Users</div>
        </div>
        <div>
          <div class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
            12
          </div>
          <div class="text-gray-600">Categories</div>
        </div>
        <div>
          <div class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
            98%
          </div>
          <div class="text-gray-600">Satisfaction</div>
        </div>
      </div>
    </div>
  </section>
  <!-- Features Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Choose KnowledgeCheck?
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Our platform offers a comprehensive approach to knowledge assessment
          and skill development.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div
            class="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6"
          >
            <BrainIcon class="h-8 w-8 text-indigo-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            Personalized Learning
          </h3>
          <p class="text-gray-600">
            Assessments adapt to your skill level, providing a customized
            learning experience that identifies and addresses your knowledge
            gaps.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div
            class="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6"
          >
            <BarChartIcon class="h-8 w-8 text-indigo-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            Detailed Analytics
          </h3>
          <p class="text-gray-600">
            Track your progress with comprehensive analytics that show your
            strengths, weaknesses, and improvement over time.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div
            class="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6"
          >
            <AwardIcon class="h-8 w-8 text-indigo-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Certification</h3>
          <p class="text-gray-600">
            Earn certificates upon successful completion of assessments to
            showcase your skills to employers and peers.
          </p>
        </div>
      </div>
    </div>
  </section>
  <!-- Categories Section -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Explore Categories
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover assessments across various fields and disciplines to enhance
          your knowledge.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="bg-gray-50 rounded-lg p-6 text-center hover:bg-indigo-50 hover:shadow-md transition cursor-pointer"
        >
          <div
            class="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm"
          >
            <!-- <component :is="category.icon" class="h-8 w-8 text-indigo-600" /> -->
          </div>
          <h3 class="font-medium text-gray-900">{{ category.name }}</h3>
          <p class="text-sm text-gray-500 mt-1">
            {{ category.count }} assessments
          </p>
        </div>
      </div>
    </div>
  </section>
  <!-- Popular Assessments -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-center mb-12"
      >
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Popular Assessments
          </h2>
          <p class="text-xl text-gray-600">
            Start with our most popular assessments taken by thousands of users.
          </p>
        </div>
        <div class="mt-4 md:mt-0">
          <button
            class="text-indigo-600 font-medium hover:text-indigo-800 transition flex items-center"
          >
            View All Assessments
            <ChevronRightIcon class="h-5 w-5 ml-1" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(assessment, index) in popularAssessments"
          :key="index"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
        >
          <div class="h-48 bg-gray-200 relative">
            <img
              :src="assessment.image"
              alt=""
              class="w-full h-full object-cover"
            />
            <div
              class="absolute bottom-0 left-0 bg-indigo-600 text-white px-3 py-1"
            >
              {{ assessment.category }}
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ assessment.title }}
            </h3>
            <p class="text-gray-600 mb-4">{{ assessment.description }}</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center text-sm text-gray-500">
                <UsersIcon class="h-4 w-4 mr-1" />
                <span>{{ assessment.users }} users</span>
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <ClockIcon class="h-4 w-4 mr-1" />
                <span>{{ assessment.timeEstimate }} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- How It Works -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Get started with KnowledgeCheck in just a few simple steps.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="relative">
            <div
              class="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 relative z-10"
            >
              <UserPlusIcon class="h-10 w-10 text-indigo-600" />
            </div>
            <div
              class="hidden md:block absolute top-10 left-full w-full h-0.5 bg-indigo-200 -z-10"
            ></div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            1. Create Account
          </h3>
          <p class="text-gray-600">
            Sign up for free and create your personal profile to track your
            progress.
          </p>
        </div>

        <div class="text-center">
          <div class="relative">
            <div
              class="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 relative z-10"
            >
              <SearchIcon class="h-10 w-10 text-indigo-600" />
            </div>
            <div
              class="hidden md:block absolute top-10 left-full w-full h-0.5 bg-indigo-200 -z-10"
            ></div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            2. Choose Assessment
          </h3>
          <p class="text-gray-600">
            Browse our library of assessments and select one that matches your
            interests.
          </p>
        </div>

        <div class="text-center">
          <div class="relative">
            <div
              class="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 relative z-10"
            >
              <ClipboardCheckIcon class="h-10 w-10 text-indigo-600" />
            </div>
            <div
              class="hidden md:block absolute top-10 left-full w-full h-0.5 bg-indigo-200 -z-10"
            ></div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            3. Take Assessment
          </h3>
          <p class="text-gray-600">
            Answer questions at your own pace and receive immediate feedback.
          </p>
        </div>

        <div class="text-center">
          <div class="relative">
            <div
              class="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 relative z-10"
            >
              <TrendingUpIcon class="h-10 w-10 text-indigo-600" />
            </div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            4. Track Progress
          </h3>
          <p class="text-gray-600">
            Review your results, identify areas for improvement, and track your
            growth.
          </p>
        </div>
      </div>
    </div>
  </section>
  <!-- Testimonials -->
  <section class="py-16 bg-indigo-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What Our Users Say
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Hear from people who have improved their skills with KnowledgeCheck.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white rounded-lg shadow-md p-8"
        >
          <div class="flex items-center mb-4">
            <div v-for="i in 5" :key="i" class="text-yellow-400">
              <StarIcon class="h-5 w-5" />
            </div>
          </div>
          <p class="text-gray-600 mb-6 italic">"{{ testimonial.quote }}"</p>
          <div class="flex items-center">
            <img
              :src="testimonial.avatar"
              alt=""
              class="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <div class="font-medium text-gray-900">
                {{ testimonial.name }}
              </div>
              <div class="text-sm text-gray-500">{{ testimonial.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
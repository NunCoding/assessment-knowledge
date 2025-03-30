<script setup>
definePageMeta({
  layout: "dashboard-sidemenu",
});

// make fake data
const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Student",
    assessments: 12,
    status: "Active",
    joined: "Jan 15, 2023",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Student",
    assessments: 8,
    status: "Active",
    joined: "Feb 3, 2023",
  },
  {
    name: "Robert Johnson",
    email: "robert.j@example.com",
    role: "Instructor",
    assessments: 5,
    status: "Active",
    joined: "Mar 12, 2023",
  },
  {
    name: "Emily Davis",
    email: "emily.d@example.com",
    role: "Student",
    assessments: 15,
    status: "Active",
    joined: "Jan 28, 2023",
  },
  {
    name: "Michael Wilson",
    email: "michael.w@example.com",
    role: "Student",
    assessments: 7,
    status: "Inactive",
    joined: "Apr 5, 2023",
  },
  {
    name: "Sarah Brown",
    email: "sarah.b@example.com",
    role: "Student",
    assessments: 10,
    status: "Active",
    joined: "Feb 18, 2023",
  },
  {
    name: "David Miller",
    email: "david.m@example.com",
    role: "Admin",
    assessments: 3,
    status: "Active",
    joined: "Jan 10, 2023",
  },
  {
    name: "Lisa Taylor",
    email: "lisa.t@example.com",
    role: "Student",
    assessments: 9,
    status: "Active",
    joined: "Mar 22, 2023",
  },
  {
    name: "James Anderson",
    email: "james.a@example.com",
    role: "Student",
    assessments: 6,
    status: "Inactive",
    joined: "Apr 15, 2023",
  },
  {
    name: "Patricia Thomas",
    email: "patricia.t@example.com",
    role: "Instructor",
    assessments: 4,
    status: "Active",
    joined: "Feb 8, 2023",
  },
];
</script>
<template>
  <!-- Users Management -->
  <div class="p-6">
    <div class="bg-white rounded-lg shadow mb-6">
      <div
        class="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"
      >
        <h3 class="text-lg font-medium text-gray-900">Users</h3>
        <div class="flex space-x-3">
          <div class="relative">
            <input
              type="text"
              placeholder="Search users..."
              class="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <!-- <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" /> -->
          </div>
          <button
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
          >
            <!-- <PlusIcon class="h-5 w-5 mr-1" /> -->
            Add User
          </button>
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
                User
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assessments
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
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
            <tr v-for="(user, index) in users" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <!-- <img
                      class="h-10 w-10 rounded-full"
                      :src="user.avatar"
                      alt=""
                    /> -->
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      Joined {{ user.joined }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.role }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.assessments }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
                    user.status === 'Active' ? 'green' : 'red'
                  }-100 text-${user.status === 'Active' ? 'green' : 'red'}-800`"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900">
                    <!-- <EditIcon class="h-5 w-5" /> -->Edit
                  </button>
                  <button class="text-red-600 hover:text-red-900">
                    <!-- <TrashIcon class="h-5 w-5" /> -->Delete
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
          <span class="font-medium">{{ users.length }}</span> users
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
</template>
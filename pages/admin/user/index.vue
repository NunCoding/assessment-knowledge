<script setup>
definePageMeta({
  layout: "dashboard-sidemenu",
  middleware: ["auth"],
});

// emit
const { t } = useI18n();

// property
const isCreateUserModal = ref(false);
const isUpdateUserModal = ref(false);
const isDeleteUserModal = ref(false);
const listUser = ref([]);
const pagination = ref({});
const totalPage = ref({});
const queryText = ref("");
const selectUpdate = ref(null);
const selectDelete = ref(null);
const filterUser = ref({});

// onMounted
onMounted(async () => {
  await fetchListUser();
});

// function
async function fetchListUser(url = api.dashboardUser) {
  useFetchApi(url, {
    method: "get",
    query: { ...filterUser.value },
  })
    .then((pass) => {
      listUser.value = pass.data;
      totalPage.value = pass;
      pagination.value = {
        next_page_url: pass.next_page_url,
        prev_page_url: pass.prev_page_url,
      };
    })
    .catch(() => {})
    .finally(() => {});
}

// function
async function handleFilterUser() {
  filterUser.value = { name: queryText.value };
  await fetchListUser();
}

function handleUpdate(id) {
  selectUpdate.value = useFind(listUser.value, (item) => item.id === id);
  isUpdateUserModal.value = true;
}

function handleDelete(id) {
  selectDelete.value = id;
  isDeleteUserModal.value = true;
}
</script>
<template>
  <!-- Users Management -->
  <div class="p-6">
    <div class="bg-white rounded-lg shadow mb-6">
      <div
        class="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"
      >
        <h3 class="text-lg font-medium text-gray-900">{{ t("user.title") }}</h3>
        <div class="flex space-x-3">
          <div class="relative">
            <input
              v-model="queryText"
              type="text"
              placeholder="Search users..."
              class="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              @input="handleFilterUser"
            />
            <CpIcon
              name="search"
              iconset="bytesize"
              class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            />
          </div>
          <button
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
            @click="isCreateUserModal = true"
          >
            <CpIcon name="plus" iconset="uil" class="h-5 w-5 mr-1" />
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
            <tr v-for="(user, id) in listUser" :key="id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img
                      class="h-10 w-10 rounded-full"
                      src="https://img.freepik.com/premium-vector/avatar-profile-picture-icon-blue-background-flat-design-style-resources-graphic-element-design_991720-653.jpg?semt=ais_hybrid&w=740"
                      alt=""
                    />
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
                <span
                  :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
                    user.status === 'active' ? 'green' : 'red'
                  }-100 text-${user.status === 'active' ? 'green' : 'red'}-600`"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex space-x-2">
                  <button
                    @click="handleUpdate(user.id)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    <CpIcon name="edit" iconset="lucide" class="h-5 w-5" />
                  </button>
                  <button
                    @click="handleDelete(user.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    <CpIcon
                      name="delete-outline-rounded"
                      iconset="material-symbols"
                      class="h-5 w-5"
                    />
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
          Showing <span class="font-medium">{{ totalPage.from }}</span> to
          <span class="font-medium">{{ totalPage.to }}</span> of
          <span class="font-medium">{{ totalPage.total }}</span> users
        </div>
        <div class="flex space-x-2">
          <button
            :disabled="!pagination.prev_page_url"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            :class="[
              !pagination.prev_page_url
                ? 'bg-gray-100 cursor-not-allowed'
                : 'bg-white cursor-pointer',
            ]"
            @click="fetchListUser(pagination.prev_page_url)"
          >
            Previous
          </button>
          <button
            :disabled="!pagination.next_page_url"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            :class="[
              !pagination.next_page_url
                ? 'bg-gray-100 cursor-not-allowed'
                : 'bg-white cursor-pointer',
            ]"
            @click="fetchListUser(pagination.next_page_url)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- modal -->
  <UserCreate v-model="isCreateUserModal" @submit="fetchListUser" />
  <UserUpdate
    v-model="isUpdateUserModal"
    :data-source="selectUpdate"
    @submit="fetchListUser"
  />

  <UserDeleteModal
    v-model="isDeleteUserModal"
    :user-id="selectDelete"
    @submit="fetchListUser"
  />
</template>
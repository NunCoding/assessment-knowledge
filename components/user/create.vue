<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
});

// emit
const emit = defineEmits(["update:modelValue", "submit"]);

// validate
const formData = ref({
  name: "",
  email: "",
  role: "Student",
  status: "Active",
});

// close modal
function closeModal() {
  emit("update:modelValue", false);
}
</script>
<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    v-if="props.modelValue"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Add New User</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <CpIcon name="close-duotone" iconset="iconamoon" />
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Name</label
          >
          <input
            v-model="formData.name"
            type="text"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter user name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            v-model="formData.email"
            type="email"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Role</label
          >
          <select
            v-model="formData.role"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>Student</option>
            <option>Instructor</option>
            <option>Admin</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Status</label
          >
          <select
            v-model="formData.status"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div class="mt-8 flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          @click="saveUser"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Add User
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
// emit
const auth = useAuthStore();

// property
const isOpen = ref(false);

// computed
const userProfile = computed(() => {
  const userState = localStorage.getItem("user");
  return userState ? JSON.parse(userState) : {};
});
</script>
<template>
  <div class="w-full max-w-md mx-auto">
    <div
      @click="isOpen = !isOpen"
      class="flex items-center justify-between cursor-pointer gap-2"
    >
      <div class="flex items-center">
        <span>Hi,</span>
        <span>{{ userProfile.name }}</span>
      </div>
      <img
        src="https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
        alt="logo"
        class="h-12 w-12 rounded-full object-cover"
      />
    </div>
    <div
      v-if="isOpen"
      class="mt-2 mr-24 fixed bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
    >
      <div class="p-5 flex flex-col items-center space-y-4">
        <div class="cursor-pointer flex justify-start items-center gap-2">
          <CpIcon name="profile" iconset="gg" size="25" />
          <span>Profile</span>
        </div>
        <div
          class="cursor-pointer flex justify-start items-center gap-2 text-red-500"
          @click="auth.logout()"
        >
          <CpIcon name="logout" iconset="tabler" size="25" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  </div>
</template>
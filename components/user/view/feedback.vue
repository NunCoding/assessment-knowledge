<script setup>
// state
const listFeedback = ref([]);
const isLoading = ref(false);

// onMounted
onMounted(() => {
  fetchFeedback();
});
// function
function fetchFeedback() {
  isLoading.value = true;
  useFetchApi(api.listFeedback, {
    method: "get",
  })
    .then(({ data }) => {
      listFeedback.value = data;
    })
    .catch((error) => {
      console.error("Error fetching feedback:", error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="feedback in listFeedback" :key="feedback.id">
      <div class="p-5 ring-1 ring-gray-200 rounded-lg shadow-md w-full">
        <div>
          <CpIcon
            name="quote"
            iconset="lucide"
            size="35"
            class="text-indigo-200"
          />
        </div>
        <div class="flex flex-nowrap justify-star gap-3 items-center mt-3">
          <CpIcon
            v-for="star in 5"
            :key="star"
            name="star-outline"
            iconset="material-symbols-light"
            size="30"
            :class="
              star <= feedback.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            "
          />
          <p class="text-md text-gray-600">{{ feedback.rating }}.0</p>
        </div>
        <div
          class="mt-3 text-gray-700 mb-6 text-lg leading-relaxed line-clamp-4"
        >
          {{ feedback.comment }}
        </div>
        <div class="flex items-center gap-4 mt-4">
          <div
            class="ring-1 ring-gray-200 h-20 w-20 flex justify-center items-center rounded-full overflow-hidden"
          >
            <CpIcon
              name="user"
              iconset="tdesign"
              size="45"
              class="text-gray-400"
            />
          </div>
          <div>
            <h1 class="text-2xl font-semibold">{{ feedback?.user?.name }}</h1>
            <p class="text-lg text-gray-500 mt-1">
              {{ feedback?.submitted_at }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
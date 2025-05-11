<script setup>
const { copied, copy } = useClipboard();
definePageMeta({
  layout: "dashboard-sidemenu",
  middleware: ["auth"],
});

// emit
const { t } = useI18n();

// property
const isLoading = ref(false);
const isCreateAssessmentModal = ref(false);
const isShareLinkModal = ref(false);
const listAssessment = ref([]);
const dataList = ref({});

// onMounted
onMounted(async () => {
  await fetchAssessments();
});

// functions
async function fetchAssessments() {
  isLoading.value = true;
  await useFetchApi(api.assessment, {
    method: "get",
  })
    .then((pass) => {
      listAssessment.value = pass.data;
    })
    .catch((error) => {
      triggerAlert(error, "error");
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function handleShareLink(data) {
  dataList.value = data;
  isShareLinkModal.value = true;
}
</script>
<template>
  <!-- Assessments Management -->
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-medium text-gray-900">
        {{ t("assessment.title") }}
      </h3>
      <button
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
        @click="isCreateAssessmentModal = true"
      >
        <CpIcon name="plus" iconset="uil" class="h-5 w-5 mr-1" />
        {{ t("assessment.create") }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div
        v-for="(assessment, id) in listAssessment"
        :key="id"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <div class="h-40 bg-gray-200 relative">
          <img
            :src="assessment.image"
            alt=""
            class="w-full h-full object-cover"
          />
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
            <span>{{ assessment.total_taken }} Users</span>
            <button
              v-if="assessment.share_link"
              class="flex justify-center items-center bg-blue-600 text-white px-3 py-1 rounded-lg"
              @click="handleShareLink(assessment.share_link)"
            >
              <CpIcon
                name="link-filled"
                iconset="lsicon"
                class="mr-1"
                size="25"
              />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- create assessment -->
  <AssessmentCreate
    v-model="isCreateAssessmentModal"
    @submitted="fetchAssessments"
  />

  <!-- modal -->
  <!-- <CpModal v-model="isShareLinkModal" title="Copy" /> -->
  <AssessmentShareLinkModal
    v-model="isShareLinkModal"
    :data-source="dataList"
  />
</template>
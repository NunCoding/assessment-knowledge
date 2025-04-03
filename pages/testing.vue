<script setup>
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();

const message = ref(null);

// onMounted
onMounted(() => {
  fetchTesting();
});

// function
function fetchTesting() {
  useFetchApi("api/test", {
    method: "get",
  })
    .then((data) => {
      message.value = data;
      triggerAlert("fetch Successfully", "success", { position: "bottom" });
    })
    .catch((error) => {
      console.log(error);
    });
}

const showSuccess = () => {
  triggerAlert("Operation successful!", "success", { position: "bottom" });
};

const showError = () => {
  triggerAlert("Something went wrong!.", "error");
};
</script>
<template>
  <div>
    {{ message }}
    <button @click="showSuccess" class="p-2 bg-green-500 text-white rounded">
      Show Success
    </button>

    <button @click="showError" class="p-2 bg-red-500 text-white rounded ml-4">
      Show Error
    </button>
    <AlertModal
      v-if="showAlert"
      :message="alertMessage"
      :type="alertType"
      @close="showAlert = false"
    />
  </div>
</template>
<script setup>
import { useApiFetch } from "~/composables/useApiFetch";
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();

const message = ref(null);

// onMounted
onMounted(() => {
  fetchTesting();
});

// function
function fetchTesting() {
  useApiFetch("api/test", {
    method: "get",
  })
    .then((data) => {
      message.value = data;
    })
    .catch((error) => {
      console.log(error);
    });
}

const showSuccess = () => {
  triggerAlert("Operation successful!", "success");
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
<script setup>
const { triggerAlert, showAlert, alertMessage, alertType } = useAlert();
import { Plus } from "@element-plus/icons-vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
});

// Define emit
const emit = defineEmits(["update:modelValue", "submit"]);

// property
const listCategories = ref(null);
const upload = ref(null);
const fileSource = ref(null);

const formData = ref({
  title: "",
  description: "",
  categories_id: null,
  rating: 0,
  difficulty: "Intermediate",
  time_estimate: 15,
  image: null,
  tags: [],
});

// onMounted
onMounted(() => {
  fetchCategory();
});

// computed
const imageURL = computed(() => {
  if (fileSource.value) {
    return URL.createObjectURL(fileSource.value);
  }
});

// Close modal
function closeModal() {
  emit("update:modelValue", false);
  resetForm();
}

function resetForm() {
  formData.value = {
    title: "",
    description: "",
    categories_id: null,
    rating: 0,
    difficulty: "Intermediate",
    time_estimate: 15,
    image: null,
    tags: [],
  };
  fileSource.value = null;
  upload.value.clearFiles();
}
// Fetch categories

function fetchCategory() {
  useFetchApi(api.category, {
    method: "get",
  })
    .then((pass) => {
      listCategories.value = pass;
    })
    .catch((error) => {
      triggerAlert(`Error ${error}`, "error");
    });
}

// Submit form
async function saveAssessment() {
  if (fileSource.value) {
    console.log("work");
    await handleUpload();
  }
}

async function handleUpload() {
  if (!fileSource.value) return;

  const uploadData = new FormData();
  uploadData.append("file", fileSource.value);

  try {
    const response = await useFetchApi(api.upload, {
      method: "POST",
      body: uploadData,
    });
    formData.value.image = response.url;
    if (formData.value.image) {
      await handleSubmit();
    }
  } catch (error) {
    triggerAlert(`Error uploading image: ${error}`, "error");
    throw error;
  }
}

async function handleSubmit() {
  console.log("submit", formData.value);
  useFetchApi(api.assessment, {
    method: "post",
    body: formData.value,
  })
    .then(() => {
      closeModal();
      triggerAlert("The assessment has been created Successfully", "success");
    })
    .catch((error) => {
      if (error) {
        triggerAlert("Something Error", "error");
      }
    });
}

// Handle adding tags
const newTag = ref("");

function addTag() {
  if (newTag.value.trim() && !formData.value.tags.includes(newTag.value)) {
    formData.value.tags.push(newTag.value.trim());
    newTag.value = "";
  }
}

// Remove tag
function removeTag(index) {
  formData.value.tags.splice(index, 1);
}

const beforeUpload = async (file) => {
  const isImage = file.type.startsWith("image/");
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    triggerAlert("Only image files are allowed!", "error");
    return false;
  }
  if (!isLt2M) {
    triggerAlert("Image size must be less than 2MB!", "error");
    return false;
  }
  fileSource.value = file;
  return true;
};

const handleRemove = () => {
  fileSource.value = null;
  formData.value.image = null;
};
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    v-if="props.modelValue"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Create New Assessment</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Title</label
          >
          <input
            v-model="formData.title"
            type="text"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label
          >
          <textarea
            v-model="formData.description"
            rows="3"
            class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Category</label
            >
            <select
              v-model="formData.categories_id"
              class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option
                v-for="item in listCategories"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Time Estimate (minutes)</label
            >
            <input
              v-model="formData.time_estimate"
              type="number"
              min="1"
              class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Difficulty</label
            >
            <select
              v-model="formData.difficulty"
              class="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <!-- Tags Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div class="flex gap-2">
            <input
              v-model="newTag"
              @keyup.enter="addTag"
              type="text"
              class="flex-1 rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a tag and press Enter"
            />
            <button
              @click="addTag"
              class="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="(tag, index) in formData.tags"
              :key="index"
              class="px-2 py-1 bg-gray-200 text-sm rounded-md flex items-center gap-1"
            >
              {{ tag }}
              <button
                @click="removeTag(index)"
                class="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </span>
          </div>
        </div>
        <div class="w-32">
          <el-upload
            v-if="!imageURL"
            ref="upload"
            list-type="picture"
            accept="image/*"
            drag
            action="#"
            :http-request="() => {}"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :show-file-list="false"
          >
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
          <div v-if="imageURL">
            <div :class="['relative cursor-pointer w-full p-0.5']">
              <img
                :src="imageURL"
                class="object-fit: cover; h-28 w-full rounded"
              />
              <!-- button hover -->
              <div class="absolute top-3 right-3">
                <div class="flex justify-center items-center">
                  <CpIcon
                    name="trash"
                    class="cursor-pointer h-8 w-8 flex justify-center items-center bg-gray-100 rounded-full text-red-600"
                    @click="handleRemove(media)"
                  />
                </div>
              </div>
            </div>
          </div>
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
          @click="saveAssessment"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Create Assessment
        </button>
      </div>
    </div>
  </div>
  <!-- alert -->
  <AlertModal
    v-if="showAlert"
    :message="alertMessage"
    :type="alertType"
    @close="showAlert = false"
  />
</template>

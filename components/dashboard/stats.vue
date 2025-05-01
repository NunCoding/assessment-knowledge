<script setup>
// props
const props = defineProps({
  label: { type: String, default: "" },
  value: { type: [Number, String], default: 0 },
  icon: { type: String, default: "" },
  iconset: { type: String, default: "heroicons" },
  trend: { type: Number, default: 0 },
  class: { type: String, default: "" },
});
</script>
<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">{{ props.label }}</p>
        <p class="text-3xl font-bold text-gray-900">{{ props.value }}</p>
      </div>
      <div
        class="p-3 justify-center items-center rounded-full px-4 bg-indigo-50"
      >
        <CpIcon
          :name="props.icon"
          :iconset="props.iconset"
          :class="props.class ?? 'text-blue-600'"
        />
      </div>
    </div>
    <div class="mt-4 flex items-center">
      <span
        :class="`text-${
          props.trend > 0 ? 'green' : 'red'
        }-500 text-sm font-medium flex items-center`"
      >
        <CpIcon
          v-if="props.trend > 0"
          name="trend-up-light"
          iconset="ph"
          class="h-4 w-4 mr-1"
        />
        <CpIcon
          v-else
          name="trend-down-light"
          iconset="ph"
          class="h-4 w-4 mr-1 text-red-500"
        />
        {{ Math.abs(props.trend) }}%
      </span>
      <span class="text-gray-500 text-sm ml-2">from last month</span>
    </div>
  </div>
</template>
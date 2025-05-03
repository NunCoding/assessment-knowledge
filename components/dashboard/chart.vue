<script setup>
const prop = defineProps({
  dataSource: {
    type: [Array, Object],
    default: () => [],
  },
  loading: { type: [Boolean], default: false },
});

// property
const refBarChartProfit = ref(null);
const renderer = ref("svg");
const initOptions = computed(() => {
  return {
    height: 350,
    width: 700,
    renderer: renderer.value,
  };
});
provide(INIT_OPTIONS_KEY, initOptions);
const optionSource = ref({
  color: ["#059669"],
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Completed Time"],
  },

  yAxis: [
    {
      type: "value",
    },
  ],
});

watch(
  () => prop.dataSource,
  (newValue) => {
    if (newValue) {
      const labels = useGet(newValue, "labels");
      const dataSet = useGet(newValue, "dataset");

      refBarChartProfit.value.setOption({
        ...optionSource.value,
        xAxis: [
          {
            type: "category",
            data: labels,
          },
        ],
        series: [
          {
            name: "Completed",
            type: "bar",
            data: dataSet,
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
        ],
      });
    }
  }
);
</script>
<template>
  <div class="h-[20rem] mt-5 max-w-full">
    <VChart
      ref="refBarChartProfit"
      autoresize
      :manual-update="true"
      :loading-options="{ text: 'Loading...' }"
      :loading="loading"
    />
  </div>
</template>
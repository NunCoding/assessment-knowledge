<script setup>
const prop = defineProps({
  dataSource: {
    type: [Array, Object],
    default: () => [],
  },
  loading: {
    type: [Boolean],
    default: false,
  },
});

// chart refs and setup
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

// chart config
const optionSource = ref({
  color: ["#059690"],
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Register"],
  },
  yAxis: [
    {
      type: "value",
      minInterval: 1,
      interval: 1,
      splitNumber: 6,
      axisLabel: {
        formatter: (value) => Math.floor(value), // always integer
      },
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
            axisLabel: {
              interval: 0,
              rotate: 0,
            },
          },
        ],
        series: [
          {
            name: "Register",
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

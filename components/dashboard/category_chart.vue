<script setup>
const prop = defineProps({
  dataSource: {
    type: Object,
    default: () => ({
      labels: [],
      series: [],
    }),
  },
  loading: { type: Boolean, default: false },
});

const refBarChartProfit = ref(null);
const renderer = ref("svg");

const initOptions = computed(() => {
  return {
    height: 320,
    width: 700,
    renderer: renderer.value,
  };
});

provide(INIT_OPTIONS_KEY, initOptions);

const optionSource = ref({
  //   color: ["#059669", "#2563eb", "#10b981"],
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
  },
  legend: {
    data: [],
  },
  yAxis: [{ type: "value" }],
});

// Utility: generate N distinct HSL-based colors
function generateColors(count) {
  return Array.from({ length: count }, (_, i) => {
    const hue = Math.round((360 * i) / count);
    return `hsl(${hue}, 70%, 50%)`;
  });
}

// watch
watch(
  () => prop.dataSource,
  (newValue) => {
    if (newValue?.labels && newValue?.series) {
      const { labels, series } = newValue;
      const legendNames = series.map((s) => s.name);
      const dynamicColors = generateColors(series.length);
      refBarChartProfit.value.setOption({
        ...optionSource.value,
        color: dynamicColors,
        legend: {
          data: legendNames,
        },
        xAxis: [
          {
            type: "category",
            data: labels,
            axisLabel: {
              interval: 0,
              rotate: window.innerWidth < 640 ? 30 : 0,
            },
          },
        ],
        series,
      });
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="w-full min-h-[20rem] mt-5">
    <VChart
      ref="refBarChartProfit"
      autoresize
      :manual-update="true"
      :loading-options="{ text: 'Loading...' }"
      :loading="loading"
    />
  </div>
</template>

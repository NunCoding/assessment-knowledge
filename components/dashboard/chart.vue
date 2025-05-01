<script setup>
const renderer = ref("svg");
const initOptions = computed(() => {
  return {
    height: 350,
    width: 750,
    renderer: renderer.value,
  };
});
provide(INIT_OPTIONS_KEY, initOptions);

const option = {
  legend: {},
  tooltip: {},
  dataset: {
    dimensions: ["product", "2015", "2016", "2017"],
    source: [
      { product: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
      { product: "Milk Tea", 2015: 83.1, 2016: 73.4, 2017: 55.1 },
      { product: "Cheese Cocoa", 2015: 86.4, 2016: 65.2, 2017: 82.5 },
      { product: "Walnut Brownie", 2015: 72.4, 2016: 53.9, 2017: 39.1 },
    ],
  },
  xAxis: { type: "category" },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
};

const chartRef = ref(null);

onMounted(() => {
  //   const chartInstance = chartRef.value.getEchartsInstance();
  chartRef.value.setOption(option);
});

function onChartReady(chartInstance) {
  chartInstance.setOption(option);
}
</script>

<template>
  <div class="h-[20rem] w-full mt-10">
    <VChart
      ref="chartRef"
      autoresize
      :manual-update="true"
      @ready="onChartReady"
    />
  </div>
</template>

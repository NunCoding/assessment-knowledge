<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  iconset: {
    type: String,
    default: "lucide",
  },
  size: {
    type: String,
    default: "20",
  },
  color: {
    type: String,
    default: "text-gray-600",
  },
});
</script>
<template>
  <div>
    <Icon
      :name="`${props.iconset}:${props.name}`"
      :size="props.size"
      :width="`${props.size}px`"
      :height="`${props.size}px`"
      :color="props.color"
    />
  </div>
</template>
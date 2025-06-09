<script setup lang="ts">
defineOptions({
  name: "WaterIcon"
});

defineProps({
  width: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="water-icon" :style="{ width: width, height: height }">
    <img src="/assets/icons/water.svg" alt="tank"/>
  </div>
</template>

<style scoped>
.water-icon {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
}
.water-icon>img{
  width: 70%;
  height: 70%;
}
</style>
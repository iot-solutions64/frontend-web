<script setup lang="ts">
defineOptions({
  name: "WaterDropIcon"
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
  <div class="water-drop-icon" :style="{ width: width, height: height }">
    <img src="/assets/icons/water_drop.svg" alt="Humedad"/>
  </div>
</template>

<style scoped>
.water-drop-icon {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
}
.water-drop-icon>img{
  width: 70%;
  height: 70%;
}
</style>
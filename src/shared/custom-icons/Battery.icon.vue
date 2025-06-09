<script setup lang="ts">
defineOptions({
  name: "BatteryIcon"
});
defineProps({
  width: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="battery-icon"
      :style="{ width: width, height: height, backgroundColor: backgroundColor }">
    <img src="/assets/icons/battery.svg" alt="battery"/>
  </div>
</template>

<style scoped>
.battery-icon {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.battery-icon>img{
  width: 70%;
  height: 70%;
}
</style>
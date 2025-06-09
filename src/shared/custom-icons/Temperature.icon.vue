<script setup lang="ts">
defineOptions({
  name: "TemperatureIcon"
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
  <div class="thermostat-icon" :style="{ width: width, height: height }">
    <img src="/assets/icons/thermostat.svg" alt="Temperatura"/>
  </div>
</template>

<style scoped>
.thermostat-icon {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E1AF43;
}
.thermostat-icon>img{
  width: 70%;
  height: 70%;
}
</style>
<script setup>
defineOptions({
  name: "GearIcon"
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
});
</script>

<template>
  <div class="cog-icon" :style="{width: width, height: height}">
    <img src="/assets/icons/cog.svg" alt="cog"/>
  </div>
</template>

<style scoped>
.cog-icon {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color-dark);
}
.cog-icon>img{
  width: 70%;
  height: 70%;
}
</style>
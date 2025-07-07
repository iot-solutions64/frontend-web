<template>
  <pv-button
      icon="pi pi-plus"
      class="fab"
      @click="$emit('click')"
      rounded
      aria-label="Agregar"
      style="width: 3.5rem; height: 3.5rem;"
  />
</template>

<script setup>
  defineEmits(['click']);
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--primary-color);
  color: var(--text-color-inverted);
  z-index: 1000;
}
</style>
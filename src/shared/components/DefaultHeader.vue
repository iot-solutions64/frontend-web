<script setup lang="ts">
import router from "../router/index.js";
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false,
    default: false
  },
  showBackButton: {
    type: Boolean,
    required: false,
    default: false
  }
});
</script>

<template>
  <header class="component-header">
    <pv-button v-if="showBackButton" @click="router.back()" aria-label="Volver"
               icon="pi pi-arrow-left" severity="secondary" raised/>
    <div v-else></div> <!--Conditional alignment helper-->
    <h3 class="title">{{title}}</h3>
    <div></div> <!--Alignment helper-->
  </header>
  <p class="subtitle" v-if="subtitle">{{subtitle}}</p>
</template>

<style scoped>
.component-header{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 2rem 0 2rem;
  margin: 2rem 0 2rem 0;
}

.title{
  margin: 0;
  text-align: center;
}

.subtitle{
  text-align: center;
}
</style>
<script setup>
 import NavbarComponent from './shared/pages/Navbar.component.vue'
 import store from "./shared/store/store.js";
</script>

<template>
  <NavbarComponent v-if="store.getters.isAuthenticated"/>
  <router-view/>
</template>

<style scoped>
</style>

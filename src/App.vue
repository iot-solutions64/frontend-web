<script setup>
 import NavbarComponent from './shared/components/Navbar.component.vue'
 import store from "./security/services/authentication.store.old.js";
</script>

<template>
  <NavbarComponent v-if="store.getters.isAuthenticated"/>
  <router-view/>
</template>

<style scoped>
</style>

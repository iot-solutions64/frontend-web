<script setup>
import NavbarComponent from './shared/components/Navbar.component.vue'
import {useAuthenticationStore} from "@/security/services/authentication.store.ts";

const authenticationStore = useAuthenticationStore();
</script>

<template>
  <NavbarComponent v-if="authenticationStore.signedIn"/>
  <router-view/>
</template>

<style scoped>
</style>

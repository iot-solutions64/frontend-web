<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useAuthenticationStore} from "@/security/services/authentication.store.js";

const router = useRouter()
const menu = ref()
const authenticationStore = useAuthenticationStore();

const items = [
  {
    label: 'Cultivos',
    command: () => router.push('/crops')
  },
  {
    label: 'Gestión de agua',
    command: () => router.push('/water')
  },
  {
    label: 'Sistemas',
    command: () => router.push('/systems')
  },
  {
    label: 'Salir',
    icon: 'pi pi-sign-out',
    command: () => { logout() }
  }
]

const toggle = (event) => {
  menu.value.toggle(event);
};

const logout = () => {
  authenticationStore.signOut();
}

</script>

<template>
  <nav id="navbar">
    <div class="nav-logo">
      <img src="/assets/images/hydrosmart-logo.png" width="50px" height="50px" alt="HydroSmart Logo"/>
      <h5>HydroSmart</h5>
    </div>
    <div class="desktop-menu">
      <div class="nav-links">
        <router-link to="/crops">Cultivos</router-link>
        <router-link to="/water">Gestión de agua</router-link>
        <router-link to="/systems">Sistemas</router-link>
      </div>
      <pv-button text label="Salir" aria-label="log out" @click="logout"
                 icon="pi pi-sign-out" iconPos="right"/>
    </div>
    <div class="mobile-menu">
      <pv-button icon="pi pi-bars" text @click="toggle"/>
      <pv-menu ref="menu" id="overlay_menu" :model="items" :popup="true"/>
    </div>
  </nav>
</template>

<style scoped>
nav{
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 1rem;
  color: var(--text-color-inverted);
  background-color: var(--primary-color-dark);
}

.nav-logo {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.nav-logo>img {
  margin: 10px;
}

.desktop-menu {
  height: 100%;
  display: flex;
  align-items: center;
}

.mobile-menu {
  display: none;
}

.nav-links {
  height: 100%;
  display: flex;
  margin-right: 50px;
  list-style: none;
}

.nav-links>a {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem 0 1rem;
  font-size: 20px;
  text-decoration: none;
  color: var(--text-color-inverted);
  transition: background-color 0.3s ease;
}

.nav-links>a:hover {
  background-color: var(--primary-color-darker);
}

.p-button{
  font-size: 20px;
  background-color: transparent;
  color: var(--text-color-inverted);
  transition: background-color 0.2s ease;
}

.p-button:hover {
  background-color: red !important;
  color: var(--text-color-inverted) !important;
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }
  .mobile-menu {
    display: block;
  }

  .p-button:hover{
    background-color: var(--primary-color-darker) !important;
  }
}

</style>
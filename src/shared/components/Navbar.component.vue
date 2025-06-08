<script setup>
import store from '../store/store.js'
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()
const menu = ref()

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
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    command: () => { store.dispatch('logout').then(
      () => { router.push('/login') }
    ) }
  }
]

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <nav id="navbar">
    <div class="nav-logo">
      <img src="/assets/images/hydrosmart-logo.png" width="50px" height="50px" alt="HydroSmart Logo"/>
      <h5>HydroSmart</h5>
    </div>
    <div class="desktop-menu">
      <ul class="nav-links">
        <li><router-link to="/crops">Cultivos</router-link></li>
        <li><router-link to="/water">Gestión de agua</router-link></li>
        <li><router-link to="/systems">Sistemas</router-link></li>
      </ul>
      <pv-button @click="store.dispatch('logout')"
                 label="Salir"
                 text
                 icon="pi pi-sign-out"
                 iconPos="right"
                 aria-label="log out"/>
    </div>
    <div class="mobile-menu">
      <pv-button icon="pi pi-bars"
                 text
                 style="color: white; font-size: 20px;"
                 @click="toggle"/>
      <pv-menu ref="menu"
               id="overlay_menu"
               :model="items"
               :popup="true"
      />
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
  width: 30%;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.nav-logo>img {
  margin: 10px;
}

.desktop-menu {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
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

.nav-links>li {
  height: 100%;
  display: flex;
  align-items: center;
  transition: background-color 0.4s ease;
}

.nav-links>li>a {
  font-size: 24px;
  padding: 0 1rem 0 1rem;
  text-decoration: none;
  color: var(--background-color);
}

.nav-links li:hover {
  background-color: var(--primary-color-darker);
}

.p-button{
  font-size: 20px;
  background-color: transparent;
  color: white;
  transition: background-color 0.4s ease;
}

.p-button:hover {
  background-color: red !important;
  color: white !important;
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }
  .mobile-menu {
    display: block;
  }
}

</style>
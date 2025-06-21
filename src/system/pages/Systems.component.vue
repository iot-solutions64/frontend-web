<script setup lang="ts">
import {onMounted, ref} from "vue";
import {System} from "../models/system.entity";
import {Subsystem} from "../models/subsystem.entity";
import router from "../../shared/router";
import AddButton from "../../shared/components/AddButton.component.vue";
import DefaultHeader from "../../shared/components/DefaultHeader.component.vue";
import SystemCard from "../components/SystemCard.component.vue";

const systems = ref([]);
onMounted(() => {
  // TODO: Fetch systems from the API
  systems.value = [
      new System(
          1,
          "Sistema de zanahorias",
          1,
          70,
          [
              new Subsystem(1, "Regado automatico", null, "Normal", true),
              new Subsystem(2, "Temperatura", 22, "Normal", true),
              new Subsystem(3, "Humedad", 50, "Normal", false),
              new Subsystem(4, "Cantidad de agua", 1000, "Insuficiente", false),
          ]
      ),
      new System(
          2,
          "Sistema de papas",
          2,
          40,
          [
              new Subsystem(1, "Regado automatico", null, "Normal", true),
              new Subsystem(2, "Temperatura", 19, "Normal", true),
              new Subsystem(3, "Humedad", 71, "Normal", true),
              new Subsystem(4, "Cantidad de agua", 2000, "Normal", true),
          ]
      )
  ]
});

function goToAddSystem() {
  router.push(`/systems/add`);
}
</script>

<template>
  <DefaultHeader title="Sistemas"/>
  <SystemCard
      v-for="(system, index) in systems"
      :key="index"
      :system="system"
  />
  <AddButton @click="goToAddSystem"/>
</template>

<style scoped>
</style>
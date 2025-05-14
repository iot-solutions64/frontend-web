<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from "../../shared/router/index.js";
import {System} from "../models/system.entity";
import {Subsystem} from "../models/subsystem.entity";

const loading = ref(true);
const systems = ref<any[]>([]);

onMounted(() => {
  // TODO: Implement the logic to fetch systems from a service
  setTimeout(() => {
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
      )
    ];
    loading.value = false;
  }, 0);
});

function addSystem(systemId: number) {
  // TODO: Implement the logic to add the system
  router.push(`/systems/${systemId}`);
}
</script>

<template>
  <div class="flex align-items-center m-3 mb-6">
    <pv-button icon="pi pi-arrow-left"
               @click="router.back()"
               aria-label="Volver"
               class="mr-2"/>
    <h3 class="m-0 text-center flex-grow-1">Añadir sistema</h3>
  </div>

  <div class="text-center mt-5">
    <h5 v-if="loading">Se están buscando sistemas nuevos para agregar...</h5>
    <div v-else>
      <h5 v-if="systems.length > 0">Se ha encontrado {{ systems.length }} sistema(s).</h5>
      <h5 v-else>No se ha encontrado ningún sistema.</h5>

      <div v-if="systems.length > 0" class="flex flex-column gap-3 align-items-center mt-4">
        <pv-card
            v-for="system in systems"
            :key="system.id"
            class="w-25rem"
        >
          <template #content>
            <div class="flex flex-row justify-content-between align-items-center">
              <div id="cog-icon" class="flex justify-content-center align-items-center">
                <img src="/assets/icons/cog.svg" alt="cog" style="width: 40px; height: 40px;"/>
              </div>
              <p class="font-medium">{{system.name}}</p>
              <pv-button icon="pi pi-plus" label="Agregar" @click="addSystem(system.id)" />
            </div>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
#cog-icon {
  width: 80px;
  height: 80px;
  background-color: var(--primary-color);
  border-radius: 50%;
}
</style>

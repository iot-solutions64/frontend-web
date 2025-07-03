<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from "../../shared/router";
import {System} from "../models/system.entity";
import {Subsystem} from "../models/subsystem.entity";
import DefaultHeader from "../../shared/components/DefaultHeader.component.vue";
import AddSystemCard from "../components/AddSystemCard.component.vue";

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
      ),
      new System(
          2,
          "Sistema de alverjas",
          2,
          90,
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
  <DefaultHeader title="Agregar Sistema" :show-back-button="true"/>
  <div class="text-center mt-5">
    <h5 v-if="loading">Se están buscando sistemas nuevos para agregar...</h5>
    <div v-else>
      <div v-if="systems.length > 0" class="flex flex-column gap-3 align-items-center mt-4">
        <h5>Se ha encontrado {{ systems.length }} sistema(s).</h5>
        <AddSystemCard
            v-for="(system, index) in systems"
            :key="index"
            :system="system"
        />
      </div>
      <div v-else class="flex flex-column gap-3 align-items-center mt-4">
        <h5>No se ha encontrado ningún sistema.</h5>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

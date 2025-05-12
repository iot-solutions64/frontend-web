<script setup lang="ts">
import {onMounted, ref} from "vue";
import {System} from "../models/system.entity";
import router from "../../shared/router/index.js";
import {Subsystem} from "../models/subsystem.entity";
import {Crop} from "../../soil/models/crop.entity";

const systemId = ref(0);
const system = ref(new System());
const crop = ref(new Crop());

onMounted(() => {
  systemId.value = Number(router.currentRoute.value.params.id);
  // TODO: Implement the logic to fetch system data from a service
  system.value = new System(
    systemId.value,
    1,
    70,
    [
      new Subsystem(1, "Regado automatico", null, "Normal", true),
      new Subsystem(2, "Temperatura", 22, "Normal", true),
      new Subsystem(3, "Humedad", 50, "Normal", false),
      new Subsystem(4, "Cantidad de agua", 1000, "Insuficiente", false),
    ]
  );
  // TODO: Implement the logic to fetch crop data from a service
  crop.value = new Crop(1, 'Recinto A', 1000, true, 1);
});
</script>

<template>
  <div class="flex align-items-center m-3 mb-6">
    <pv-button icon="pi pi-arrow-left"
               @click="router.back()"
               aria-label="Volver"
               class="mr-2"/>
    <h3 class="m-0 text-center flex-grow-1">Sistema de {{crop.name}}</h3>
  </div>
</template>

<style scoped>

</style>
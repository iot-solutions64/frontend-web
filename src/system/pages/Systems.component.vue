<script setup lang="ts">
import {onMounted, ref} from "vue";
import {System} from "../models/system.entity";
import {Subsystem} from "../models/subsystem.entity";
import {Crop} from "../../soil/models/crop.entity";
import router from "../../shared/router/index.js";

const systems = ref([]);
const crops = ref([]);

onMounted(() => {
  // TODO: Fetch systems from the API
  systems.value = [
      new System(
          1,
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
  // TODO: Get the name of the crop from the API
  crops.value = [
    new Crop(1, 'Recinto A', 1000, true, 1),
    new Crop(2, 'Recinto B', 800, false, 1),
  ];
});

function goToSystem(id: number) {
  router.push(`/systems/${id}`);
}

function getBatteryColor(percentage: number) {
  if (percentage >= 70) return '#27AE60';
  if (percentage >= 40) return '#F1C40F';
  if (percentage >= 20) return '#E67E22';
  return '#E74C3C';
}
</script>

<template>
  <h2 class="text-center mb-2">Sistemas</h2>
  <div v-for="(system, index) in systems" :key="index" class="text-center flex flex-column">
    <h4 class="m-5">Sistema de {{ crops.find(c => c.id === system.cropId)?.name }}</h4>
    <div class="flex flex-row flex-wrap gap-5 justify-content-center align-items-center ">
      <table class="w-3" style="border-collapse: collapse;">
        <thead>
        <tr>
          <th class="table-header">Sistema</th>
          <th class="table-header">Lectura</th>
          <th class="table-header">Estado</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(sub, idx) in system.subsystems" :key="idx">
          <td class="p-2">{{ sub.name }}</td>
          <td class="p-2">{{ sub.value ?? 'No aplica' }}</td>
          <td class="p-2">{{ sub.status }}</td>
        </tr>
        </tbody>
      </table>
      <div class="flex flex-column">
        <pv-card class="mb-3">
          <template #content>
            <div class="flex flex-row gap-1 xl:gap-5 justify-content-around align-items-center">
              <div id="battery-icon" class="flex justify-content-center align-items-center"
                   :style="{backgroundColor: getBatteryColor(system.batteryLevel)}">
                <img src="/assets/icons/battery.svg" alt="battery" style="width: 40px; height: 40px;"/>
              </div>
              <div id="battery-data">
                <p>Batería</p>
                <p>{{ system.batteryLevel }}%</p>
              </div>
            </div>
          </template>
        </pv-card>
        <pv-button
          label="Ver sistema"
          icon="pi pi-search"
          class="mb-1 w-10rem mx-auto"
          @click="goToSystem(system.id)"/>
      </div>
    </div>

  </div>
</template>

<style scoped>
.table-header {
  padding: 8px;
  border-bottom: 2px solid rgba(85, 85, 85, 0.11);
}

#battery-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

#battery-data p {
  margin: 0;
  text-align: center;
}

#battery-data p:nth-child(2) {
  font-size: 25px;
  font-weight: 500;
}
</style>
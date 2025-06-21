<script setup lang="ts">
import {System} from "../models/system.entity.js";
import router from "../../shared/router";
import BatteryIcon from "../../shared/custom-icons/Battery.icon.vue";

defineOptions({
  name: "SystemCard"
});

defineProps({
  system: System
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
  <div class="text-center flex flex-column">
    <h4 class="m-5">{{ system.name }}</h4>
    <div class="flex flex-row flex-wrap gap-5 justify-content-center align-items-center">
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
              <BatteryIcon :background-color="getBatteryColor(system.batteryLevel)" height="60px" width="60px"/>
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
            @click="goToSystem(system.id)"
        />
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
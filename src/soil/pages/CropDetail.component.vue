<script setup lang="ts">
import router from "../../shared/router/index.js";
import { onMounted, ref } from "vue";
import { Temperature } from "../models/temperature.entity";
import { Humidity } from "../models/humidity.entity";
import {HUMIDITY_SUGGESTIONS} from "../constants/humidity-suggestions.constant";
import {TEMPERATURE_SUGGESTIONS} from "../constants/temperature-suggestions.constant";
import {System} from "../../system/models/system.entity";

const cropId = ref(0);
const temperature = ref(new Temperature());
const humidity = ref(new Humidity());

onMounted(() => {
  cropId.value = Number(router.currentRoute.value.params.id);
  // TODO: Implement the logic to fetch temperature & humidity data from a service
  humidity.value = new Humidity(1, 70, 60, 30, "FAVORABLE");
  temperature.value = new Temperature(1, 65, 60, 30, "UNFAVORABLE_OVER");
});

function goToTemperatureActions(temperatureId: number) {
  router.push(`/temperature/${temperatureId}/actions`);
}

function goToHumidityActions(humidityId: number) {
  router.push(`/humidity/${humidityId}/actions`);
}

function goToShortHistory() {
  router.push(`/crops/${cropId.value}/short-history`);
}

function goToCompleteHistory() {
  router.push(`/crops/${cropId.value}/history`);
}

function goToCropSystem() {
  // TODO: Implement the logic to fetch system data from a service
  const system = new System(1, "Sistema de zanahorias", 1, 70, []);
  router.push(`/systems/${system.id}`);
}
</script>

<template>
  <div class="flex align-items-center m-3 mb-6">
    <pv-button icon="pi pi-arrow-left"
               @click="router.back()"
               aria-label="Volver"
               class="mr-2"/>
    <h3 class="m-0 text-center flex-grow-1">Detalles de cultivo</h3>
  </div>

  <h4 class="text-center">Información de los sensores</h4>
  <div class="w-10 lg:w-8 mx-auto p-3 border-round-xl shadow-2 surface-card overflow-x-scroll">
    <table class="w-full text-center">
      <thead>
      <tr>
        <th>Sensor</th>
        <th>Lectura</th>
        <th>Estado</th>
        <th>Recomendaciones</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <div id="water-drop-icon" class="flex flex-column justify-content-center align-items-center mx-auto mb-1">
            <img src="/assets/icons/water_drop.svg" alt="Humedad" style="width: 40px; height: 40px;" />
          </div>
          <p id="humidity-text">Humedad</p>
        </td>
        <td>{{ humidity.humidity }}%</td>
        <td v-tooltip="HUMIDITY_SUGGESTIONS[humidity.status]?.message">
          {{ HUMIDITY_SUGGESTIONS[humidity.status]?.title }}
        </td>
        <td>
          <pv-button
              label="Ver acciones"
              icon="pi pi-search"
              @click="goToHumidityActions(HUMIDITY_SUGGESTIONS[humidity.status]?.id)"
              :disabled="humidity.status === 'FAVORABLE'"
          />
        </td>
      </tr>
      <tr>
        <td>
          <div id="thermostat-icon" class="flex flex-column justify-content-center align-items-center mx-auto mb-1">
            <img src="/assets/icons/thermostat.svg" alt="Temperatura" style="width: 40px; height: 40px;" />
          </div>
          <p id="temperature-text">Temperatura</p>
        </td>
        <td>
          {{ temperature.temperature }}°</td>
        <td v-tooltip="TEMPERATURE_SUGGESTIONS[temperature.status]?.message">
          {{ TEMPERATURE_SUGGESTIONS[temperature.status]?.title }}
        </td>
        <td>
          <pv-button
              label="Ver acciones"
              icon="pi pi-search"
              @click="goToTemperatureActions(TEMPERATURE_SUGGESTIONS[temperature.status]?.id)"
              :disabled="temperature.status === 'FAVORABLE'"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <h4 class="text-center mt-5">Información del sistema</h4>
  <div class="grid w-10 md:w-8 mx-auto text-center mt-3">
    <div class="col-12 md:col-4">
      <pv-button
          label="Visualizar historial de cultivos"
          icon="pi pi-calendar"
          @click="goToShortHistory"
      />
      <div class="mt-1">Últimos 30 días</div>
    </div>
    <div class="col-12 md:col-4">
      <pv-button
          label="Visualizar historial completo"
          icon="pi pi-history"
          @click="goToCompleteHistory"
      />
      <div class="mt-1">Todo el tiempo</div>
    </div>
    <div class="col-12 md:col-4">
      <pv-button
          label="Visualizar sistema de cultivo"
          icon="pi pi-cog"
          @click="goToCropSystem"
      />
      <div class="mt-1">Datos del sistema</div>
    </div>
  </div>
</template>

<style scoped>
#water-drop-icon {
  width: 80px;
  height: 80px;
  background-color: var(--primary-color);
  border-radius: 50%;
}

#thermostat-icon {
  width: 80px;
  height: 80px;
  background-color: #E1AF43;
  border-radius: 50%;
}

th {
  font-size: 24px;
}

td {
  font-size: 20px;
}

#humidity-text{
  color: var(--primary-color);
}

#temperature-text{
  color: #E1AF43;
}
</style>

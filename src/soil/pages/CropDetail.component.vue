<script setup lang="ts">
import router from "../../shared/router/index.js";
import { onMounted, ref } from "vue";
import { Temperature } from "../models/temperature.entity";
import { Humidity } from "../models/humidity.entity";
import {HUMIDITY_SUGGESTIONS} from "../constants/humidity-suggestions.constant";
import {TEMPERATURE_SUGGESTIONS} from "../constants/temperature-suggestions.constant";
import {System} from "../../system/models/system.entity";
import DefaultHeader from "../../shared/components/DefaultHeader.vue";

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
  <DefaultHeader title="Detalle del Proyecto" :show-back-button="true"/>
  <main>
    <h4 class="title">Información de los sensores</h4>
    <article class="w-10 lg:w-8 mx-auto p-3 border-round-xl shadow-2 surface-card m-5">
      <table>
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
            <td class="sensor-column">
              <div id="water-drop-icon">
                <img src="/assets/icons/water_drop.svg" alt="Humedad" style="width: 40px; height: 40px;" />
              </div>
              <p id="humidity-text"><b>Humedad</b></p>
            </td>
            <td>
              <p>{{ humidity.humidity }}%</p>
            </td>
            <td v-tooltip="HUMIDITY_SUGGESTIONS[humidity.status]?.message">
              <p>{{ HUMIDITY_SUGGESTIONS[humidity.status]?.title }}</p>
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
            <td class="sensor-column">
              <div id="thermostat-icon">
                <img src="/assets/icons/thermostat.svg" alt="Temperatura" style="width: 40px; height: 40px;" />
              </div>
              <p id="temperature-text"><b>Temperatura</b></p>
            </td>
            <td>
              <p>{{ temperature.temperature }}°C</p>
            </td>
            <td v-tooltip="TEMPERATURE_SUGGESTIONS[temperature.status]?.message">
              <p>{{ TEMPERATURE_SUGGESTIONS[temperature.status]?.title }}</p>
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
    </article>
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
  </main>
</template>

<style scoped>
.component-header{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 2rem 0 2rem;
  margin: 2rem 0 2rem 0;
}

.title{
  margin: 0;
  text-align: center;
}

main {
  width: 100%;
}

table {
  width: 100%;
  text-align: center;
}

th{
  font-size: 22px;
}

.sensor-column{
  align-self: center;
  justify-self: center;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 1rem;
  text-align: left;
}

#water-drop-icon, #thermostat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#water-drop-icon {
  background-color: var(--primary-color);
}

#thermostat-icon {
  background-color: #E1AF43;
}

#humidity-text{
  color: var(--primary-color);
}

#temperature-text{
  color: #E1AF43;
}
</style>

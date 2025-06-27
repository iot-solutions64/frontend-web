<script setup lang="ts">
import router from "../../shared/router";
import { onMounted, ref } from "vue";
import {HUMIDITY_SUGGESTIONS} from "../constants/humidity-suggestions.constant";
import {TEMPERATURE_SUGGESTIONS} from "../constants/temperature-suggestions.constant";
import {System} from "@/system/models/system.entity";
import DefaultHeader from "../../shared/components/DefaultHeader.component.vue";
import WaterDropIcon from "@/shared/custom-icons/WaterDrop.icon.vue";
import TemperatureIcon from "@/shared/custom-icons/Temperature.icon.vue";
import {CropService} from "@/soil/services/crop.service";
import {HumidityResponse} from "@/soil/models/humidity.response.entity";
import {TemperatureResponse} from "@/soil/models/temperature.response.entity";

const cropId = ref(0);
const cropService = new CropService();
const temperature = ref(TemperatureResponse);
const humidity = ref(HumidityResponse);

onMounted(() => {
  cropId.value = Number(router.currentRoute.value.params.id);
  console.log(cropId.value);
  setCropData();
});

async function setCropData(){
  const foundCrop = await cropService.getDetailedCropById(cropId.value);
  humidity.value = new HumidityResponse(foundCrop.humidity, foundCrop.humidityMinThreshold, foundCrop.humidityMaxThreshold, foundCrop.humidityStatus);
  temperature.value = new TemperatureResponse(foundCrop.temperature, foundCrop.temperatureMinThreshold, foundCrop.temperatureMaxThreshold, foundCrop.temperatureStatus);
}

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
  <DefaultHeader title="Detalle del Cultivo" :show-back-button="true"/>
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
              <WaterDropIcon height="70px" width="70px"/>
              <p id="humidity-text"><b>Humedad</b></p>
            </td>
            <td>
              <p>{{ humidity.humidity }}%</p>
            </td>
            <td v-tooltip="HUMIDITY_SUGGESTIONS[humidity.humidityStatus]?.message">
              <p>{{ HUMIDITY_SUGGESTIONS[humidity.humidityStatus]?.title }}</p>
            </td>
            <td>
              <pv-button
                  label="Ver acciones"
                  icon="pi pi-search"
                  @click="goToHumidityActions(HUMIDITY_SUGGESTIONS[humidity.humidityStatus]?.id)"
                  :disabled="humidity.humidityStatus === 'FAVORABLE'"
              />
            </td>
          </tr>
          <tr>
            <td class="sensor-column">
              <TemperatureIcon height="70px" width="70px"/>
              <p id="temperature-text"><b>Temperatura</b></p>
            </td>
            <td>
              <p>{{ temperature.temperature }}°C</p>
            </td>
            <td v-tooltip="TEMPERATURE_SUGGESTIONS[temperature.temperatureStatus]?.message">
              <p>{{ TEMPERATURE_SUGGESTIONS[temperature.temperatureStatus]?.title }}</p>
            </td>
            <td>
              <pv-button
                  label="Ver acciones"
                  icon="pi pi-search"
                  @click="goToTemperatureActions(TEMPERATURE_SUGGESTIONS[temperature.temperatureStatus]?.id)"
                  :disabled="temperature.temperatureStatus === 'FAVORABLE'"
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
</style>

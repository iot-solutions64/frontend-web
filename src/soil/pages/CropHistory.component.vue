<script setup lang="ts">
import router from "../../shared/router";
import {computed, onMounted, ref} from "vue";
import {Record} from "../models/record.entity";
import {HUMIDITY_SUGGESTIONS} from "../constants/humidity-suggestions.constant";
import {TEMPERATURE_SUGGESTIONS} from "../constants/temperature-suggestions.constant";
import DefaultHeader from "../../shared/components/DefaultHeader.component.vue";

const cropId = ref(0);
const isShortHistory = ref(false);
const history = ref<Record[]>([]);
const limitedHistory = ref<Record[]>([]);
onMounted(() => {
  cropId.value = Number(router.currentRoute.value.params.id);
  isShortHistory.value = router.currentRoute.value.fullPath.includes('short');
  // TODO: Implement the logic to fetch history depending on the type (short or complete)
  history.value = [
    new Record(1, '24-04-2025', 67, 'FAVORABLE', 24, 'FAVORABLE'),
    new Record(2, '25-04-2025', 72, 'FAVORABLE', 30, 'FAVORABLE'),
    new Record(3, '26-04-2025', 65, 'FAVORABLE', 28, 'FAVORABLE'),
    new Record(4, '27-04-2025', 70, 'FAVORABLE', 26, 'FAVORABLE'),
    new Record(5, '28-04-2025', 82, 'SLIGHTLY_UNFAVORABLE_UNDER', 32, 'SLIGHTLY_UNFAVORABLE_UNDER'),
    new Record(6, '29-04-2025', 75, 'FAVORABLE', 29, 'FAVORABLE'),
    new Record(7, '30-04-2025', 80, 'SLIGHTLY_UNFAVORABLE_OVER', 31, 'SLIGHTLY_UNFAVORABLE_OVER'),
    new Record(8, '01-05-2025', 78, 'FAVORABLE', 27, 'FAVORABLE'),
    new Record(9, '02-05-2025', 74, 'FAVORABLE', 25, 'FAVORABLE'),
    new Record(10, '03-05-2025', 71, 'FAVORABLE', 25, 'FAVORABLE'),
    new Record(11, '04-05-2025', 69, 'FAVORABLE', 22, 'FAVORABLE'),
    new Record(12, '05-05-2025', 66, 'FAVORABLE', 26, 'FAVORABLE'),
    new Record(13, '06-05-2025', 64, 'FAVORABLE', 20, 'FAVORABLE'),
    new Record(14, '07-05-2025', 63, 'FAVORABLE', 23, 'FAVORABLE'),
    new Record(15, '08-05-2025', 62, 'FAVORABLE', 24, 'FAVORABLE'),
    new Record(16, '09-05-2025', 61, 'FAVORABLE', 28, 'FAVORABLE'),
    new Record(17, '10-05-2025', 60, 'FAVORABLE', 42, 'UNFAVORABLE_OVER'),
    new Record(18, '11-05-2025', 59, 'FAVORABLE', 24, 'FAVORABLE'),
    new Record(19, '12-05-2025', 58, 'FAVORABLE', 23, 'FAVORABLE'),
    new Record(20, '13-05-2025', 57, 'FAVORABLE', 20, 'FAVORABLE'),
    new Record(21, '14-05-2025', 56, 'FAVORABLE', 25, 'FAVORABLE'),
    new Record(22, '15-05-2025', 55, 'FAVORABLE', 25, 'FAVORABLE'),
    new Record(23, '16-05-2025', 54, 'FAVORABLE', 22, 'FAVORABLE'),
    new Record(24, '17-05-2025', 53, 'FAVORABLE', 26, 'FAVORABLE'),
    new Record(25, '18-05-2025', 52, 'FAVORABLE', 24, 'FAVORABLE'),
    new Record(26, '19-05-2025', 51, 'FAVORABLE', 23, 'FAVORABLE'),
    new Record(27, '20-05-2025', 50, 'FAVORABLE', 22, 'FAVORABLE'),
    new Record(28, '21-05-2025', 20, 'UNFAVORABLE_UNDER', 5, 'FREEZING'),
    new Record(29, '22-05-2025', 49, 'FAVORABLE', 21, 'FAVORABLE'),
    new Record(30, '23-05-2025', 48, 'FAVORABLE', 24, 'FAVORABLE'),
    new Record(31, '24-05-2025', 47, 'FAVORABLE', 23, 'FAVORABLE'),
    new Record(32, '25-05-2025', 46, 'FAVORABLE', 25, 'FAVORABLE'),
    new Record(33, '26-05-2025', 45, 'FAVORABLE', 24, 'FAVORABLE')
  ]
  // Limit the history to the last 30 records if isShortHistory is true and reverse the order to show the most recent first
  limitedHistory.value = (isShortHistory.value ? history.value.slice(-30) : history.value).slice().reverse();
});

function getHumidityTitle(key: string) {
  return key in HUMIDITY_SUGGESTIONS ? HUMIDITY_SUGGESTIONS[key as keyof typeof HUMIDITY_SUGGESTIONS].title : key;
}

function getTemperatureTitle(key: string) {
  return key in TEMPERATURE_SUGGESTIONS ? TEMPERATURE_SUGGESTIONS[key as keyof typeof TEMPERATURE_SUGGESTIONS].title : key;
}

const title = computed(() => isShortHistory ? 'Historial de cultivo' : 'Historial detallado de cultivo');
const subtitle = computed(() => isShortHistory ? 'Datos de los últimos 30 días (promedio diario)' : 'Datos completos (promedio diario)');
</script>

<template>
  <DefaultHeader
      :title="title"
      :subtitle="subtitle"
      :show-back-button="true"
  />
  <div class="flex justify-content-center mx-auto">
    <pv-data-table :value="limitedHistory" table-style="min-width: 60rem" style="overflow-x: auto">
      <pv-column field="date" header="Fecha" />
      <pv-column field="humidity" header="Humedad (%)"/>
      <pv-column field="humidityStatus" header="Estado de Humedad">
        <template #body="slotProps">
          {{ getHumidityTitle(slotProps.data.humidityStatus) }}
        </template>
      </pv-column>
      <pv-column field="temperature" header="Temperatura (°C)"/>
      <pv-column field="temperatureStatus" header="Estado de Temperatura">
        <template #body="slotProps">
          {{ getTemperatureTitle(slotProps.data.temperatureStatus) }}
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<style scoped>

</style>
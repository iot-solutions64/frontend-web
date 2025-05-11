<script setup lang="ts">
import {onMounted, ref} from 'vue';
import router from "../../shared/router/index.js";

const remainingLiters = ref(0);
const totalLiters = ref(0);
const resultMessage = ref('');
const monthlyHistory = ref([]);
const columns = ref([
  { field: 'mes', header: 'Mes' },
  { field: 'cantidad', header: 'Cantidad utilizada' },
]);

onMounted(() => {
  // TODO: Implement the logic to fetch items from a service
  remainingLiters.value = 15000;
  totalLiters.value = 20000;
  resultMessage.value = 'El agua restante es suficiente para el riego.';
  monthlyHistory.value = [
    { mes: 'Noviembre 2024', cantidad: 69000 },
    { mes: 'Diciembre 2024', cantidad: 125000 },
    { mes: 'Enero 2025', cantidad: 110250 },
    { mes: 'Febrero 2025', cantidad: 134500 },
    { mes: 'Marzo 2025', cantidad: 95000 },
  ];
});

function goToDetailedHistory() {
  router.push('/water/graph');
}

function goToTanks() {
  router.push('/tanks');
}
</script>

<template>
  <div>
    <h2 class="text-center mb-4">Gestión de agua</h2>
    <div class="flex flex-wrap justify-content-around">
      <div class="w-10 lg:w-5 m-0 md:m-5">
        <h3 class="text-center">Datos de tanques</h3>
        <pv-card class="max-w-40rem h-15rem mx-auto mb-5">
          <template #content>
            <div class="flex flex-row gap-1 xl:gap-5 justify-content-center align-items-center">
              <div id="water-drop-icon" class="flex justify-content-center align-items-center">
                <img src="/assets/icons/water_drop.svg" alt="water" style="width: 40px; height: 40px;"/>
              </div>
              <div id="water-data">
                <p>Total de agua restante</p>
                <p>{{ remainingLiters }} / {{ totalLiters }} L</p>
                <p v-if="resultMessage"><strong>Resultado:</strong> {{ resultMessage }}</p>
              </div>
            </div>
          </template>
          <template #footer>
            <p id="result-text" v-if="resultMessage"><strong>Resultado:</strong> {{ resultMessage }}</p>
          </template>
        </pv-card>
        <div class="flex justify-content-center">
          <pv-button class="w-15rem" label="Ver tanques" @click="goToTanks"/>
        </div>
      </div>
      <div class="w-10 lg:w-5 m-5">
        <h3 class="text-center">Historial mensual</h3>
        <pv-data-table :value="monthlyHistory" style="overflow-x: scroll" class="mb-5">
          <pv-column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header"></pv-column>
        </pv-data-table>
        <div class="flex justify-content-center">
          <pv-button class="w-15rem" label="Ver historial detallado" @click="goToDetailedHistory"/>
        </div>
      </div>
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

#water-data {
  text-align: center;
}

#water-data p:first-child {
  font-weight: 400;
  color: var(--primary-color);
}

#water-data p:nth-child(2) {
  font-weight: 500;
  font-size: 25px;
  color: var(--text-color);
}

#result-text {
  display: none;
}

#water-data p:nth-child(3) {
  max-width: 250px;
}

@media (max-width: 768px) {
  #water-data p:first-child {
    font-size: 1.2rem;
    margin: 0;
  }

  #water-data p:nth-child(2) {
    font-size: 1.5rem;
    margin: 0;
  }

  #water-data p:nth-child(3) {
    display: none;
  }

  #result-text {
    display: block;
    text-align: center;
  }
}
</style>
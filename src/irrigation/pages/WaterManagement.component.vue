<script setup>
import {onMounted, ref} from 'vue';
import router from "../../shared/router/index.js";

const remainingWater = ref(0);
const monthlyHistory = ref([]);
const columns = ref([
  { field: 'mes', header: 'Mes' },
  { field: 'cantidad', header: 'Cantidad utilizada' },
]);

onMounted(() => {
  // TODO: Implement the logic to fetch items from a service
  remainingWater.value = 15000;
  monthlyHistory.value = [
    { mes: 'Noviembre 2024', cantidad: 69000 },
    { mes: 'Diciembre 2024', cantidad: 125000 },
    { mes: 'Enero 2025', cantidad: 110250 },
    { mes: 'Febrero 2025', cantidad: 134500 },
    { mes: 'Marzo 2025', cantidad: 95000 },
  ];
});

const goToDetailedHistory = () => {
  router.push('/water/graph');
};
</script>

<template>
  <div>
    <h2 class="text-center mb-4">Gestión de agua</h2>
    <div class="flex flex-wrap justify-content-around">
      <div class="w-10 lg:w-5 m-5">
        <h3 class="text-center">Agua restante</h3>
        <pv-card class="max-w-25rem h-10rem mx-auto">
          <template #content>
            <div class="flex flex-row gap-5 justify-content-center align-items-center">
              <div id="water-drop-icon" class="flex justify-content-center align-items-center">
                <img src="/assets/icons/water_drop.svg" alt="water" style="width: 40px; height: 40px;" />
              </div>
              <div id="water-data">
                <p>Litros de agua restante</p>
                <p>{{ remainingWater }} L</p>
              </div>
            </div>
          </template>
        </pv-card>
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

#water-data p:last-child {
  font-weight: 500;
  font-size: 25px;
  color: var(--text-color);
}

</style>
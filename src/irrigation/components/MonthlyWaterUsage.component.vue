<script setup>
import {onMounted, ref} from "vue";
import router from "../../shared/router/index.js";

defineOptions({
  name: "MonthlyWaterUsage"
})

const monthlyHistory = ref([]);
const columns = ref([
  { field: 'mes', header: 'Mes' },
  { field: 'cantidad', header: 'Cantidad de agua utilizada (L)' },
]);

onMounted(() => {
  // TODO: Implement the logic to fetch items from a service
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
</script>

<template>
  <div class="container">
    <pv-card>
      <template #header>
        <h4 class="text-center">Historial mensual</h4>
      </template>
      <template #content>
        <pv-data-table :value="monthlyHistory">
          <pv-column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header"></pv-column>
        </pv-data-table>
      </template>
      <template #footer>
        <div class="footer-buttons">
          <pv-button class="w-15rem" label="Ver historial detallado" @click="goToDetailedHistory"/>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.container{
  width: 650px;
  height: 100%;
}

h4{
  margin: 0.3em;
  padding: 0.3em;
}

.footer-buttons{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
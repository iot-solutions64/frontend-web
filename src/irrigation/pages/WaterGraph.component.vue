<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "../../shared/router";
import DefaultHeader from "../../shared/components/DefaultHeader.component.vue";

const monthlyHistory = ref<{ mes: string; cantidad: number }[]>([]);
const chartData = ref();
const chartOptions = ref();

onMounted(() => {
  // TODO: Implement the logic to fetch items from a service
  monthlyHistory.value = [
    { mes: 'Noviembre 2024', cantidad: 69000 },
    { mes: 'Diciembre 2024', cantidad: 125000 },
    { mes: 'Enero 2025', cantidad: 110250 },
    { mes: 'Febrero 2025', cantidad: 134500 },
    { mes: 'Marzo 2025', cantidad: 95000 },
  ];
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const setChartData = () => {
  return {
    labels: monthlyHistory.value.map(item => item.mes),
    datasets: [
      {
        label: 'Litros de agua utilizados por mes',
        data: monthlyHistory.value.map(item => item.cantidad),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };
};
</script>

<template>
  <DefaultHeader title="Historial de consumo" :show-back-button="true"/>
  <div class="w-10 lg:w-6 m mx-auto">
    <pv-chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>
<script setup lang="ts">
import DefaultHeader from "../../shared/components/DefaultHeader.component.vue";
import WaterTankReviewCard from "../components/WaterTankReviewCard.component.vue";
import MonthlyWaterUsage from "../components/MonthlyWaterUsage.component.vue";
</script>

<template>
  <DefaultHeader title="Gestión del Agua"/>
  <main>
    <WaterTankReviewCard/>
    <MonthlyWaterUsage/>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
</style>
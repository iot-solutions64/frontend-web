<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from "../../shared/router";
import WaterDropIcon from "../../shared/custom-icons/WaterDrop.icon.vue";
import { useAuthenticationStore } from "@/security/services/authentication.store";
import { WaterTankService } from "@/irrigation/services/water-tank.service";
import { WaterTankResponse } from "@/irrigation/models/water-tank.response.entity";

const remainingLiters = ref(0);
const totalLiters = ref(0);
const resultMessage = ref('');

const auth = useAuthenticationStore();
const waterTankService = new WaterTankService();

onMounted(async () => {
  const userId = auth.userId;
  const tanks: WaterTankResponse[] = await waterTankService.getAllWaterTanksByUserId(userId);

  remainingLiters.value = tanks.reduce((sum, t) => sum + t.waterAmountRemaining, 0);
  totalLiters.value = tanks.reduce((sum, t) => sum + t.maxWaterCapacity, 0);

  const porcentaje = totalLiters.value > 0 ? (remainingLiters.value / totalLiters.value) : 0;
  resultMessage.value = porcentaje >= 0.1
      ? 'El agua restante es suficiente para el riego.'
      : 'El agua restante es insuficiente, considere rellenar los tanques.';
});

function goToTanks() {
  router.push('/tanks');
}
</script>

<template>
  <div class="container">
    <pv-card>
      <template #header>
        <h4 class="text-center">Datos de los tanques</h4>
      </template>
      <template #content>
        <div class="content">
          <WaterDropIcon height="100px" width="100px"/>
          <div class="water-data">
            <h5>Total de agua restante</h5>
            <p>{{ remainingLiters }} / {{ totalLiters }} L</p>
            <p v-if="resultMessage"><strong>Resultado:</strong> {{ resultMessage }}</p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-content-center">
          <p id="result-text" v-if="resultMessage"><strong>Resultado:</strong> {{ resultMessage }}</p>
          <pv-button class="w-15rem" label="Ver tanques" @click="goToTanks"/>
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

.content{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}

.water-data {
  text-align: left;
}

.water-data>h5{
  margin: 0;
  padding: 0;
  color: var(--primary-color);
}

.water-data p:nth-child(2) {
  font-weight: 500;
  font-size: 25px;
  color: var(--text-color);
}

#result-text {
  display: none;
}

.water-data p:nth-child(3) {
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
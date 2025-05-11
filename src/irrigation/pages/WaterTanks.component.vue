<script setup lang="ts">
import router from "../../shared/router/index.js";
import AddButton from '../../shared/components/AddButton.component.vue';
import {onMounted, ref} from "vue";
import AddTankDialog from '../components/AddTankDialog.component.vue';
import TankCard from '../components/TankCard.component.vue';

const showAddDialog = ref(false);
const tanks = ref([]);

onMounted(() => {
  // TODO: Implement the logic to fetch items from a service
  tanks.value = [
    { id: 1, name: 'Tanque A', remainingLiters: 1000, totalLiters: 2000 },
    { id: 2, name: 'Tanque B', remainingLiters: 800, totalLiters: 1000 },
  ]
});

function openAddTankDialog() {
  showAddDialog.value = true;
}

function saveTank(newTank) {
  // TODO: Implement the logic to save the new tank
  newTank.id = tanks.value.length + 1;
  newTank.remainingLiters = newTank.totalLiters;
  tanks.value.push(newTank);
}
</script>

<template>
  <div class="flex align-items-center m-3 mb-8">
    <pv-button icon="pi pi-arrow-left"
               @click="router.back()"
               aria-label="Volver"
               class="mr-2"/>
    <h3 class="m-0 text-center flex-grow-1">Tanques</h3>
  </div>
  <div class="flex flex-column w-5 mx-auto gap-3">
    <TankCard
        v-for="tank in tanks"
        :key="tank.id"
        :id="tank.id"
        :name="tank.name"
        :remainingLiters="tank.remainingLiters"
        :totalLiters="tank.totalLiters"
        @edit="() => console.log('Editar', tank.id)"
        @delete="() => console.log('Eliminar', tank.id)"
    />
  </div>
  <AddTankDialog v-model:visible="showAddDialog" @save="saveTank" />
  <AddButton @click="openAddTankDialog"/>
</template>

<style scoped>

</style>
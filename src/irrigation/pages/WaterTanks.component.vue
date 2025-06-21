<script setup lang="ts">
import router from "../../shared/router";
import {onMounted, ref} from "vue";
import AddButton from '../../shared/components/AddButton.component.vue';
import AddTankDialog from '../components/AddTankDialog.component.vue';
import TankCard from '../components/TankCard.component.vue';
import {Tank} from "../models/tank.entity";
import EditTankDialog from '../components/EditTankDialog.component.vue';
import DeleteTankDialog from '../components/DeleteTankDialog.component.vue';
import DefaultHeader from "../../shared/components/DefaultHeader.component.vue";

const showAddDialog = ref(false);
const showEditDialog = ref(false);
const showDeleteDialog = ref(false);
const tanks = ref([]);
const tankToEdit = ref(new Tank());
const tankToDelete = ref(new Tank());

onMounted(() => {
  // TODO: Implement the logic to fetch items from a service
  tanks.value = [
      new Tank(1, 'Tanque A', 7000, 8000),
      new Tank(2, 'Tanque B', 8000, 12000),
  ]
});

function openAddTankDialog() {
  showAddDialog.value = true;
}

function saveTank(newTank: Tank) {
  // TODO: Implement the logic to save the new tank
  newTank.id = tanks.value.length + 1;
  tanks.value.push(newTank);
}

function openEditTankDialog(tank: Tank) {
  tankToEdit.value = tank;
  showEditDialog.value = true;
}

function editTank(tank: Tank) {
  // TODO: Implement the logic to edit the item
  tank = { ...tankToEdit.value, ...tank };
  const index = tanks.value.findIndex(i => i.id === tank.id);
  if (index !== -1) {
    tanks.value[index] = { ...tanks.value[index], ...tank };
  }
}

function openDeleteTankDialog(tank: Tank) {
  tankToDelete.value = tank;
  showDeleteDialog.value = true;
}

function deleteTank(id: number) {
  // TODO: Implement the logic to delete the item
  tanks.value = tanks.value.filter(i => i.id !== id);
}
</script>

<template>
  <DefaultHeader title="Tanques de Agua" :show-back-button="true"/>
  <div class="flex flex-column w-10 lg:w-5 mx-auto gap-3">
    <TankCard
        v-for="tank in tanks"
        :key="tank.id"
        :tank="tank"
        @openEdit="openEditTankDialog"
        @openDelete="openDeleteTankDialog"
    />
  </div>
  <AddTankDialog v-model:visible="showAddDialog" @save="saveTank" />
  <EditTankDialog v-model:visible="showEditDialog" :tank="tankToEdit" @save="editTank" />
  <DeleteTankDialog v-model:visible="showDeleteDialog" :tank="tankToDelete" @delete="deleteTank" />
  <AddButton @click="openAddTankDialog"/>
  <pv-toast position="bottom-right"/>
</template>

<style scoped>

</style>
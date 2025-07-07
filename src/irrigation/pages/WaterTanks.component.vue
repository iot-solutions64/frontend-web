<script setup lang="ts">
import {onMounted, ref} from "vue";
import AddButton from '../../shared/components/AddButton.component.vue';
import AddTankDialog from '../components/AddTankDialog.component.vue';
import EditTankDialog from '../components/EditTankDialog.component.vue';
import TankCard from '../components/TankCard.component.vue';
import DeleteTankDialog from '../components/DeleteTankDialog.component.vue';
import DefaultHeader from "../../shared/components/DefaultHeader.component.vue";
import {WaterTankRequest} from "@/irrigation/models/water-tank.request.entity";
import {WaterTankResponse} from "@/irrigation/models/water-tank.response.entity";
import {WaterTankService} from "@/irrigation/services/water-tank.service";
import {useAuthenticationStore} from "@/security/services/authentication.store";
import {WaterTankNameRequest} from "@/irrigation/models/water-tank-name.request.entity";
import {WaterCapacityRequest} from "@/irrigation/models/water-capacity.request.entity";

const showAddDialog = ref(false);
const showEditDialog = ref(false);
const showDeleteDialog = ref(false);
const tanks = ref<WaterTankResponse[]>([]);
const tankToEdit = ref<WaterTankResponse>(new WaterTankResponse());
const tankToDelete = ref<WaterTankResponse>(new WaterTankResponse());

const waterTankService = new WaterTankService();
const authenticationStore = useAuthenticationStore();

onMounted(() => {
  getTanks();
});

async function getTanks() {
  const userId = authenticationStore.userId;
  tanks.value = await waterTankService.getAllWaterTanksByUserId(userId);
}

function openAddTankDialog() {
  showAddDialog.value = true;
}

async function saveTank(request: WaterTankRequest) {
  request.userId = authenticationStore.userId;
  await waterTankService.createWaterTank(request);
  await getTanks();
}

function openEditTankDialog(tank: WaterTankResponse) {
  tankToEdit.value = tank;
  showEditDialog.value = true;
}

async function editTank(updated: WaterTankResponse) {
  const original = tankToEdit.value;
  if (!original) return;

  // PATCH 1: Nombre
  if (original.name !== updated.name) {
    await waterTankService.patchWaterTankName(new WaterTankNameRequest(original.id, updated.name));
  }

  // PATCH 2: Capacidad de agua total
  if (original.maxWaterCapacity !== updated.maxWaterCapacity) {
    await waterTankService.patchWaterCapacity(new WaterCapacityRequest(original.id, updated.maxWaterCapacity));
  }

  // PATCH 3: Estado
  if (original.status !== updated.status) {
    await waterTankService.patchWaterTankStatus(original.id, updated.status);
  }

  await getTanks();
  showEditDialog.value = false;
}

function openDeleteTankDialog(tank: WaterTankResponse) {
  tankToDelete.value = tank;
  showDeleteDialog.value = true;
}

async function deleteTank(id: number) {
  await waterTankService.deleteWaterTankById(id);
  await getTanks();
  showDeleteDialog.value = false;
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
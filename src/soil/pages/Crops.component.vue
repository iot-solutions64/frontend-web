<script setup lang="ts">
import {onMounted, ref} from 'vue';
import CropTable from '../components/CropTable.component.vue';
import AddButton from '../../shared/components/AddButton.component.vue';
import AddCropDialog from '../components/AddCropDialog.component.vue';
import DeleteCropDialog from '../components/DeleteCropDialog.component.vue';
import EditCropDialog from '../components/EditCropDialog.component.vue';
import router from "@/shared/router";
import DefaultHeader from "@/shared/components/DefaultHeader.component.vue";
import {CropLightResponse} from "@/soil/models/crop-light.response.entity";
import {CropService} from "@/soil/services/crop.service";
import {useAuthenticationStore} from "@/security/services/authentication.store";
import {WaterTankService} from "@/irrigation/services/water-tank.service";
import {CropRequest} from "@/soil/models/crop.request.entity";
import {Tank} from "@/irrigation/models/tank.entity";
import {CropDetailedResponse} from "@/soil/models/crop-detailed.response.entity";
import {HumidityThresholdRequest} from "@/soil/models/humidity-threshold.request.entity";
import {TemperatureThresholdRequest} from "@/soil/models/temperature-threshold.request.entity";

const showAddDialog = ref(false);
const selectedCropToDelete = ref<CropLightResponse | null>(null);
const showDeleteDialog = ref(false);
const cropToEdit = ref(new CropDetailedResponse());
const showEditDialog = ref(false);

//New
const cropList = ref<CropLightResponse[]>([]);
const cropService = new CropService();
const tankList = ref<Tank[]>([]);
const waterTankService = new WaterTankService();

onMounted(() => {
  getCrops();
  getTanks();
});

function viewCrop(id: number) {
  router.push(`/crops/${id}`);
}

async function openEditCropDialog(cropId: number) {
  cropToEdit.value = await cropService.getDetailedCropById(cropId);
  showEditDialog.value = true;
}

async function editCrop(editedCrop: CropRequest) {
  if (!editedCrop) return;

  const original = cropToEdit.value;
  const cropId = original.cropId;

  // PATCH 1: Temperatura thresholds
  if (editedCrop.temperatureMinThreshold !== original.temperatureMinThreshold ||
      editedCrop.temperatureMaxThreshold !== original.temperatureMaxThreshold) {
    const tempThresholdReq = new TemperatureThresholdRequest(
        editedCrop.temperatureMinThreshold,
        editedCrop.temperatureMaxThreshold
    );
    await cropService.patchTemperatureThresholdByCropId(cropId, tempThresholdReq);
  }

  // PATCH 2: Humedad thresholds
  if (editedCrop.humidityMinThreshold !== original.humidityMinThreshold ||
      editedCrop.humidityMaxThreshold !== original.humidityMaxThreshold) {
    const humThresholdReq = new HumidityThresholdRequest(
        editedCrop.humidityMinThreshold,
        editedCrop.humidityMaxThreshold
    );
    await cropService.patchHumidityThresholdByCropId(cropId, humThresholdReq);
  }

  await getCrops();
  showEditDialog.value = false;
}

function openAddCropDialog() {
  showAddDialog.value = true;
}

async function saveCrop(newCrop: CropRequest) {
  await cropService.createCrop(newCrop);
  await getCrops();
  await getTanks();
}

//New
async function getCrops(){
  const authenticationStore = useAuthenticationStore();
  const userId: number = authenticationStore.userId;
  cropList.value = await cropService.getLightCropsByUserId(userId);
}

async function getTanks(){
  const authenticationStore = useAuthenticationStore();
  const userId: number = authenticationStore.userId;
  const response = await waterTankService.getAllWaterTanksByUserId(userId);
  tankList.value = response.map(tank => new Tank(tank.id, tank.name, tank.maxWaterCapacity, tank.waterAmountRemaining, tank.status));
}

function openDeleteCropDialog(crop: CropLightResponse) {
  selectedCropToDelete.value = crop;
  showDeleteDialog.value = true;
}

async function deleteCrop(id: number) {
  await cropService.deleteByCropId(id);
  await getCrops();
  await getTanks();
}
</script>

<template>
  <DefaultHeader title="Cultivos" :show-back-button="false"/>

  <CropTable :items="cropList" @view="viewCrop" @edit="openEditCropDialog" @delete="openDeleteCropDialog"/>

  <AddCropDialog v-model:visible="showAddDialog" :tanks="tankList" @save="saveCrop"/>
  <DeleteCropDialog v-model:visible="showDeleteDialog" :crop="selectedCropToDelete" @delete="deleteCrop" />
  <EditCropDialog v-model:visible="showEditDialog" :crop="cropToEdit" :tanks="tankList" @save="editCrop"/>

  <pv-toast position="bottom-right"/>
  <AddButton @click="openAddCropDialog"/>

</template>

<style scoped>
h2 {
  text-align: center;
}
</style>
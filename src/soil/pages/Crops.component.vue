<script setup lang="ts">
import {onMounted, ref} from 'vue';
import CropTable from '../components/CropTable.component.vue';
import AddButton from '../../shared/components/AddButton.component.vue';
import AddCropDialog from '../components/AddCropDialog.component.vue';
import DeleteCropDialog from '../components/DeleteCropDialog.component.vue';
import EditCropDialog from '../components/EditCropDialog.component.vue';
import router from "@/shared/router";
import {Crop} from "../models/crop.entity.js";
import DefaultHeader from "@/shared/components/DefaultHeader.component.vue";
import {CropLightResponse} from "@/soil/models/crop.light.response.entity";
import {CropService} from "@/soil/services/crop.service";
import {useAuthenticationStore} from "@/security/services/authentication.store";
import {WaterTankService} from "@/irrigation/services/water-tank.service";
import {CropRequest} from "@/soil/models/crop.request.entity";
import {Tank} from "@/irrigation/models/tank.entity";

//Old
const crops = ref<Crop[]>([]);
const showAddDialog = ref(false);
const selectedCropToDelete = ref<CropLightResponse | null>(null);
const showDeleteDialog = ref(false);
const cropToEdit = ref(new Crop());
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

function openEditCropDialog(crop: Crop) {
  cropToEdit.value = crop;
  showEditDialog.value = true;
}

function editCrop(crop: Crop) {
  // TODO: Implement the logic to edit the item
  crop = { ...cropToEdit.value, ...crop };
  const index = crops.value.findIndex(i => i.id === crop.id);
  if (index !== -1) {
    crops.value[index] = { ...crops.value[index], ...crop };
  }
}

function openAddCropDialog() {
  showAddDialog.value = true;
}

function saveCrop(newCrop: CropRequest) {
  cropService.createCrop(newCrop);
  getCrops();
  getTanks();
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

function deleteCrop(id: number) {
  cropService.deleteByCropId(id);
  getCrops();
  getTanks();
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
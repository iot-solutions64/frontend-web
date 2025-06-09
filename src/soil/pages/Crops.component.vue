<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CropTable from '../components/CropTable.component.vue';
import AddButton from '../../shared/components/AddButton.component.vue';
import AddCropDialog from '../components/AddCropDialog.component.vue';
import DeleteCropDialog from '../components/DeleteCropDialog.component.vue';
import EditCropDialog from '../components/EditCropDialog.component.vue';
import router from "../../shared/router/index.js";
import {Crop} from "../models/crop.entity.js";
import {Tank} from "../../irrigation/models/tank.entity";
import DefaultHeader from "../../shared/components/DefaultHeader.component.vue";

const crops = ref([]);
const tanks = ref([]);
const showAddDialog = ref(false);
const cropToDelete = ref(new Crop());
const showDeleteDialog = ref(false);
const cropToEdit = ref(new Crop());
const showEditDialog = ref(false);

onMounted(() => {
  // TODO: Implement the logic to fetch crops from a service
  crops.value = [
      new Crop(1, 'Recinto A', 1000, true, 1),
      new Crop(2, 'Recinto B', 800, false, 1),
  ];

  // TODO: Implement the logic to fetch tanks from a service
  tanks.value = [
    new Tank(1, 'Tanque A', 1000, 2000),
    new Tank(2, 'Tanque B', 800, 1000),
  ]
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

function openDeleteCropDialog(crop: Crop) {
  cropToDelete.value = crop;
  showDeleteDialog.value = true;
}

function deleteCrop(id: number) {
  // TODO: Implement the logic to delete the item
  crops.value = crops.value.filter(i => i.id !== id);
}

function openAddCropDialog() {
  showAddDialog.value = true;
}

function saveCrop(newCrop) {
  // TODO: Implement the logic to save the new item
  newCrop.id = crops.value.length + 1;
  crops.value.push(newCrop);
}
</script>

<template>
  <DefaultHeader title="Cultivos" :show-back-button="false"/>
  <CropTable :items="crops" @view="viewCrop" @edit="openEditCropDialog" @delete="openDeleteCropDialog"/>
  <AddCropDialog v-model:visible="showAddDialog" :tanks="tanks" @save="saveCrop" />
  <DeleteCropDialog v-model:visible="showDeleteDialog" :crop="cropToDelete" @delete="deleteCrop" />
  <EditCropDialog v-model:visible="showEditDialog" :crop="cropToEdit" :tanks="tanks" @save="editCrop"/>
  <pv-toast position="bottom-right"/>
  <AddButton @click="openAddCropDialog"/>
</template>

<style scoped>
h2 {
  text-align: center;
}
</style>
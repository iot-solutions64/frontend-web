<script setup>
import { ref, onMounted } from 'vue';
import CropTable from '../components/CropTable.component.vue';
import AddButton from '../components/AddButton.component.vue';
import AddCropDialog from '../components/AddCropDialog.component.vue';

// Simulación de servicio o datos
const items = ref([]);
const showDialog = ref(false);

onMounted(() => {
  // TODO: Implement the logic to fetch items from a service
  items.value = [
    { id: 1, name: 'Recinto A', maxLiters: 1000, autoIrrigation: true },
    { id: 2, name: 'Recinto B', maxLiters: 800, autoIrrigation: false },
  ];
});

function viewItem(item) {
  // TODO: Implement the logic to view the item in detail
  console.log('Ver:', item);
}

function editItem(item) {
  // TODO: Implement the logic to edit the item
  console.log('Editar:', item);
}

function deleteItem(item) {
  // TODO: Implement the logic to delete the item
  console.log('Eliminar:', item);
}

function addItem() {
  showDialog.value = true;
}

function saveItem(newItem) {
  // TODO: Implement the logic to save the new item
  newItem.id = items.value.length + 1;
  newItem.autoIrrigation = true;
  items.value.push(newItem);
}
</script>

<template>
  <h2>Cultivos</h2>
  <CropTable
      :items="items"
      @view="viewItem"
      @edit="editItem"
      @delete="deleteItem"
  />
  <AddCropDialog v-model:visible="showDialog" @save="saveItem" />
  <pv-toast position="bottom-right"/>
  <AddButton @click="addItem"/>
</template>

<style scoped>
h2 {
  text-align: center;
}
</style>
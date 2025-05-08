<script setup>
import { ref, onMounted } from 'vue';
import CropTable from '../components/CropTable.component.vue';
import AddButton from '../components/AddButton.component.vue';
import AddCropDialog from '../components/AddCropDialog.component.vue';
import DeleteCropDialog from '../components/DeleteCropDialog.component.vue';

const items = ref([]);
const cropToDelete = ref(null);
const showAddDialog = ref(false);
const showDeleteDialog = ref(false);

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

function openDeleteItemDialog(item) {
  cropToDelete.value = item;
  showDeleteDialog.value = true;
}

function deleteItem(item) {
  // TODO: Implement the logic to delete the item
  items.value = items.value.filter(i => i.id !== item.id);
}

function openAddItemDialog() {
  showAddDialog.value = true;
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
      @delete="openDeleteItemDialog"
  />
  <AddCropDialog v-model:visible="showAddDialog" @save="saveItem" />
  <DeleteCropDialog v-model:visible="showDeleteDialog"
                    :item="cropToDelete"
                    @delete="deleteItem" />
  <pv-toast position="bottom-right"/>
  <AddButton @click="openAddItemDialog"/>
</template>

<style scoped>
h2 {
  text-align: center;
}
</style>
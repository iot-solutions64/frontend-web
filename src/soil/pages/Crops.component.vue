<script setup>
import { ref, onMounted } from 'vue';
import CropTable from '../components/CropTable.component.vue';
import AddButton from '../components/AddButton.component.vue';
import AddCropDialog from '../components/AddCropDialog.component.vue';
import DeleteCropDialog from '../components/DeleteCropDialog.component.vue';
import EditCropDialog from '../components/EditCropDialog.component.vue';

const items = ref([]);
const showAddDialog = ref(false);
const cropToDelete = ref(null);
const showDeleteDialog = ref(false);
const cropToEdit = ref(null);
const showEditDialog = ref(false);

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
function openEditItemDialog(item) {
  cropToEdit.value = item;
  showEditDialog.value = true;
}

function editItem(item) {
  // TODO: Implement the logic to edit the item
  item = { ...cropToEdit.value, ...item };
  const index = items.value.findIndex(i => i.id === item.id);
  if (index !== -1) {
    items.value[index] = { ...items.value[index], ...item };
  }
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
      @edit="openEditItemDialog"
      @delete="openDeleteItemDialog"
  />
  <AddCropDialog v-model:visible="showAddDialog" @save="saveItem" />
  <DeleteCropDialog v-model:visible="showDeleteDialog"
                    :item="cropToDelete"
                    @delete="deleteItem" />
  <EditCropDialog
      v-model:visible="showEditDialog"
      :item="cropToEdit"
      @save="editItem"
  />
  <pv-toast position="bottom-right"/>
  <AddButton @click="openAddItemDialog"/>
</template>

<style scoped>
h2 {
  text-align: center;
}
</style>
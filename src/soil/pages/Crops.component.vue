<script setup>
import { ref, onMounted } from 'vue';
import CropTable from '../components/CropTable.component.vue';
import AddButton from '../components/AddButton.component.vue';

// Simulación de servicio o datos
const items = ref([]);

onMounted(() => {
  // Aquí se llamará al crops service
  items.value = [
    { id: 1, name: 'Recinto A', maxLiters: 1000, autoIrrigation: true },
    { id: 2, name: 'Recinto B', maxLiters: 800, autoIrrigation: false },
  ];
});

function viewItem(item) {
  console.log('Ver:', item);
}

function editItem(item) {
  console.log('Editar:', item);
}

function deleteItem(item) {
  console.log('Eliminar:', item);
}

function addItem() {
  console.log('Agregar nuevo cultivo');
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
  <AddButton @click="addItem"/>
</template>

<style scoped>
h2 {
  text-align: center;
}
</style>
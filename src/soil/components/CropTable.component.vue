<script setup lang="ts">
import {ref} from "vue";
import {CropLightResponse} from "@/soil/models/crop-light.response.entity";

defineProps({
  items: {
    type: Array<CropLightResponse>,
    required: true,
  }
});

defineEmits(['view', 'edit', 'delete']);
const irrigationOptions = ref(["On", "Off"]);
</script>

<template>
  <div class="flex justify-content-center m mx-auto">
    <pv-data-table :value="items" table-style="min-width: 50rem" style="overflow-x: scroll">
      <pv-column field="cropId" header="ID"></pv-column>
      <pv-column field="cropName" header="Nombre"></pv-column>
      <pv-column field="waterAmountRemaining" header="Cantidad Restante de Agua"></pv-column>
      <pv-column header="Riego Automático">
        <template #body="slotProps">
          <pv-select-button v-model="slotProps.data.autoIrrigation" :options="irrigationOptions" :allow-empty="false" default-value="On"/>
        </template>
      </pv-column>
      <pv-column header="Acciones">
        <template #body="slotProps">
          <pv-button text icon="pi pi-search" @click="$emit('view', slotProps.data.cropId)" />
          <pv-button text icon="pi pi-pencil" @click="$emit('edit', slotProps.data.cropId)" />
          <pv-button text icon="pi pi-trash" @click="$emit('delete', slotProps.data)" />
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<style>
.p-datatable-table{
  min-width: 60rem;
  overflow-x: auto;
}
</style>
<template>
  <div class="flex justify-content-center m mx-auto">
    <pv-data-table :value="items" table-style="min-width: 50rem" style="overflow-x: scroll">
      <pv-column field="id" header="ID"></pv-column>
      <pv-column field="name" header="Nombre"></pv-column>
      <pv-column field="maxLiters" header="Cantidad Máxima (L)"></pv-column>
      <pv-column header="Riego Automático">
        <template #body="slotProps">
          <pv-checkbox :binary="true" :modelValue="slotProps.data.autoIrrigation" />
        </template>
      </pv-column>
      <pv-column header="Acciones">
        <template #body="slotProps">
          <pv-button text icon="pi pi-search" @click="$emit('view', slotProps.data.id)" />
          <pv-button text icon="pi pi-pencil" @click="$emit('edit', slotProps.data)" />
          <pv-button text icon="pi pi-trash" @click="$emit('delete', slotProps.data)" />
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Array,
    required: true,
  }
});

defineEmits(['view', 'edit', 'delete']);
</script>

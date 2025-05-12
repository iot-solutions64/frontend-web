<script setup lang="ts">
import {Tank} from "../models/tank.entity";

const props = defineProps(
    {
      tank: {
        type: Tank,
        required: true,
      },
    }
);

const emit = defineEmits(['openEdit', 'openDelete']);

function editTank() {
  emit('openEdit', props.tank);
}

function deleteTank() {
  emit('openDelete', props.tank);
}

</script>

<template>
  <div class="flex align-items-center justify-content-between p-3 border-round-xl shadow-2 surface-card w-full">
    <div id="water-icon" class="flex justify-content-center align-items-center">
      <img src="/assets/icons/water.svg" alt="water" style="width: 40px; height: 40px;"/>
    </div>
    <div class="flex-1 text-center">
      <h5>{{ tank.name }}</h5>
      <p>{{ tank.remainingLiters }} L / {{ tank.totalLiters }} L</p>
    </div>
    <div class="flex gap-2">
      <pv-button
        icon="pi pi-pencil"
        class="p-button-rounded p-button-outlined"
        @click="editTank"
        aria-label="Editar"/>
      <pv-button
        icon="pi pi-trash"
        class="p-button-rounded p-button-outlined"
        @click="deleteTank"
        aria-label="Eliminar"/>
    </div>
  </div>
</template>

<style scoped>
#water-icon {
  width: 80px;
  height: 80px;
  background-color: var(--primary-color);
  border-radius: 50%;
}
</style>
<script setup lang="ts">
import {Tank} from "../models/tank.entity";
import WaterIcon from "../../shared/custom-icons/WaterIcon.icon.vue";

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
  <div class="tank-card">
    <aside class="left-side">
      <WaterIcon height="80px" width="80px"/>
    </aside>
    <aside class="right-side">
      <div>
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
    </aside>
  </div>
</template>

<style scoped>
.tank-card{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
}

h5,p{
  margin: 0.2em;
  padding: 0.2em;
}

.left-side{
  width: 20%;
}

.right-side{
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
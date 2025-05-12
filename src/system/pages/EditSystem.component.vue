<script setup lang="ts">
import {onMounted, ref} from "vue";
import {System} from "../models/system.entity";
import router from "../../shared/router/index.js";
import {Subsystem} from "../models/subsystem.entity";

const systemId = ref(0);
const system = ref(new System());

onMounted(() => {
  systemId.value = Number(router.currentRoute.value.params.id);
  // TODO: Implement the logic to fetch system data from a service
  system.value = new System(
      systemId.value,
      "Sistema de zanahorias",
      1,

      70,
      [
        new Subsystem(1, "Regado automatico", null, "Normal", true),
        new Subsystem(2, "Temperatura", 22, "Normal", true),
        new Subsystem(3, "Humedad", 50, "Normal", false),
        new Subsystem(4, "Cantidad de agua", 1000, "Insuficiente", false),
      ]
  );
});
</script>

<template>
  <div class="flex align-items-center m-3 mb-6">
    <pv-button icon="pi pi-arrow-left"
               @click="router.back()"
               aria-label="Volver"
               class="mr-2"/>
  </div>
  <div class="flex flex-column gap-5 justify-content-center align-items-center mb-5">
    <table class="w-3" style="border-collapse: collapse;">
      <thead>
      <tr>
        <th class="table-header">Sistema</th>
        <th class="table-header">Lectura</th>
        <th class="table-header">Estado</th>
        <th class="table-header">Activado</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(sub, idx) in system.subsystems" :key="idx">
        <td class="p-2">{{ sub.name }}</td>
        <td class="p-2">{{ sub.value ?? 'No aplica' }}</td>
        <td class="p-2">{{ sub.status }}</td>
        <td class="p-2 text-center">
          <pv-checkbox v-model="sub.active" binary disabled/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="flex gap-3 justify-content-center align-items-center">
    <pv-button label="Cancelar" icon="pi pi-pencil" class="w-10rem" @click=""/>
    <pv-button label="Guardar cambios" severity="danger" icon="pi pi-trash" class="w-10rem" @click=""/>
  </div>
</template>

<style scoped>
.table-header {
  padding: 8px;
  border-bottom: 2px solid rgba(85, 85, 85, 0.11);
}
</style>
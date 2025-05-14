<script setup lang="ts">
import {onMounted, ref} from "vue";
import {System} from "../models/system.entity";
import router from "../../shared/router/index.js";
import {Subsystem} from "../models/subsystem.entity";

const systemId = ref(0);
const system = ref(new System());
const name = ref("");

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
  name.value = system.value.name;
});

function saveChanges() {
  // TODO: Implement the logic to save changes
  system.value = new System(
      systemId.value,
      name.value,
      system.value.cropId,
      system.value.batteryLevel,
      system.value.subsystems.map((subsystem) => {
        return new Subsystem(
            subsystem.id,
            subsystem.name,
            subsystem.value,
            subsystem.status,
            subsystem.active
        );
      })
  );
  router.back();
}
</script>

<template>
  <div class="flex align-items-center m-3 mb-6">
    <pv-button icon="pi pi-arrow-left"
               @click="router.back()"
               aria-label="Volver"
               class="mr-2"/>
  </div>
  <div class="flex flex-column gap-5 justify-content-center align-items-center mb-5">
    <div class="flex flex-column w-10 md:w-8 lg:w-5 mx-auto text-center">
      <label for="name" class="name-label mb-2">Nombre</label>
      <pv-input-text class="h-3rem text-center" id="name" v-model="name" />
    </div>
    <div class="w-full overflow-x-auto">
      <table class="mx-auto" style="border-collapse: collapse; min-width: 30rem;">
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
          <td class="p-3">{{ sub.name }}</td>
          <td class="p-3">{{ sub.value ?? 'No aplica' }}</td>
          <td class="p-3">{{ sub.status }}</td>
          <td class="p-3 text-center">
            <pv-checkbox v-model="sub.active" binary/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex gap-3 justify-content-center align-items-center">
    <pv-button label="Cancelar" severity="danger" class="w-15rem" @click="router.back()"/>
    <pv-button label="Guardar cambios" class="w-15rem" @click="saveChanges"/>
  </div>
</template>

<style scoped>
.table-header {
  padding: 8px;
  border-bottom: 2px solid rgba(85, 85, 85, 0.11);
}

.name-label {
  font-weight: 600;
  font-size: 32px;
  text-align: center;
}
</style>
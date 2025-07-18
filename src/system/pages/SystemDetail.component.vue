<script setup lang="ts">
import {onMounted, ref} from "vue";
import {System} from "../models/system.entity";
import router from "../../shared/router";
import {Subsystem} from "../models/subsystem.entity";
import DeleteSystemDialog from "../components/DeleteSystemDialog.component.vue";
import BatteryIcon from "../../shared/custom-icons/Battery.icon.vue";
import DefaultHeader from "../../shared/components/DefaultHeader.component.vue";

const systemId = ref(0);
const system = ref(new System());
const showDeleteDialog = ref(false);

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

function getBatteryColor(percentage: number) {
  if (percentage >= 70) return '#27AE60';
  if (percentage >= 40) return '#F1C40F';
  if (percentage >= 20) return '#E67E22';
  return '#E74C3C';
}

function openDeleteSystemDialog() {
  showDeleteDialog.value = true;
}

function deleteCrop(id: number) {
  // TODO: Implement the logic to delete the item
  router.back();
}

function goToEditSystem(id: number) {
  router.push(`/systems/${id}/edit`);
}


</script>

<template>
  <DefaultHeader :title="system.name" :show-back-button="true"/>
  <div class="flex flex-column gap-5 justify-content-center align-items-center mb-5">
    <pv-card>
      <template #content>
        <div class="flex flex-row gap-1 xl:gap-5 justify-content-around align-items-center">
          <BatteryIcon :background-color="getBatteryColor(system.batteryLevel)" height="70px" width="70px"/>
          <div class="battery-data">
            <p>Batería</p>
            <p>{{ system.batteryLevel }}%</p>
          </div>
        </div>
      </template>
    </pv-card>
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
  </div>
  <div class="flex gap-3 justify-content-center align-items-center">
    <pv-button label="Editar" icon="pi pi-pencil" class="w-10rem" @click="goToEditSystem(systemId)"/>
    <pv-button label="Quitar" severity="danger" icon="pi pi-trash" class="w-10rem" @click="openDeleteSystemDialog"/>
  </div>
  <DeleteSystemDialog :system-id="system.id" v-model:visible="showDeleteDialog" @delete="deleteCrop" />
</template>

<style scoped>


.battery-data p {
  margin: 0;
  text-align: center;
}

.battery-data p:nth-child(2) {
  font-size: 25px;
  font-weight: 500;
}

.table-header {
  padding: 8px;
  border-bottom: 2px solid rgba(85, 85, 85, 0.11);
}
</style>
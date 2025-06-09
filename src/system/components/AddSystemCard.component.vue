<script setup lang="ts">
import {System} from "../models/system.entity.js";
import router from "../../shared/router/index.js";
import GearIcon from "../../shared/custom-icons/Gear.icon.vue";

defineOptions({
  name: "AddSystemCard"
});

defineProps({
  system: System
});

function addSystem(systemId: number) {
  // TODO: Implement the logic to add the system
  router.push(`/systems/${systemId}`);
}
</script>

<template>
  <pv-card style="width: 40%">
    <template #content>
      <div class="content">
        <GearIcon height="50px" width="50px"/>
        <p class="font-medium">{{system.name}}</p>
        <pv-button icon="pi pi-plus" label="Agregar" @click="addSystem(system.id)" />
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.content{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}
</style>
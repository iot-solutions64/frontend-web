<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '25rem' }">
    <template #header>
      <h4>Eliminar cultivo</h4>
    </template>
    <div class="text-center mb-4">
      <p>¿Estás seguro de que deseas eliminar este cultivo? Esta acción no se puede deshacer.</p>
    </div>
    <template #footer>
      <div class="flex flex-row gap-4 w-full justify-content-center">
        <pv-button label="Cancelar" severity="secondary" @click="closeDialog" />
        <pv-button label="Eliminar" severity="danger" @click="handleDelete" />
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>
h4 {
  margin: 1rem;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import {Crop} from "../models/crop.entity.js";

const props = defineProps({
  visible: Boolean,
  crop: Crop,
});
const emit = defineEmits(['update:visible', 'delete']);
const localVisible = ref(props.visible);
const toast = useToast();

watch(() => props.visible, (val) => {
  localVisible.value = val;
});
watch(localVisible, (val) => {
  emit('update:visible', val);
});

const closeDialog = () => {
  localVisible.value = false;
};

const handleDelete = () => {
  emit('delete', props.crop.id);
  closeDialog();
  toast.add({ severity: 'success', summary: 'Cultivo eliminado', detail: `El cultivo ${props.crop.name} ha sido eliminado.`, life: 3000 });
};
</script>
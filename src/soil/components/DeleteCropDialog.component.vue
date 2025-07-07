<script setup lang="ts">
import {PropType, ref, watch} from 'vue';
import { useToast } from 'primevue/usetoast';
import {CropLightResponse} from "@/soil/models/crop-light.response.entity";

const props = defineProps({
  visible: Boolean,
  crop: {
    type: Object as PropType<CropLightResponse | null>,
    required: true
  }
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
  if (!props.crop) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se ha seleccionado un cultivo para eliminar.', life: 3000 });
    return;
  }
  emit('delete', props.crop.cropId);
  closeDialog();
  toast.add({ severity: 'success', summary: 'Cultivo eliminado', detail: `El cultivo ${props.crop.cropName} ha sido eliminado.`, life: 3000 });
};
</script>

<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '25rem' }">
    <template #header>
      <h5>Eliminar cultivo</h5>
    </template>
    <main>
      <p>¿Estás seguro de que deseas <strong>eliminar</strong> este cultivo? Esta acción no se puede deshacer.</p>
    </main>
    <template #footer>
      <div class="footer">
        <pv-button label="Cancelar" severity="secondary" @click="closeDialog" />
        <pv-button label="Eliminar" severity="danger" @click="handleDelete" />
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>
h5{
  margin:0;
}
.footer{
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { WaterTankResponse } from "@/irrigation/models/water-tank.response.entity";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  tank: {
    type: Object as () => WaterTankResponse,
    required: true,
  },
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
  emit('delete', props.tank.id);
  closeDialog();
  toast.add({
    severity: 'success',
    summary: 'Tanque eliminado',
    detail: `El tanque "${props.tank.name}" ha sido eliminado.`,
    life: 3000
  });
};
</script>

<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '25rem' }">
    <template #header>
      <h5>Eliminar tanque de agua</h5>
    </template>
    <main>
      <p>¿Estás seguro de que deseas eliminar el tanque <strong>{{ props.tank.name }}</strong>? Esta acción no se puede deshacer.</p>
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
h5 {
  margin: 0;
}
.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '25rem' }">
    <template #header>
      <div class="flex flex-column">
        <h4 class="m-1">Añadir tanque</h4>
        <p class="m-1">Datos del tanque</p>
      </div>
    </template>
    <div class="flex items-center mb-4">
      <pv-ifta-label style="margin: 0 auto; width: 80%;">
        <pv-input-text id="name" style="width: 100%;" v-model="name" />
        <label for="name" class="font-semibold w-24">Nombre</label>
      </pv-ifta-label>
    </div>
    <div class="flex items-center mb-4">
      <pv-ifta-label style="margin: 0 auto; width: 80%;">
        <pv-input-number id="totalLiters"
                         style="width: 100%;"
                         v-model="totalLiters"
                         :min="0" />
        <label for="totalLiters" class="font-semibold w-24">Capacidad máxima de agua (Litros)</label>
      </pv-ifta-label>
    </div>
    <template #footer>
      <div class="flex flex-row gap-4 w-full justify-content-center">
        <pv-button label="Cancelar" severity="danger" @click="closeDialog" />
        <pv-button label="Añadir" style="width: 6rem" @click="handleSave" />
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
import {Tank} from "../models/tank.entity";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  }
})

const emit = defineEmits(['update:visible', 'save']);

const name = ref('');
const totalLiters = ref(0);
const localVisible = ref(props.visible);
const toast = useToast();

watch(() => props.visible, (val) => {
  localVisible.value = val;
});
watch(localVisible, (val) => {
  emit('update:visible', val);
  if (!val) {
    name.value = '';
    totalLiters.value = null;
  }
});

const closeDialog = () => {
  localVisible.value = false;
};

const handleSave = () => {
  if (!name.value || totalLiters.value === null || totalLiters.value < 0) {
    alert('Por favor completa todos los campos correctamente.');
    return;
  }
  emit('save', new Tank(0, name.value, totalLiters.value, totalLiters.value));
  closeDialog();
  toast.add({ severity: 'success', summary: 'Cultivo añadido', detail: `El cultivo "${name.value}" se ha añadido exitosamente.`, life: 3000 });
};
</script>

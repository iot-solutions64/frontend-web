<script setup lang="ts">
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { WaterTankResponse } from "@/irrigation/models/water-tank.response.entity";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  tank: {
    type: Object as () => WaterTankResponse,
    required: true,
  },
});

const emit = defineEmits(['update:visible', 'save']);

const name = ref('');
const maxWaterCapacity = ref(0);
const localVisible = ref(props.visible);
const error = ref(false);
const toast = useToast();

watch(() => props.visible, (val) => {
  localVisible.value = val;
  if (val) {
    name.value = props.tank.name;
    maxWaterCapacity.value = props.tank.maxWaterCapacity;
  }
});

watch(localVisible, (val) => {
  emit('update:visible', val);
  if (!val) {
    name.value = '';
    maxWaterCapacity.value = 0;
  }
});

const closeDialog = () => {
  localVisible.value = false;
};

const handleSave = () => {
  error.value = false;
  if (!name.value || maxWaterCapacity.value <= 0 || props.tank.waterAmountRemaining > maxWaterCapacity.value) {
    error.value = true;
    return;
  }

  const updatedTank = new WaterTankResponse(
      props.tank.id,
      name.value,
      props.tank.waterAmountRemaining,
      maxWaterCapacity.value,
      props.tank.status
  );

  emit('save', updatedTank);
  closeDialog();
  toast.add({
    severity: 'success',
    summary: 'Tanque actualizado',
    detail: `El tanque "${name.value}" se ha actualizado exitosamente.`,
    life: 3000
  });
};
</script>

<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '25rem' }">
    <template #header>
      <div class="flex flex-column">
        <h5 class="m-1">Editar tanque</h5>
        <span class="m-1">Datos del tanque</span>
      </div>
    </template>

    <p class="error" v-if="error">Por favor completa todos los campos correctamente.</p>

    <div class="flex items-center mb-4">
      <pv-ifta-label style="margin: 0 auto; width: 100%;">
        <pv-input-text id="name" style="width: 100%;" v-model="name" />
        <label for="name" class="font-semibold w-24">Nombre</label>
      </pv-ifta-label>
    </div>

    <div class="flex items-center mb-4">
      <pv-ifta-label style="margin: 0 auto; width: 100%;">
        <pv-input-number id="totalLiters" style="width: 100%;" v-model="maxWaterCapacity" :min="0" />
        <label for="totalLiters" class="font-semibold w-24">Capacidad máxima (Litros)</label>
      </pv-ifta-label>
    </div>

    <template #footer>
      <div class="flex flex-row gap-4 w-full justify-content-center">
        <pv-button label="Cancelar" severity="danger" @click="closeDialog" />
        <pv-button label="Guardar" style="width: 6rem" @click="handleSave" />
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>
.error {
  color: var(--error-color);
  text-align: center;
  font-weight: 400;
}
</style>
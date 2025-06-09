<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import { useToast } from 'primevue/usetoast';
import { Crop } from "../models/crop.entity.js";

const props = defineProps({
  visible: Boolean,
  crop: Crop,
  tanks: Array
});
const emit = defineEmits(['update:visible', 'save']);

const localVisible = ref(props.visible);
const name = ref('');
const maxQuantity = ref(0);
const tank = ref(null);
const step = ref(1);
const error = ref(false);
const toast = useToast();

watch(() => props.visible, (val) => {
  localVisible.value = val;
  if (val) {
    name.value = props.crop.name;
    maxQuantity.value = props.crop.maxLiters;
    tank.value = props.tanks.find(t => t.id === props.crop.tankId) ?? null;
  }
});

watch(localVisible, (val) => {
  emit('update:visible', val);
  if (!val) {
    name.value = '';
    maxQuantity.value = null;
    tank.value = null;
    step.value = 1;
    error.value = false;
  }
});

const closeDialog = () => {
  localVisible.value = false;
};

const goToStep1 = () => {
  error.value = false;
  step.value = 1;
};

const goToStep2 = () => {
  error.value = false;
  if (!name.value) {
    error.value = true;
    return;
  }
  step.value = 2;
};

const handleSave = () => {
  error.value = false;
  if (!tank.value || maxQuantity.value === null || maxQuantity.value < 0) {
    error.value = true;
    return;
  }
  emit('save', new Crop(props.crop.id, name.value, maxQuantity.value, props.crop.autoIrrigation, tank.value.id));
  closeDialog();
  toast.add({ severity: 'success', summary: 'Cultivo actualizado', detail: `El cultivo "${name.value}" se ha actualizado exitosamente.`, life: 3000
  });
};

const headerSubtitle = computed(() => (step.value === 1)? 'Datos del cultivo' : 'Datos del regado automático');
const errorMessage = computed(() => (step.value === 1)? 'Por favor ingresa el nombre del cultivo.' : 'Por favor completa los datos del regado correctamente.');


</script>

<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '25rem' }">
    <template #header>
      <div class="flex flex-column">
        <h5 class="m-1">Editar cultivo</h5>
        <p class="m-1">{{headerSubtitle}}</p>
      </div>
    </template>

    <span class="error" v-if="error">{{errorMessage}}</span>
    <main>
      <!-- Step 1: Nombre del cultivo -->
      <div v-if="step === 1" class="flex items-center mb-4">
        <pv-ifta-label style="margin: 0 auto; width: 100%;">
          <pv-input-text id="name" style="width: 100%;" v-model="name" />
          <label for="name" class="font-semibold w-24">Nombre</label>
        </pv-ifta-label>
      </div>

      <!-- Step 2: Regado automático -->
      <div v-else>
        <div class="flex items-center mb-4">
          <pv-ifta-label style="margin: 0 auto; width: 100%;">
            <pv-select v-model="tank" :options="props.tanks" optionLabel="name" placeholder="Selecciona un tanque" style="width: 100%;" />
            <label for="tank" class="font-semibold w-24">Tanque de agua</label>
          </pv-ifta-label>
        </div>
        <div class="flex items-center mb-4">
          <pv-ifta-label style="margin: 0 auto; width: 100%;">
            <pv-input-number id="maxQuantity" style="width: 100%;" v-model="maxQuantity" :min="0" />
            <label for="maxQuantity" class="font-semibold w-24">Máx. litros de agua</label>
          </pv-ifta-label>
        </div>
      </div>
    </main>
    <template #footer>
      <div class="flex flex-row gap-4 w-full justify-content-center">
        <pv-button v-if="step === 1" label="Cancelar" severity="danger" @click="closeDialog" />
        <pv-button v-if="step === 1" label="Siguiente" style="width: 6rem" @click="goToStep2" />
        <pv-button v-if="step === 2" label="Atrás" severity="secondary" style="width: 6rem" @click="goToStep1" />
        <pv-button v-if="step === 2" label="Guardar" style="width: 6rem" @click="handleSave" />
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>
h4 {
  margin: 1rem;
}
.error {
  color: var(--error-color);
  text-align: center;
  font-weight: 400;
}
</style>
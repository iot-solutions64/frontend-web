<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import TemperatureIcon from "@/shared/custom-icons/Temperature.icon.vue";
import WaterDropIcon from "@/shared/custom-icons/WaterDrop.icon.vue";
import { CropDetailedResponse } from "@/soil/models/crop-detailed.response.entity";

const props = defineProps<{
  visible: boolean;
  crop: CropDetailedResponse;
}>();
const emit = defineEmits(['update:visible', 'save']);

const localVisible = ref(props.visible);
const temperatureMinThreshold = ref(0);
const temperatureMaxThreshold = ref(0);
const humidityMinThreshold = ref(0);
const humidityMaxThreshold = ref(0);
const error = ref(false);
const toast = useToast();

watch(() => props.visible, (val) => {
  localVisible.value = val;
  if (val) {
    temperatureMinThreshold.value = props.crop.temperatureMinThreshold;
    temperatureMaxThreshold.value = props.crop.temperatureMaxThreshold;
    humidityMinThreshold.value = props.crop.humidityMinThreshold;
    humidityMaxThreshold.value = props.crop.humidityMaxThreshold;
  }
});

watch(localVisible, (val) => {
  emit('update:visible', val);
  if (!val) {
    temperatureMinThreshold.value = 0;
    temperatureMaxThreshold.value = 0;
    humidityMinThreshold.value = 0;
    humidityMaxThreshold.value = 0;
    error.value = false;
  }
});

const closeDialog = () => {
  localVisible.value = false;
};

const handleSave = () => {
  error.value = false;
  if (temperatureMinThreshold.value >= temperatureMaxThreshold.value || humidityMinThreshold.value >= humidityMaxThreshold.value) {
    error.value = true;
    return;
  }

  emit('save', new CropDetailedResponse(
      props.crop.cropId,
      props.crop.cropName,
      props.crop.userId,
      props.crop.temperature,
      temperatureMinThreshold.value,
      temperatureMaxThreshold.value,
      props.crop.temperatureStatus,
      props.crop.humidity,
      humidityMinThreshold.value,
      humidityMaxThreshold.value,
      props.crop.humidityStatus,
      props.crop.waterTankName,
      props.crop.waterAmountRemaining,
      props.crop.maxWaterCapacity,
      props.crop.waterTankStatus,
      props.crop.irrigationHourFrequency,
      props.crop.irrigationStartDate,
      props.crop.irrigationStartTime,
      props.crop.irrigationDisallowedStartTime,
      props.crop.irrigationDisallowedEndTime,
      props.crop.irrigationDurationInMinutes,
      props.crop.irrigationStatus,
      props.crop.irrigationMaxWaterUsage
  ));
  closeDialog();
  toast.add({ severity: 'success', summary: 'Cultivo actualizado', detail: `Umbrales actualizados correctamente.`, life: 3000 });
};

const errorMessage = computed(() => 'El valor máximo debe ser mayor al mínimo.');
</script>

<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '40rem' }">
    <template #header>
      <div class="flex flex-column">
        <h5 class="m-1">Editar cultivo</h5>
        <span class="m-1">Límites de Temperatura y Humedad</span>
      </div>
    </template>

    <main class="section-2">
      <aside>
        <h5>Temperatura</h5>
        <main>
          <TemperatureIcon height="70px" width="70px" />
          <div class="section-2-inputs">
            <pv-ifta-label style="margin: 0 auto; width: 100%;">
              <pv-input-number v-model="temperatureMinThreshold" :min="0" :max="100" style="width: 100%;" />
              <label class="font-semibold">Min</label>
            </pv-ifta-label>
            <pv-ifta-label style="margin: 0 auto; width: 100%;">
              <pv-input-number v-model="temperatureMaxThreshold" :min="0" :max="100" style="width: 100%;" />
              <label class="font-semibold">Máx</label>
            </pv-ifta-label>
          </div>
        </main>
      </aside>

      <aside>
        <h5>Humedad</h5>
        <main>
          <WaterDropIcon height="70px" width="70px" />
          <div class="section-2-inputs">
            <pv-ifta-label style="margin: 0 auto; width: 100%;">
              <pv-input-number v-model="humidityMinThreshold" :min="0" :max="100" style="width: 100%;" />
              <label class="font-semibold">Min</label>
            </pv-ifta-label>
            <pv-ifta-label style="margin: 0 auto; width: 100%;">
              <pv-input-number v-model="humidityMaxThreshold" :min="0" :max="100" style="width: 100%;" />
              <label class="font-semibold">Máx</label>
            </pv-ifta-label>
          </div>
        </main>
      </aside>
    </main>

    <div class="flex flex-column align-items-center mt-4">
      <span class="error" v-if="error">{{ errorMessage }}</span>
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
.section-2 {
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 2rem;
}

.section-2 > aside {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
}

.section-2 > aside > main {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  gap: 1rem;
}

.section-2-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error {
  color: var(--error-color);
  text-align: center;
  font-weight: 400;
}
</style>
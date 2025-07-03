<script setup lang="ts">
import {computed, PropType, ref, watch} from 'vue';
import { useToast } from 'primevue/usetoast';
import { Crop } from "../models/crop.entity.js";
import TemperatureIcon from "@/shared/custom-icons/Temperature.icon.vue";
import WaterDropIcon from "@/shared/custom-icons/WaterDrop.icon.vue";
import {Tank} from "@/irrigation/models/tank.entity";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  tanks: {
    type: Array as PropType<Tank[]>,
    required: true,
  }
});

const emit = defineEmits(['update:visible', 'save']);

//Crop Data
const name = ref("");
const tank = ref<Tank | null>();

//Temperature Data
const temperatureMinThreshold = ref(0);
const temperatureMaxThreshold = ref(0);

//Humidity Data
const humidityMinThreshold = ref(0);
const humidityMaxThreshold = ref(0);

//Irrigation Data
const hourFrequency = ref(0);
const irrigationStartDate = ref(""); //Date
const irrigationStartTime = ref(""); //Time
const irrigationDisallowedStartTime = ref(""); //Time
const irrigationDisallowedEndTime = ref(""); //Time
const irrigationDurationInMinutes = ref(0);
const irrigationMaxWaterUsage = ref(0);

//Other
const page = ref(1);
const maxPages = 4;
const wasConfirmButtonPressed = ref(false);

const maxQuantity = ref(0);
const localVisible = ref(props.visible);
const toast = useToast();

watch(() => props.visible, (val) => {
  localVisible.value = val;
});
watch(localVisible, (val) => {
  emit('update:visible', val);
  if (!val) {
    name.value = '';
    tank.value = null;
    maxQuantity.value = 0;
    page.value = 1;
  }
});

const closeDialog = () => {
  wasConfirmButtonPressed.value = false;
  localVisible.value = false;
};

const handleSave = () => {
  wasConfirmButtonPressed.value = false;
  if (error.value) return;
  if (!tank.value) return;
  emit('save', new Crop(0, name.value, maxQuantity.value, false, tank.value.id));
  closeDialog();
  toast.add({ severity: 'success', summary: 'Cultivo añadido', detail: `El cultivo "${name.value}" se ha añadido exitosamente.`, life: 3000 });
};

const headerSubtitle = computed(() => {
  const pageNumber: Number = page.value;
  let pageSubtitle: string;
  switch(pageNumber){
    case 1: pageSubtitle = "Nombre del Cultivo"; break;
    case 2: pageSubtitle = "Temperatura y Humedad"; break;
    case 3: pageSubtitle = "Regado Automático"; break;
    case 4: pageSubtitle = "Tanque de Agua"; break;
    default: pageSubtitle = "Página no encontrada"; break;
  }
  return pageSubtitle;
});
const errorMessage = computed(() => {
  const pageNumber: Number = page.value;
  let pageError: string;
  switch(pageNumber){
    case 1: pageError = "Ingrese el nombre del cultivo"; break;
    case 2: pageError = "El valor máximo debe ser mayor al mínimo"; break;
    case 3: pageError = "Complete todos los campos"; break;
    case 4: pageError = "Asigne un tanque de agua"; break;
    default: pageError = "ERROR"; break;
  }
  return pageError;
});
const error = computed(() => {
  if(!wasConfirmButtonPressed.value) return;

  switch(page.value){
    case 1:
      if(name.value === "") return true;
      break;
    case 2:
      if(
          (temperatureMinThreshold.value > temperatureMaxThreshold.value) ||
          (humidityMinThreshold.value > humidityMaxThreshold.value)
      ) return true;
      break;
    case 3:
      if(
          (hourFrequency.value < 1) ||
          (irrigationStartDate.value === "") ||
          (irrigationStartTime.value === "") ||
          (irrigationDisallowedStartTime.value === "") ||
          (irrigationDisallowedEndTime.value === "") ||
          (irrigationDurationInMinutes.value <= 0) ||
          (irrigationMaxWaterUsage.value <= 0)
      ) return true;
      break;
    case 4:
      if(!tank) return true; break;
    default:
      return false;
  }
});

//Buttons
const showButtonCancel = computed(() => {
  return page.value === 1;
});
const showButtonBefore = computed(() => {
  return page.value !== 1;
});
const showButtonNext = computed(() => {
  return page.value !== maxPages;
});
const showButtonCreate = computed(() => {
  return page.value === maxPages;
});

//Navigation between pages
const goToPageBefore = () => {
  wasConfirmButtonPressed.value = false;
  if(!error.value) page.value--;
}

const goToNextPage = () => {
  wasConfirmButtonPressed.value = true;
  if(!error.value) page.value++;
  console.log(page.value);
};
</script>

<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '40rem' }">
    <template #header>
      <div class="flex flex-column">
        <h5 class="m-1">Añadir cultivo</h5>
        <span class="m-1">{{headerSubtitle}}</span>
      </div>
    </template>
    <span class="error" v-if="error">{{errorMessage}}</span>
    <!--Main Content-->
    <main>
      <!-- Page 1: Nombre del cultivo -->
      <section v-if="page === 1" class="flex items-center mb-4">
        <pv-ifta-label style="margin: 0 auto; width: 100%;">
          <pv-input-text id="name" style="width: 100%;" v-model="name" />
          <label for="name" class="font-semibold w-24">Nombre</label>
        </pv-ifta-label>
      </section>

      <!-- Page 2: Temperatura y Humedad -->
      <section v-if="page === 2" class="section-2">
        <aside>
          <h5>Temperatura</h5>
          <main>
            <TemperatureIcon height="70px" width="70px"/>
            <div class="section-2-inputs">
              <pv-ifta-label style="margin: 0 auto; width: 100%;">
                <pv-input-number id="temp-min" style="width: 100%;" v-model="temperatureMinThreshold"
                                 inputId="intergeronly" :min="0" :max="100"/>
                <label for="temp-min" class="font-semibold w-24">Min</label>
              </pv-ifta-label>
              <pv-ifta-label style="margin: 0 auto; width: 100%;">
                <pv-input-number id="temp-max" style="width: 100%;" v-model="temperatureMaxThreshold"
                                 inputId="intergeronly" :min="0" :max="100"/>
                <label for="temp-max" class="font-semibold w-24">Máx</label>
              </pv-ifta-label>
            </div>
          </main>
        </aside>
        <aside>
          <h5>Humedad</h5>
          <main>
            <WaterDropIcon height="70px" width="70px"/>
            <div class="section-2-inputs">
              <pv-ifta-label style="margin: 0 auto; width: 100%;">
                <pv-input-number id="hum-min" style="width: 100%;" v-model="humidityMinThreshold"
                                 inputId="intergeronly" :min="0" :max="100"/>
                <label for="hum-min" class="font-semibold w-24">Mín</label>
              </pv-ifta-label>
              <pv-ifta-label style="margin: 0 auto; width: 100%;">
                <pv-input-number id="hum-max" style="width: 100%;" v-model="humidityMaxThreshold"
                                 inputId="intergeronly" :min="0" :max="100"/>
                <label for="hum-max" class="font-semibold w-24">Máx</label>
              </pv-ifta-label>
            </div>
          </main>
        </aside>
      </section>

      <!-- Step 2: Regado automático -->
      <div v-if="page === 4">
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
        <pv-button v-if="showButtonCancel" label="Cancelar" severity="danger" @click="closeDialog" />
        <pv-button v-if="showButtonBefore" label="Atrás" severity="secondary" style="width: 6rem" @click="goToPageBefore" />
        <pv-button v-if="showButtonNext" label="Siguiente" style="width: 6rem" @click="goToNextPage" />
        <pv-button v-if="showButtonCreate" label="Añadir" style="width: 6rem" @click="handleSave" />
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>
h4 {
  margin: 1rem;
}

h5 {
  margin: 0;
}

.section-2 {
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 2rem;
}

.section-2>aside {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
}

.section-2>aside>main {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  gap: 1rem;
}

.section-2-inputs{
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
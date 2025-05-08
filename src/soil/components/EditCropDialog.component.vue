<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '25rem' }">
    <template #header>
      <h4>Editar cultivo</h4>
    </template>
    <p v-if="error">Por favor completa todos los campos correctamente.</p>
    <div class="flex items-center mb-4">
      <pv-ifta-label style="margin: 0 auto; width: 80%;">
        <pv-input-text id="name" style="width: 100%;" v-model="name" />
        <label for="name" class="font-semibold w-24">Nombre</label>
      </pv-ifta-label>
    </div>
    <div class="flex items-center mb-4">
      <pv-ifta-label style="margin: 0 auto; width: 80%;">
        <pv-input-number id="maxQuantity"
                         style="width: 100%;"
                         v-model="maxQuantity"
                         :min="0" />
        <label for="maxQuantity" class="font-semibold w-24">Máx. litros de agua</label>
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
h4 {
  margin: 1rem;
}
p {
  color: var(--error-color);
  text-align: center;
  font-weight: 400;
}
</style>

<script setup>
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
  visible: Boolean,
  item: Object,
});
const emit = defineEmits(['update:visible', 'save']);

const name = ref('');
const maxQuantity = ref(0);
const localVisible = ref(props.visible);
const toast = useToast();
const error = ref(false);

watch(() => props.visible, (val) => {
  localVisible.value = val;
  if (val) {
    name.value = props.item.name;
    maxQuantity.value = props.item.maxLiters;
  }
});
watch(localVisible, (val) => {
  emit('update:visible', val);
  if (!val) {
    name.value = '';
    maxQuantity.value = null;
  }
});

const closeDialog = () => {
  localVisible.value = false;
};

const handleSave = () => {
  error.value = false;
  if (!name.value || maxQuantity.value === null || maxQuantity.value < 0) {
    error.value = true;
    return;
  }
  emit('save', {
    name: name.value,
    maxLiters: maxQuantity.value,
  });
  closeDialog();
  toast.add({ severity: 'success', summary: 'Cultivo actualizado', detail: `El cultivo "${name.value}" se ha actualizado exitosamente.`, life: 3000 });
};
</script>

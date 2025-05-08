<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '25rem' }">
    <template #header>
      <h4>Añadir cultivo</h4>
    </template>
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

<script setup>
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(['update:visible', 'save']);

const name = ref('');
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
    maxQuantity.value = null;
  }
});

const closeDialog = () => {
  localVisible.value = false;
};

const handleSave = () => {
  if (!name.value || maxQuantity.value === null || maxQuantity.value < 0) {
    alert('Por favor completa todos los campos correctamente.');
    return;
  }
  emit('save', {
    name: name.value,
    maxLiters: maxQuantity.value,
  });
  closeDialog();
  toast.add({ severity: 'success', summary: 'Cultivo añadido', detail: `El cultivo "${name.value}" se ha añadido exitosamente.`, life: 3000 });
};
</script>

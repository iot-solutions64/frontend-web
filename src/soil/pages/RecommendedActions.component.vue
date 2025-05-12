<script setup lang="ts">
import router from "../../shared/router/index.js";
import {onMounted, ref} from "vue";
import {HUMIDITY_SUGGESTIONS} from "../constants/humidity-suggestions.constant";
import {TEMPERATURE_SUGGESTIONS} from "../constants/temperature-suggestions.constant";

const id = ref(0);
const isHumidity = ref(false);
const status = ref('');
const suggestions = ref([]);
onMounted(() => {
  id.value = Number(router.currentRoute.value.params.id);
  isHumidity.value = router.currentRoute.value.fullPath.includes('humidity');
  // TODO: Get the status from the API with the id
  status.value = 'UNFAVORABLE_OVER';
  if (isHumidity.value) {
    suggestions.value = HUMIDITY_SUGGESTIONS[status.value].videos;
  } else {
    suggestions.value = TEMPERATURE_SUGGESTIONS[status.value].videos;
  }
})

const getYoutubeId = (url: string) => {
  const match = url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : '';
};

const openVideo = (url: string) => {
  window.open(url, '_blank');
};

</script>

<template>
  <div class="flex align-items-center m-3 mb-6">
    <pv-button icon="pi pi-arrow-left"
               @click="router.back()"
               aria-label="Volver"
               class="mr-2"/>
    <h3 class="m-0 text-center flex-grow-1">Acciones recomendadas</h3>
  </div>
  <h5 class="text-center font-normal">Te recomendamos estos tutoriales en base a los problemas detectados</h5>
  <div class="flex justify-content-center gap-4 flex-wrap">
    <div id="video" v-for="(video, index) in suggestions" :key="index" class="text-center flex flex-column w-6 lg:w-4 xl:w-3">
      <h6>{{video.title}}</h6>
      <img :src="'https://img.youtube.com/vi/' + getYoutubeId(video.url) + '/0.jpg'"
           alt="Video thumbnail" id="video-image" class="border-round-xl shadow-2 mb-3"/>
      <pv-button label="Ver video" icon="pi pi-play" class="mb-1 w-10rem mx-auto" @click="openVideo(video.url)"/>
    </div>
  </div>
</template>

<style scoped>
#video h6 {
  min-height: 3rem;
  margin: 1rem;
}
#video-image{
  object-fit: contain;
}
</style>
<script setup lang="ts">
import router from "../../shared/router";
import {onMounted, ref} from "vue";
import {HUMIDITY_SUGGESTIONS} from "../constants/humidity-suggestions.constant";
import {TEMPERATURE_SUGGESTIONS} from "../constants/temperature-suggestions.constant";
import DefaultHeader from "../../shared/components/DefaultHeader.component.vue";

const id = ref(0);
const isHumidity = ref(false);
const status = ref('');
const suggestions = ref<{title: string, url: string}[]>([]);
onMounted(() => {
  id.value = Number(router.currentRoute.value.params.id);
  isHumidity.value = router.currentRoute.value.fullPath.includes('humidity');
  // TODO: Get the status from the API with the id
  switch (id.value) {
    case 1:
      status.value = 'FAVORABLE';
      break;
    case 2:
      status.value = 'SLIGHTLY_UNFAVORABLE_UNDER';
      break;
    case 3:
      status.value = 'SLIGHTLY_UNFAVORABLE_OVER';
      break;
    case 4:
      status.value = 'UNFAVORABLE_UNDER';
      break;
    case 5:
      status.value = 'UNFAVORABLE_OVER';
      break;
  }
  if (isHumidity.value) {
    switch(id.value) {
      case 6:
        status.value = 'FLOODED';
        break;
      case 7:
        status.value = 'DRY';
        break;
    }
    suggestions.value = HUMIDITY_SUGGESTIONS[status.value as keyof typeof HUMIDITY_SUGGESTIONS].videos;
  } else {
    switch(id.value) {
      case 6:
        status.value = 'BURNING';
        break;
      case 7:
        status.value = 'FREEZING';
        break;
    }
    suggestions.value = TEMPERATURE_SUGGESTIONS[status.value as keyof typeof TEMPERATURE_SUGGESTIONS].videos;
  }
})

const getYoutubeId = (url: string) => {
  const match = url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : '';
};

const openVideo = (url: string) => {
  window.open(url, '_blank');
};

</script>

<template>
  <DefaultHeader
      title="Acciones Recomendadas"
      subtitle="Te recomendamos estos tutoriales en base a los problemas detectados"
      :show-back-button="true"
  />
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
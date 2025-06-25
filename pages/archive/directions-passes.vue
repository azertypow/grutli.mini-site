<template>
  <section class="v-archive-directions-passes"
  >
    <h1 class="v-archive-directions-passes__title" style="margin-bottom: 2rem">Directions passées</h1>
    <div class="v-archive-directions-passes__wrap">

      <a class="v-archive-directions-passes__wrap__item"
         target="_blank"
         href="https://2024.grutli.ch/"
      >
        <p  class="v-archive-directions-passes__wrap__item__info">2018-2024</p>
        <h2 class="v-archive-directions-passes__wrap__item__title">Barbara Giongo & Nataly Sugnaux Hernandez</h2>
      </a>

      <a class="v-archive-directions-passes__wrap__item"
         href="https://2018.grutli.ch/"
         target="_blank"
      >
        <p  class="v-archive-directions-passes__wrap__item__info">2012-2018</p>
        <h2 class="v-archive-directions-passes__wrap__item__title">Frédéric Polier</h2>
      </a>

      <a class="v-archive-directions-passes__wrap__item"
         href="data:text/html,%3Chtml%3E%3Cbody%20style%3D%22font-family%3A%20sans-serif%3B%20margin%3A%202rem%3B%22%3E%3Ch1%3EArchivage%20en%20cours%3C%2Fh1%3E%3C%2Fbody%3E%3C%2Fhtml%3E"
         target="_blank"
      >
        <p  class="v-archive-directions-passes__wrap__item__info">2009-2012</p>
        <h2 class="v-archive-directions-passes__wrap__item__title">Michèle Pralong<br>et Maya Bösch</h2>
      </a>

    </div>
  </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import {useCurrentPageForNavLinks} from "~/composables/cmsData";

const props = defineProps<{
  message?: string
}>()

useHead({
  title: 'Directions passées des Scènes du Grutli',
})

onMounted(() => {
    useCurrentPageForNavLinks().value = null
})

</script>





<style lang="scss" scoped >
.v-archive-directions-passes {
  padding-bottom: calc( var(--v-audio-player-header-height) + var(--app-gutter-xl) );
}

.v-archive-directions-passes__title {
  text-align: center;
}

.v-archive-directions-passes__wrap {
  display: flex;
  gap: var(--app-gutter-xl);
  flex-wrap: wrap;
}

.v-archive-directions-passes__wrap__item {
  width: 100%;
  max-width: calc( ( (100% + var(--app-gutter-xl) ) / 3) - var(--app-gutter-xl));
  color: black;
  display: flex;
  align-items: center;
  background: var(--app-bg-glow-color);
  backdrop-filter: var(--app-bg-glow-filter);
  box-sizing: border-box;
  padding: var(--app-gutter);
  border-radius: 1rem;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  position: relative;
  height: auto;
  text-decoration: none;
  overflow: hidden;
  min-height: 8rem;

  .nuxt-watch-falk-is-active & {
    background: white;
    color: black;
    border: solid 1px;
  }

  @media (max-width: 1100px) {
    height: auto;
  }
}

.v-archive-directions-passes__wrap__item__title {
  font-size: 1rem;
  margin: 0;
}

.v-archive-directions-passes__wrap__item__info {
  margin-bottom: 0;
  margin-top: 1em;
  position: absolute;
  top: 0;
}


</style>

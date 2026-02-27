<template>
  <section class="v-archive-directions-passes"
  >
    <h1 class="v-archive-directions-passes__title" style="margin-bottom: 2rem">Directions passées</h1>
    <div class="v-archive-directions-passes__wrap">
      <a class="v-archive-directions-passes__wrap__item"
         v-for="archive in archives"
         :href="archive.url"
         target="_blank"
      >
        <p  class="v-archive-directions-passes__wrap__item__info">{{archive.date}}</p>
        <h2 class="v-archive-directions-passes__wrap__item__title">{{archive.title}}</h2>
      </a>

    </div>
  </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import {useCurrentPageForNavLinks} from "~/composables/cmsData";
import {fetchPage} from "~/utlis/apiCmsFetch";
import type {ApiSimplePage} from "~/utlis/ApiCmsTypes";

const props = defineProps<{
  message?: string
}>()

useHead({
  title: 'Directions passées des Scènes du Grutli',
})

const archives: Ref<{
  date: string
  id: string
  title: string
  url: string
}[]> = ref([])

onMounted(() => {
    fetchPage('archives').then(async (value: ApiSimplePage | null) => {
      console.log('value', value)
      if (value) archives.value = value.pageContent.content.archives as any
    })

    useCurrentPageForNavLinks().value = null

})

</script>





<style lang="scss" scoped >
.v-archive-directions-passes {
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
  margin: 0;
}

.v-archive-directions-passes__wrap__item__info {
  margin-bottom: 0;
  margin-top: 1em;
  position: absolute;
  top: 0;
}


</style>

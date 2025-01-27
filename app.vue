<template>
  <div class="app-app"
       :class="useRouter().currentRoute.value.name"
  >
    <div class="app-app__header">
      <AppHeader/>
    </div>
    <div class="app-app__content">
      <NuxtPage/>
    </div>

    <AudioPlayer/>

    <div class="app-app__news"
         v-if="newsList"
    >
      <div v-for="news of newsListToShow"
           @click="toggleItemState(news.id)"
      >
        {{news.text}}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-app {
  padding-top: var(--app-header-height);
  width: 100%;
  padding-bottom: calc( v-bind(numberOfOpenNews) * 1rem);
}

.app-app__header {
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
}

.app-app__content {
  max-width: 75rem;
  margin: auto;
}

.app-app__news {
  position: fixed;
  bottom: var(--v-audio-player-header-height);
  width: 100%;
  left: 0;
  line-height: 1rem;
  font-size: .65rem;
  user-select: none;

  > div {
    box-sizing: border-box;
    padding-left: var(--app-gutter-xl);
    padding-right: var(--app-gutter-xl);
    white-space: nowrap;
  }

  > div:nth-child(1n) {
    background: var(--app-color-purple);
  }

  > div:nth-child(2n) {
    background: var(--app-color-grey);
  }

  > div:nth-child(3n) {
    background: var(--app-color-orange);
  }
}
</style>

<script setup lang="ts">
import {fetchNews, fetchPlacesInfo, fetchSiteInfo} from "~/utlis/apiCmsFetch";
import {
    type AppNewsItem,
    useFalkIsActive,
    useNews,
    usePlacesInfo,
    useSiteInfo
} from "~/composables/cmsData";
import items from "@redocly/ajv/lib/vocabularies/applicator/items";

onMounted(async () => {

    fetchSiteInfo().then(value => useSiteInfo().value = value)

    fetchPlacesInfo().then(value => usePlacesInfo().value = value)

    fetchNews().then(value => {

        if( !value ) return

        useNews().value = value.value.map(items => {
            return {
                link: items.link,
                text: items.text,
                id: items.id,
                isOpen: true,
            }
        })
    })
})

watch(useFalkIsActive, (value) => {
    value.value ?
        document.documentElement.classList.add('nuxt-watch-falk-is-active')
        : document.documentElement.classList.remove('nuxt-watch-falk-is-active')
})

const newsList = useNews()
const numberOfOpenNews = computed(() => newsList.value?.filter(item => item.isOpen).length)
const newsListToShow = computed(() => newsList.value?.filter(item => item.isOpen))

const toggleItemState = (id: string) => {
    const item = newsList.value?.find((item) => item.id === id)
    if (item) {
        item.isOpen = false
    }
}
</script>

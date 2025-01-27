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
         v-if="useNews().value?.value.length"
    >
      <div v-for="news of useNews().value?.value">
        {{news.text}}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-app {
  padding-top: var(--app-header-height);
  width: 100%;
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
  line-height: .75rem;
  font-size: .65rem;

  > div {
    box-sizing: border-box;
    padding-left: var(--app-gutter-xl);
    padding-right: var(--app-gutter-xl);
  }

  > div:nth-child(1n) {
    background: var(--app-color-purple);
  }

  > div:nth-child(2n) {
    background: var(--app-color-grey);
  }
}
</style>

<script setup lang="ts">
import {fetchNews, fetchPlacesInfo, fetchSiteInfo} from "~/utlis/apiCmsFetch";
import {useFalkIsActive, useMenuIsOpen, useNews, usePlacesInfo, useSiteInfo} from "~/composables/cmsData";

onMounted(async () => {
    useSiteInfo().value = await fetchSiteInfo()
    usePlacesInfo().value = await fetchPlacesInfo()
    useNews().value = await fetchNews()
})

watch(useFalkIsActive, (value) => {
    value.value ?
        document.documentElement.classList.add('nuxt-watch-falk-is-active')
        : document.documentElement.classList.remove('nuxt-watch-falk-is-active')
})

useRouter().afterEach(() => {
    useMenuIsOpen().value = false
})

</script>

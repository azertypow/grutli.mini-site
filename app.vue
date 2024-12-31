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
</style>

<script setup lang="ts">
import {fetchSiteInfo} from "~/utlis/apiCmsFetch";
import {useFalkIsActive, useMenuIsOpen, useSiteInfo} from "~/composables/cmsData";

onMounted(async () => {
    useSiteInfo().value = await fetchSiteInfo()
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

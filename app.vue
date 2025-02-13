<template>
  <div class="app-app"
       :class="useRouter().currentRoute.value.name"
  >
    <div class="app-app__header"
         :class="{
              'window-is-scroll-to-bottom': windowIsScrollToBottom,
          }"
    >
      <AppHeader/>
    </div>
    <div class="app-app__content">
      <NuxtPage/>
    </div>

    <AudioPlayer/>

    <div class="app-app__news"
         v-if="newsList && useRouter().currentRoute.value.path === '/'"
    >
      <div class="app-app__news__wrap__container"
           v-for="news of newsListToShow"
           @click="toggleItemState(news.id)"
      >
        <div class="app-app__news__wrap__container__wrap">
          <div>{{ news.text }}</div>
          <div>{{ news.text }}</div>
          <div>{{ news.text }}</div>
          <div>{{ news.text }}</div>
        </div>
        <svg class="app-app__news__wrap__container__close-ui"
             xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
      </div>
    </div>

    <video class="app-app__video-bg"
           src="/videos/250128_Grutli_video-bg_op1_4-12.mp4"
           muted
           loop
           autoplay
           playsinline
           poster="/videos/250128_Grutli_video-bg_op1_4-12.jpg"
    />
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
  transition: opacity .25s ease-out;
  opacity: 1;
  pointer-events: initial;

  &.window-is-scroll-to-bottom {
    opacity: 0;
    pointer-events: none !important;
  }
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
}

.app-app__news__wrap__container {
  box-sizing: border-box;
  padding-left: var(--app-gutter-xl);
  padding-right: var(--app-gutter-xl);
  white-space: nowrap;
  position: relative;
  height: 1rem;
  overflow: hidden;

  &:nth-child(1n) {
    background: var(--app-color-purple);
    .app-app__news__wrap__container__close-ui {
      background: var(--app-color-purple);
      box-shadow: 0 0 10px 10px var(--app-color-purple);
    }
  }

  &:nth-child(2n) {
    background: var(--app-color-grey);
    .app-app__news__wrap__container__close-ui {
      background: var(--app-color-grey);
      box-shadow: 0 0 10px 10px var(--app-color-grey);
    }
  }

  &:nth-child(3n) {
    background: var(--app-color-orange);
    .app-app__news__wrap__container__close-ui {
      background: var(--app-color-orange);
      box-shadow: 0 0 10px 10px var(--app-color-orange);
    }
  }
}

.app-app__news__wrap__container__wrap {
  display: flex;
  animation: app-app__news__wrap--animation linear 20s infinite;
  overflow: hidden;
  width: auto;
  flex-wrap: nowrap;
  position: absolute;


  > * {
    width: auto;
    white-space: nowrap;
    padding-right: 1rem;
  }
}

.app-app__news__wrap__container__close-ui {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: auto;
  z-index: 10;
  background: white;
}


@keyframes app-app__news__wrap--animation {
  0% {
    transform: translate(0%, 0%);
  }
  100% {
    transform: translate(-25%, 0%);
  }
}

.app-app__video-bg {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;
  user-select: none;
}

</style>

<script setup lang="ts">
import {fetchNews, fetchPlacesInfo, fetchSiteInfo} from "~/utlis/apiCmsFetch";
import {
    type AppNewsItem,
    useFalkIsActive,
    useNews,
    usePlacesInfo,
    useSiteInfo, useWindowIsScrollToBottom
} from "~/composables/cmsData";

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

const windowIsScrollToBottom = useWindowIsScrollToBottom()

const toggleItemState = (id: string) => {
    const item = newsList.value?.find((item) => item.id === id)
    if (item) {
        item.isOpen = false
    }
}

// pause 0
// frame 108
// fin
// on attend entre 3 et 5 sec
</script>

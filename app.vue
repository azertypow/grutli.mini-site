<template>
  <div class="app-app"
       :class="useRouter().currentRoute.value.name"
  >
    <transition name="v-fade">
        <div class="app-app__loader-container" v-if=" !useAppContentIsLoaded().value ">
          <img class="app-app__loader-container__img"
               src="/loader.gif"/>
        </div>
    </transition>

    <template v-if=" useAppContentIsLoaded().value ">
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

      <div class="app-app__cookie" v-if="showCookies">
        <div>
          <div>
            En poursuivant la navigation sur ce site, vous acceptez l’utilisation des cookies tiers liés à la plateforme tel que YouTube, SoundCloud, etc.
          </div>
          <div>
            <div class="app-button-grey" @click="showCookies = false" >refuser</div>
            <div class="app-button-grey" @click="showCookies = false" >accepter</div>
          </div>
        </div>
      </div>

      <div class="app-app__news"
           v-if="newsList && useRouter().currentRoute.value.path === '/'"
      >
        <template
                v-for="news of newsListToShow"
        >
          <template v-if="news.link && news.link.length > 0" >
            <a class="app-app__news__wrap__container"
               :href="news.link"
            >
              <div class="app-app__news__wrap__container__wrap">
                <div>{{ news.text }}</div>
                <div>{{ news.text }}</div>
                <div>{{ news.text }}</div>
                <div>{{ news.text }}</div>
              </div>
              <svg class="app-app__news__wrap__container__close-ui"
                   @click="toggleItemState(news.id)"
                   xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
              </svg>
            </a>
          </template>
          <template v-else>
            <div class="app-app__news__wrap__container"
            >
              <div class="app-app__news__wrap__container__wrap">
                <div>{{ news.text }}</div>
                <div>{{ news.text }}</div>
                <div>{{ news.text }}</div>
                <div>{{ news.text }}</div>
              </div>
              <svg class="app-app__news__wrap__container__close-ui"
                   @click="toggleItemState(news.id)"
                   xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
              </svg>
            </div>
          </template>
        </template>
      </div>

      <video class="app-app__video-bg"
             src="/videos/250128_Grutli_video-bg_op1_4-12.mp4"
             muted
             loop
             autoplay
             playsinline
             poster="/videos/250128_Grutli_video-bg_op1_4-12.jpg"
      />
    </template>
  </div>

</template>

<style lang="scss" scoped>
.app-app {
  padding-top: var(--app-header-height);
  width: 100%;
  padding-bottom: calc( v-bind(numberOfOpenNews) * 1rem);
}

.app-app__loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--app-color-grey);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  user-select: none;
}

.app-app__loader-container__img {
  display: block;
  width: 15vw;
  height: auto;
  animation: app-app__intro-animation linear 10s forwards;
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
  max-width: 44rem;
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
  display: block;

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
  animation: app-app__news__wrap--animation linear 40s infinite;
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

//@keyframes app-app__intro-animation {
//  0% {
//    transform: scale(1);
//  }
//  100% {
//    transform: scale(1.5);
//  }
//}

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

// vue transition

//.v-fade-enter-active {
//  transition: background-color 5s ease;
//}
//.v-fade-enter-from {
//  background-color: rgba(255, 255, 255, 0);
//}
//.v-fade-enter-to {
//  background-color: rgba(255, 255, 255, 1);
//}

.v-fade-leave-active {
  transition: background-color .75s ease-in-out;

  .app-app__loader-container__img {
    display: none;
  }
}
.v-fade-leave-from {
  background-color: rgba(199, 199, 199, 1);
}
.v-fade-leave-to {
  background-color: rgba(199, 199, 199, 0);
}

.app-app__cookie {
  position: fixed;
  z-index: 100000;
  bottom: 0;
  left: 0;
  width: 100%;
  //height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: .25rem .25rem 1rem;
  box-sizing: border-box;

  > div {
    max-width: 40rem;
    box-sizing: border-box;
    padding: .5rem 1rem;
    border-radius: 1rem;
    background: var(--app-color-orange);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--app-gutter-xl);
    user-select: none;

    @media (max-width: 900px) {
      flex-direction: column;
    }

    > div {
      cursor: pointer;
      display: flex;
      gap: var(--app-gutter-xl);
    }
  }
}

</style>

<script setup lang="ts">
import {fetchNews, fetchPlacesInfo, fetchSiteInfo} from "~/utlis/apiCmsFetch";
import {
    type AppNewsItem, useAppContentIsLoaded,
    useFalkIsActive,
    useNews,
    usePlacesInfo,
    useSiteInfo, useWindowIsScrollToBottom
} from "~/composables/cmsData";
import {windows} from "../../Library/Caches/deno/npm/registry.npmjs.org/rimraf/5.0.10";
import items from "@redocly/ajv/lib/vocabularies/applicator/items";

const showCookies = ref(true)

onMounted(async () => {

    Promise.all([
      fetchSiteInfo().then(value => useSiteInfo().value = value),

      fetchPlacesInfo().then(value => usePlacesInfo().value = value),

      fetchNews().then(value => {

          if( !value ) return

          useNews().value = value.value
              .filter(item => {
                  return item.show === 'true'
              })
              .map(item => {
                  return {
                      link: item.link,
                      text: item.text,
                      id: item.id,
                      isOpen: true,
                      show: item.show,
                  }
              })
      }),
    ]).then(() => window.setTimeout(() => useAppContentIsLoaded().value = true, 3_000))

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

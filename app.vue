<template>
  <div class="app-app"
       :class="useRouter().currentRoute.value.name"
  >
    <!-- Skip link pour accessibilité clavier -->
    <a href="#main-content" class="skip-link"
       :inert="useAppNewsletterIsOpen().value === true"
       tabindex="1"
    >Aller au contenu principal</a>

    <dialog class="app-app__newsletter-container"
            :open="useAppNewsletterIsOpen().value === true"
            autofocus
            role="alertdialog"
            aria-modal="true"
    >
        <AppNewsletter/>
    </dialog>

    <transition name="v-fade">
        <div class="app-app__loader-container" v-if=" !useAppContentIsLoaded().value " aria-live="polite" aria-label="Chargement du contenu"
             :inert="useAppNewsletterIsOpen().value === true"
        >
          <img class="app-app__loader-container__img"
               src="/loader-20250612.gif"
               aria-hidden="true"
               alt="Chargement en cours"/>
          <p class="app-app__loader-container__text_information_for_reduce_motion">Chargement du contenu…</p>
        </div>
    </transition>

    <template v-if=" useAppContentIsLoaded().value ">
      <header class="app-app__header"
              :class="{
                'window-is-scroll-to-bottom': windowIsScrollToBottom,
              }"
              :inert="useAppNewsletterIsOpen().value === true"
      >
        <AppHeader/>
      </header>
      <main id="main-content" class="app-app__content"
            :inert="useAppNewsletterIsOpen().value === true"
      >
        <NuxtPage/>

        <div class="app-app__content__footer" v-if="useRouter().currentRoute.value.path === '/'">
          <nuxt-link to="plan-du-site" >plan du site</nuxt-link>
        </div>

      </main>

      <AudioPlayer
              v-if="usePlayerAudioParams().value?.soundcloud_url"
              :inert="useAppNewsletterIsOpen().value === true"
      />

      <div class="app-app__cookie" v-if="useShowCookieBanner().value" role="dialog" aria-labelledby="cookie-title" aria-modal="false"
           :inert="useAppNewsletterIsOpen().value === true"
      >
        <div>
          <div id="cookie-title">
            En poursuivant la navigation sur ce site, vous acceptez l'utilisation des cookies tiers liés à la plateforme tel que YouTube, SoundCloud, etc.
          </div>
          <div>
            <button class="app-button-grey" @click="handleCookieBannerClick()" type="button" aria-label="Refuser les cookies">refuser</button>
            <button class="app-button-grey" @click="handleCookieBannerClick()" type="button" aria-label="Accepter les cookies">accepter</button>
          </div>
        </div>
      </div>

      <div class="app-app__news"
           v-if="newsList && !useFalkIsActive().value"
           :inert="useAppNewsletterIsOpen().value === true"
      >
        <template
                v-for="news of newsListToShow"
        >
          <template v-if="news.link && news.link.length > 0" >
            <div class="app-app__news__wrap__container">
              <a class="app-app__news__wrap__container__link"
                 :href="news.link"
                 :target="stringStartWith(
                     news.link,
                     ['https://grutli.ch', 'http://grutli.ch', 'https://www.grutli.ch', 'http://www.grutli.ch'],
                     ) ? '_self': '_blank'"
              >
                <div class="app-app__news__wrap__container__wrap">
                  <div>{{ news.text }}</div>
                  <div>{{ news.text }}</div>
                  <div>{{ news.text }}</div>
                  <div>{{ news.text }}</div>
                </div>
              </a>
              <button class="app-app__news__wrap__container__close-ui"
                      @click="toggleItemState(news.id)"
                      type="button"
                      :aria-label="`Fermer l'annonce : ${news.text}`">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" aria-hidden="true">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
              </button>
            </div>
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
              <button class="app-app__news__wrap__container__close-ui"
                      @click="toggleItemState(news.id)"
                      type="button"
                      :aria-label="`Fermer l'annonce : ${news.text}`">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" aria-hidden="true">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
              </button>
            </div>
          </template>
        </template>
      </div>

      <video class="app-app__video-bg"
             v-if="currentSeason"
              src='/videos/251119_Grutli_web-home_loop.mp4'
             muted
             loop
             autoplay
             playsinline
             ref="videoBackground"
             aria-hidden="true"
             :title="`Vidéo d'ambiance - ${currentSeason[0]?.content.title}`"
             inert
      />
    </template>
  </div>

</template>

<style lang="scss" scoped>
.app-app {
  padding-top: var(--app-header-height);
  width: 100%;

  padding-bottom: calc(
    v-bind(numberOfOpenNews) * 1rem
    + var(--app-gutter-xl)
  );

  .has-player & {
    padding-bottom: calc(
            v-bind(numberOfOpenNews) * 1rem
            + var(--app-gutter-xl)
            + var(--v-audio-player-header-height)
    );
  }

  .player-is-open & {
    padding-bottom: calc(
            v-bind(numberOfOpenNews) * 1rem
            + var(--app-gutter-xl)
            + var(--v-audio-player-total-height)
    );
  }
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
  min-width: 5rem;
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

  .nuxt-watch-falk-is-active & {
    opacity: 1;
    pointer-events: initial !important;
  }
}

.app-app__content {
  max-width: 44rem;
  margin: auto;
}

.app-app__content__footer {
  display: flex;
  justify-content: center;
  font-size: .5rem;
  color: black;
  opacity: .5;
  margin-top: 1rem;

  a {
    text-decoration: none;
  }
}

.app-app__news {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  line-height: 1rem;
  font-size: .65rem;
  user-select: none;
  transition: transform .25s ease-in-out;

  .has-player & {
    bottom: var(--v-audio-player-header-height);
  }

  .player-is-open & {
    --y-translation: calc( var(--v-audio-player-iframe-height) * -1 );
    transform: translate3d(0, var(--y-translation), 0);
  }
}

.app-app__news__wrap__container {
  box-sizing: border-box;
  padding-left: var(--app-gutter);
  padding-right: var(--app-gutter);
  white-space: nowrap;
  position: relative;
  height: 1rem;
  overflow: hidden;
  display: block;

  &:nth-child(1n + 1) {
    background: var(--app-color-primary);
    .app-app__news__wrap__container__close-ui {
      background: var(--app-color-primary);
      box-shadow: 0 0 10px 10px var(--app-color-primary);
    }
  }

  &:nth-child(1n + 2) {
    background: var(--app-color-secondary);
    .app-app__news__wrap__container__close-ui {
      background: var(--app-color-secondary);
      box-shadow: 0 0 10px 10px var(--app-color-secondary);
    }
  }

  &:nth-child(1n + 3) {
    background: var(--app-color-grey);
    .app-app__news__wrap__container__close-ui {
      background: var(--app-color-grey);
      box-shadow: 0 0 10px 10px var(--app-color-grey);
    }
  }
}

.app-app__news__wrap__container__link {
  display: block;
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: auto;
  min-width: 2rem;
  padding: 0 0.25rem;
  z-index: 10;
  background: inherit;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -2px;
  }

  svg {
    display: block;
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

  .nuxt-watch-falk-is-active & {
    display: none !important;
  }
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
    background: var(--app-color-secondary);
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
import {
    fetchNews,
    fetchPage,
    fetchPlacesInfo,
    fetchSeasons,
    fetchSiteInfo,
    fetchTicketServiceInfo
} from "~/utlis/apiCmsFetch";
import {
    useAppContentIsLoaded, useAppSeasons, useAppSeasons_active,
    useFalkIsActive, useMenuIsOpen,
    useNews,
    usePlacesInfo, usePlayerAudioParams, useShowCookieBanner,
    useSiteInfo, useTicketServiceInfo, useWindowIsScrollToBottom, useWindowsWidthIsSmallerThan1200pxCSSBreakpoint
} from "~/composables/cmsData";
import {initGoogleAnalytics} from "~/utlis/googleAnalytics";
import type {ApiSeasons, ApiSeasons_value} from "~/utlis/ApiCmsTypes";
import {stringStartWith} from "~/utlis/stringStartWith";
import {setWindowsWidth} from "~/utlis/setWindowsWidth";
import {handleTimeUpdate, playTimeOutTimer} from "~/utlis/views/app";

const videoBackground = ref<HTMLVideoElement | null>(null)

const seasons = useAppSeasons()

const currentSeason: ComputedRef<null | ApiSeasons_value[]> = computed(() =>
    seasons.value ?
        seasons.value.value.filter(value => value.content.statut === 'en-cours')
        : null
)

function handleCookieBannerClick() {
    useShowCookieBanner().value = false

    if (process.client) {
        localStorage.setItem('useShowCookieBanner', JSON.stringify(false))
    }
}

useRouter().beforeEach((to, from, next) => {

    useMenuIsOpen().value = !useWindowsWidthIsSmallerThan1200pxCSSBreakpoint().value

    next()
})

onMounted(async () => {

    setWindowsWidth( useWindowsWidthIsSmallerThan1200pxCSSBreakpoint )

    if( useWindowsWidthIsSmallerThan1200pxCSSBreakpoint().value ) useMenuIsOpen().value = false


    initGoogleAnalytics()

    window.setTimeout(() => useAppContentIsLoaded().value = true, 5_000)
    Promise.all([
      fetchSiteInfo().then(value => useSiteInfo().value = value),

      fetchTicketServiceInfo().then(value => {
          return useTicketServiceInfo().value = value;
      }),

      fetchPlacesInfo().then(value => usePlacesInfo().value = value),

      fetchSeasons().then(value => {
          useAppSeasons().value = value

          useAppSeasons_active().value = value.value.filter((season: ApiSeasons_value) => season.content.statut === 'en-cours')
      }),

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
    ]).then(() => window.setTimeout(() => useAppContentIsLoaded().value = true, 1_000))

    const storedValue = process.client ? localStorage.getItem('useShowCookieBanner') : null;

    useShowCookieBanner().value = storedValue !== 'false'

    setVideoFrameCallback()
})

window.addEventListener('resize', () => setWindowsWidth( useWindowsWidthIsSmallerThan1200pxCSSBreakpoint ))

watch(useFalkIsActive, (value) => {
    value.value ?
        document.documentElement.classList.add('nuxt-watch-falk-is-active')
        : document.documentElement.classList.remove('nuxt-watch-falk-is-active')
})

const newsletterIsOpen = useAppNewsletterIsOpen();

watch(newsletterIsOpen, (newValue) => {
    if (newValue) {
        document.body.classList.add('newsletter-is-open');
    } else {
        document.body.classList.remove('newsletter-is-open');
    }
});

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

function setVideoFrameCallback() {
    const videoHTMLElement = videoBackground.value

    if (!videoHTMLElement) {
        window.setTimeout(setVideoFrameCallback, 10)
        return
    }

    videoHTMLElement.addEventListener('timeupdate', () => handleTimeUpdate(videoHTMLElement))

    useRouter().beforeEach(() => {
      console.log(videoHTMLElement.paused)
      videoHTMLElement.play()
      videoHTMLElement.playbackRate = 1.5

      if (playTimeOutTimer) {
          console.info('clearTimeout', playTimeOutTimer)
          window.clearTimeout(playTimeOutTimer)
          console.info('clearTimeout', playTimeOutTimer)
      }

      console.log(videoHTMLElement.paused)
    })
}

// function removeVideoListener() {
//     videoBackground.value?.removeEventListener('timeupdate', handleTimeUpdate)
// }

</script>

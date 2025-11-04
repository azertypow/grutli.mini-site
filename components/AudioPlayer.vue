<template>
    <section class="v-audio-player"
             :class="{
                'v-audio-player--is-open': playerIsOpen
             }"
    >
      <div class="v-audio-player__container app-font-extra-small">
        <div class="v-audio-player__container__header">
          <div class="v-audio-player__container__header__title">
            <div class="v-audio-player__container__header__title__text"
                 v-if="soundCloudAudioParams?.text"
            >
              {{soundCloudAudioParams.text}}
            </div>
            <template v-if="soundCloudAudioParams?.transcription_file">
              <div>&ensp;|&ensp;</div>
              <a class="v-audio-player__container__header__title__link"
                 target="_blank"
                 :href="soundCloudAudioParams?.transcription_file"
              >transcription</a>
            </template>
          </div>
          <div class="v-audio-player__container__header__ui">
            <button @click="togglePlayerIsOpen">
              <svg v-if="playerIsOpen"
                      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m136-80-56-56 264-264H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z"
              /></svg>
              <svg v-else
                   xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"/></svg>
            </button>
            <button @click="toggleSoundcloudStatus"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                   height="24px"
                   viewBox="0 -960 960 960"
                   width="24px"
                   fill="#5985E1"
                   v-if="playerIsPaused"
              >
                <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg"
                   height="24px"
                   viewBox="0 -960 960 960"
                   width="24px"
                   fill="#5985E1"
                   v-else
              >
                <path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="v-audio-player__iframe-container">
          <iframe width="100%"
                  ref="player"
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay"
                  :src="`https://w.soundcloud.com/player/?url=${soundCloudAudioUrl_withoutParams}&color=%23ff7f65&auto_play=false&hide_related=false&show_comments=true&show_user=false&show_reposts=false&show_teaser=false&visual=true&show_playcount=false&show_artwork=fase`">
          </iframe>
        </div>
      </div>
    </section>
</template>





<script setup lang="ts">

import type {ApiSoundCloud, ApiSoundCloud_Widget} from "~/utlis/ApiSoundCloud";
import {usePlayerAudioParams} from "~/composables/cmsData";

const player: Ref<null | HTMLIFrameElement> = ref(null)
const playerIsPaused: Ref<boolean> = ref(true)
let widget: null | ApiSoundCloud_Widget = null

const playerIsOpen = ref(false)
const soundCloudAudioParams = usePlayerAudioParams()
const soundCloudAudioUrl_withoutParams: ComputedRef<string | null> = computed(() => {
    if( !soundCloudAudioParams.value ) return null
    if( !soundCloudAudioParams.value.soundcloud_url ) return null

    const audioUrl = new URL(soundCloudAudioParams.value.soundcloud_url)
    return audioUrl.origin + audioUrl.pathname
})

function togglePlayerIsOpen() {
    playerIsOpen.value = !playerIsOpen.value
    playerIsOpen.value ?
        document.body.classList.add('player-is-open')
        : document.body.classList.remove('player-is-open')
}


declare const SC: undefined | ApiSoundCloud
function loadSoundCloudAPI(): Promise<unknown> {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://w.soundcloud.com/player/api.js'
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
    })
}

async function initSoundCloud() {
    try {
        await loadSoundCloudAPI()
        console.log('SoundCloud API chargée avec succès.')

        // Une fois l’API chargée, initialise le widget

        if (SC === undefined) throw new Error('SC undefined')
        if (player.value === null) throw new Error('player is null')

        widget = SC.Widget(player.value)
        widget?.bind(SC.Widget.Events.PLAY, () => {
            playerIsPaused.value = false
        })

        widget?.bind(SC.Widget.Events.PAUSE, () => {
            playerIsPaused.value = true
        })

        widget?.bind(SC.Widget.Events.FINISH, () => {
            playerIsPaused.value = true
        })

    } catch (error) {
        console.error('Erreur lors du chargement de la SoundCloud API :', error)
    }

}

onMounted(() => {
    nextTick(() => {
      initSoundCloud()
    })
    document.body.classList.add('has-player')
})

onUnmounted(() => {
    document.body.classList.remove('has-player')
})


function toggleSoundcloudStatus() {
    if (widget === null) return

    widget.toggle()
    widget.isPaused((value) => playerIsPaused.value = value)
}
</script>





<style lang="scss" scoped >
.v-audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc( var(--v-audio-player-header-height) + var(--v-audio-player-iframe-height));
  display: flex;
  justify-content: center;
  color: black;
  transform: translate(0, var(--v-audio-player-iframe-height));
  transition: transform .25s ease-in-out;
  background: white;

  &.v-audio-player--is-open {
    transform: translate(0, 0);
  }

  .nuxt-watch-falk-is-active & {
    border-top: solid 1px;
  }
}

.v-audio-player__container {
  width: 100%;
  //max-width: 100rem;
}

.v-audio-player__iframe-container {
  width: 100%;
  height: 2rem !important;
}

.v-audio-player__container__header {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: var(--v-audio-player-header-height);
  align-items: center;
  padding: 0 var(--app-gutter-xl);
  box-sizing: border-box;
  gap: var(--app-gutter-xl);
  flex-wrap: nowrap;
  width: 100%;
}


.v-audio-player__container__header__title {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding-left: 1rem;
  justify-content: flex-end;
  flex-wrap: nowrap;
}

.v-audio-player__container__header__title__text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding-left: 2rem;
}

.v-audio-player__container__header__ui {
  display: flex;
  align-items: center;
  user-select: none;
  gap: var(--app-gutter);

  > * {
    cursor: pointer;
  }

  svg {
    display: block;
    height: 1rem;
    width: auto;
    fill: black;
  }
}

iframe {
  display: block;
  height: var(--v-audio-player-iframe-height) !important;
}
</style>

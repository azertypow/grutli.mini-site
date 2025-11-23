<template>
  <div class="v-soundcloud-controler" v-if="soundCloudUrl">
    <iframe
      ref="player"
      width="100%"
      height="166"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      :src="embedUrl"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { useSoundCloudUrl } from '~/composables/cmsData'
import type { ApiSoundCloud, ApiSoundCloud_Widget } from '~/utlis/ApiSoundCloud'

const soundCloudUrl = useSoundCloudUrl()
const player: Ref<null | HTMLIFrameElement> = ref(null)
let widget: null | ApiSoundCloud_Widget = null

const embedUrl = computed(() => {
  if (!soundCloudUrl.value) return ''

  try {
    const url = new URL(soundCloudUrl.value)
    const cleanUrl = url.origin + url.pathname

    const params = new URLSearchParams({
      url: cleanUrl,
      color: '#ff5500',
      auto_play: 'true',
      hide_related: 'false',
      show_comments: 'true',
      show_user: 'true',
      show_reposts: 'false',
      show_teaser: 'false',
      visual: 'true'
    })

    return `https://w.soundcloud.com/player/?${params.toString()}`
  } catch (error) {
    console.error('URL SoundCloud invalide:', error)
    return ''
  }
})

declare const SC: undefined | ApiSoundCloud

function loadSoundCloudAPI(): Promise<unknown> {
  return new Promise((resolve, reject) => {
    // Vérifier si l'API est déjà chargée
    if (typeof SC !== 'undefined') {
      resolve(SC)
      return
    }

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

    if (SC === undefined) throw new Error('SC undefined')
    if (player.value === null) throw new Error('player is null')

    widget = SC.Widget(player.value)

    // Lancer la lecture automatiquement
    widget?.bind(SC.Widget.Events.READY, () => {
      widget?.play()
    })

  } catch (error) {
    console.error('Erreur lors du chargement de la SoundCloud API :', error)
  }
}

// Observer les changements de l'URL
watch(soundCloudUrl, async (newUrl) => {
  if (newUrl) {
    await nextTick()
    initSoundCloud()
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.v-soundcloud-controler {
  width: 100%;

  iframe {
    display: block;
  }
}
</style>

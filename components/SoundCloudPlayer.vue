<template>
  <div class="v-soundcloud-player">
    <div
      class="v-soundcloud-player__wrapper"
      :class="{
        'disabled': !url,
        'is-playing': isPlaying
      }"
      @click="playSound"
    >
      <button
        class="v-soundcloud-player__wrapper__button"
        :disabled="!url"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"
             aria-hidden="true"
        ><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
      </button>
      <h3 class="v-soundcloud-player__wrapper__title"
          v-if="title">
              SoundCloud <span v-if="isPlaying"> - en cours</span>
              <br>{{title}}
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePlayerIsOpen, useSoundCloudUrl} from '~/composables/cmsData'

const props = defineProps<{
  url?: string
  title?: string
}>()

const soundCloudUrlStore = useSoundCloudUrl()
const playerIsOpen = usePlayerIsOpen()

function playSound() {
  if (props.url) {
    soundCloudUrlStore.value = props.url
    playerIsOpen.value = true
    document.body.classList.add('player-is-open')
  }
}

const isPlaying = computed(() => soundCloudUrlStore.value === props.url)
</script>

<style lang="scss" scoped>
.v-soundcloud-player {
  width: 100%;
  margin-top: 1rem;
}

.v-soundcloud-player__wrapper {
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: var(--app-color-secondary);
  border: solid 2px currentColor;
  border-radius: .75rem;
  min-height: 2.5rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  gap: var(--app-gutter-xl);

  svg {
    height: 1rem;
    width: auto;
    fill: currentColor;
    transition: transform 250ms ease-in-out;
    transform: scale(1);
    flex-shrink: 0;
  }

  &.disabled {
    opacity: .75;
    cursor: not-allowed;
  }

  &.is-playing svg {
    opacity: .25;
    transform: scale(.90);
  }

  &:hover {
    color: var(--app-color-tertiary);

    svg {
      transform: scale(1.15) rotate(-10deg);
    }
  }
}

.v-soundcloud-player__wrapper__title {
  margin: 0;
  text-align: left;
}
</style>

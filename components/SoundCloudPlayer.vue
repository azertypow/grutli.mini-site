<template>
  <div class="v-soundcloud-player">
    <button
      class="v-soundcloud-player__button"
      @click="playSound"
      :disabled="!url"
    >
      Jouer ce fichier
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSoundCloudUrl } from '~/composables/cmsData'

interface Props {
  url: string
}

const props = defineProps<Props>()

const soundCloudUrlStore = useSoundCloudUrl()

function playSound() {
  if (props.url) {
    soundCloudUrlStore.value = props.url
  }
}
</script>

<style lang="scss" scoped>
.v-soundcloud-player {
  width: 100%;
}

.v-soundcloud-player__button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #ff5500;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;

  &:hover {
    background-color: #cc4400;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
}
</style>

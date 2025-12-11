<template>
  <section class="v-app-gallery"
  >
    <div class="v-app-gallery__scroll"
         tabindex="0"
    >
      <template v-for="image of gallery_data">
        <div class="v-app-gallery__item">
          <img class="v-app-gallery__item__img"
               tabindex="0"
               :src="image.resize.large"
               :alt="image.alt || ''"
          >
          <div class="v-app-gallery__item__legendary"
          >{{ image.photographer }}
          </div>
        </div>
      </template>
    </div>

    <svg class="v-app-gallery__ui-icon"
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         width="24px"
         viewBox="0 -960 960 960"
    >
      <path d="M200-360q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm280 80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm280 80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Z"/>
    </svg>

  </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {ApiCmsImage} from "~/utlis/ApiCmsTypes";

defineProps<{
    gallery_data: ApiCmsImage[]
}>()
</script>





<style lang="scss" scoped >
.v-app-gallery {
  position: relative;
  padding-bottom: 1rem;
}

.v-app-gallery__scroll {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: var(--app-gutter-xl);
  overflow-x: scroll;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  /***
  scroll
  */

  /* CSS pseudos elements */
  scrollbar-color: var(--app-color-secondary) transparent;

  &::-webkit-scrollbar {
    width: auto;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--app-color-secondary);
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /***
  / scroll
  */

  img {
    display: block;
    width: auto;
    height: 50vh;
    flex-shrink: 0;
    border-radius: 1rem;
  }
}

.v-app-gallery__item {
  position: relative;

  .v-app-gallery__item__legendary {
    position: absolute;
    bottom: 0;
    left: 0;
    background: white;
    width: 100%;
    padding-left: 1rem;
    padding-right: var(--app-gutter);
    box-sizing: border-box;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }
}

.v-app-gallery__ui-icon {
  position: absolute;
  bottom: 0;
  left: 50%;
  height: 1rem;
  width: auto;
  display: block;
  transform: translateX(-50%);
  fill: var(--app-color-secondary);
}
</style>

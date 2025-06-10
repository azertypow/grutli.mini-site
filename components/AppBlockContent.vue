<template>
    <section class="v-app-block-content app-remove-first-last-child-margin"
             :class="data.html_content_block.type"
    >
      <!--            block system -->
        <div v-if="html_content_block.type === 'textWithTitle'"
             class="v-app-block-content__coll__content__text__text"
             v-html="html_content_block.content.text"
        ></div>

        <div v-if="html_content_block.type === 'link'"
             class="v-app-block-content__coll__content__text__link"
        >
          <a class="app-button"
             :href="html_content_block.content.link"
          >
            <span>{{html_content_block.content.text}}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
          </a>
        </div>

        <div v-if="html_content_block.type === 'quote'"
             class="v-app-block-content__coll__content__text__quote"
        >
          <div v-html="html_content_block.content.text"></div>
          <div v-html="formatTitle(html_content_block.content.citation)"></div>
        </div>

        <div v-else-if="html_content_block.type === 'text'"
             class="v-app-block-content__coll__content__text__text"
             v-html="html_content_block.content.text"
        ></div>

        <iframe v-if="html_content_block.type === 'video'"
                class="v-app-block-content__coll__content__text__youtube"
                :src="`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIDFromUrl(html_content_block.content.url)}`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
        ></iframe>

        <img v-else-if="html_content_block.type === 'image'"
             class="v-app-block-content__coll__content__text__image"
             v-for="image of html_content_block.images"
             :src="image.resize.large"
             :alt="image.alt || 'pas de texte alt'"
        >
        <div class="v-app-block-content__coll__content__text__gallery app-remove-first-last-child-margin"
             v-else-if="html_content_block.type === 'imageGallery'">
            <h5 class="v-app-block-content__coll__content__text__gallery__title"
                v-if="html_content_block.content.title"
            >{{html_content_block.content.title}}</h5>
            <div class="v-app-block-content__coll__content__text__gallery__images"
            >
                <img v-for="image of html_content_block.images"
                     :src="image.resize.large"
                     :alt="image.alt || 'pas de texte alt'"
                >
            </div>
        </div>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import {getYoutubeVideoIDFromUrl} from "~/utlis/videoHelper";
import type {ApiHTMLContent_Blocks} from "~/utlis/ApiCmsTypes";
import {formatTitle} from "~/utlis/formatStringCiattion";

const data = defineProps<{
    html_content_block: ApiHTMLContent_Blocks
}>()
</script>





<style lang="scss" scoped >
.v-app-block-content {
  &.textWithTitle {
    margin-top: 1rem;
    margin-bottom: .5rem;
  }
  &.link {
    margin-bottom: .5rem;
  }

  &.imageGallery {
    margin-bottom: .5rem;
  }

  &.image {
    margin-top: .5rem;
    margin-bottom: .5rem;
  }
}

.v-app-block-content__coll__content__text__link {
  margin-bottom: var(--app-gutter-xl);

  .app-button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      display: block;
      height: 1rem;
      width: auto;
      flex-shrink: 0;
      fill: var(--app-color-secondary);
    }
  }
}

.v-app-block-content__coll__content__text__youtube {
  display: block;
  border: none;
  overflow: hidden;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
  border-radius: 1rem;
}


.v-app-block-content__coll__content__text__quote {
  > div:first-child {
    color: var(--app-color-secondary);
  }

  > div:nth-child(2) {
    text-align: right;
  }

}
:global(.v-app-block-content__coll__content__text__quote > div:nth-child(2) em) {
  color: var(--app-color-secondary);
}

.v-app-block-content__coll__content__text__image {
  display: block;
  width: 100%;
  height: auto;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
  border-radius: 1rem;
}

.v-app-block-content__coll__content__text__gallery {
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
}

.v-app-block-content__coll__content__text__gallery__title {
  margin-bottom: 0rem;
}

.v-app-block-content__coll__content__text__gallery__images {
  display: flex;
  flex-direction: row;
  gap: var(--app-gutter-xl);
  overflow-x: scroll;
  height: 50vh;
  border-radius: 1rem;

  .v-app-block-content__coll__content__text__gallery__title + & {
    border-top-left-radius: 0;
  }

  /***
  scroll
  */

  /* CSS pseudos elements (firefox) */
  scrollbar-width: thin;
  scrollbar-color: var(--app-color-secondary) transparent;
  scrollbar-gutter: stable both-edges;

  /* WebKit (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--app-color-secondary);
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }

  /***
  / scroll
  */

  img {
    display: block;
    width: auto;
    height: 100%;
    flex-shrink: 0;
  }
}
</style>

<style lang="scss">
@use "@/assets/style/typo";

.v-app-block-content__coll__content__text__text {
  //> *:first-child {margin-top: 0}
  > *:last-child {margin-bottom: 0}

  h2 {
    @extend .app-font-h2;
  }

  h3 {
    @extend .app-font-h3;
  }
}


</style>

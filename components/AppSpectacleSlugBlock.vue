<template>
    <div class="v-app-spectacle-slug-block"
    >
        <template v-for="blockContent of html_content">

          <div v-if="blockContent.type === 'textWithTitle'"
               class="v-app-spectacle-slug-block__coll__content__text__text app-remove-last-child-margin"
               v-html="blockContent.content.text"
          />

          <div v-if="blockContent.type === 'link'"
               class="v-app-spectacle-slug-block__coll__content__text__link"
          >
            <a class="app-button app-button-grey app-button-grey--with-glow-effect"
               target="_blank"
               :href="blockContent.content.link"
            >
              <span>{{ blockContent.content.text }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                   fill="undefined">
                <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>
              </svg>
            </a>
          </div>

          <div v-if="blockContent.type === 'quote'"
               class="v-app-spectacle-slug-block__coll__content__text__quote"
          >
            <div v-html="blockContent.content.text"></div>
            <div v-html="formatTitle(blockContent.content.citation)"></div>
          </div>

          <div v-else-if="blockContent.type === 'text'"
               class="v-app-spectacle-slug-block__coll__content__text__text app-remove-first-last-child-margin"
               v-html="blockContent.content.text"
          ></div>

          <iframe v-if="blockContent.type === 'video'"
                  class="v-app-spectacle-slug-block__coll__content__text__youtube"
                  :src="`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIDFromUrl(blockContent.content.url)}`"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                  :class="{
                       'only-one':  html_content?.length === 1,
                   }"
          ></iframe>


          <template v-else-if="blockContent.type === 'image'">
            <div class="v-app-spectacle-slug-block__coll__content__text__image"
                 v-for="image of blockContent.images"
                 :class="{
                       'only-one':  html_content?.length === 1,
                   }"
            >
              <img class="v-app-spectacle-slug-block__coll__content__text__image__img"
                   :src="image.resize.large"
                   :alt="image.alt || 'pas de texte alt'"
              >
              <div class="v-app-spectacle-slug-block__coll__content__text__image__legendary"
              >{{ image.photographer }}
              </div>
            </div>
          </template>


          <div v-else-if="blockContent.type === 'imageGallery'"
               class="v-app-spectacle-slug-block__coll__content__text__gallery"
          >
            <div class="v-app-spectacle-slug-block__coll__content__text__gallery__scroll"
            >
              <template v-for="image of blockContent.images">
                <div class="v-app-spectacle-slug-block__coll__content__text__gallery__item">
                  <img class="v-app-spectacle-slug-block__coll__content__text__gallery__item__img"
                       :src="image.resize.large"
                       :alt="image.alt || 'pas de texte alt'"
                  >
                  <div class="v-app-spectacle-slug-block__coll__content__text__gallery__item__legendary"
                  >{{ image.photographer }}
                  </div>
                </div>
              </template>
            </div>

            <svg class="v-app-spectacle-slug-block__coll__content__text__gallery__ui-icon"
                 xmlns="http://www.w3.org/2000/svg"
                 height="24px"
                 width="24px"
                 viewBox="0 -960 960 960"
            ><path d="M200-360q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm280 80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm280 80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Z"/></svg>

          </div>
        </template>
    </div>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import {formatTitle} from "~/utlis/formatStringCiattion";
import {getYoutubeVideoIDFromUrl} from "~/utlis/videoHelper";
import type {ApiHTMLContent_Blocks} from "~/utlis/ApiCmsTypes";

const props = defineProps<{
    html_content?: ApiHTMLContent_Blocks[]
}>()
</script>





<style lang="scss" scoped >
.v-app-spectacle-slug-block {
  display: block;
  width: 100%;
}

:global(.v-app-spectacle-slug-block > *:first-child > *:first-child) {
  //margin-top: 0;
}

.v-app-spectacle-slug-block__coll__item {
  background: var(--app-color-grey);
  padding: var(--app-gutter-xl);
  border-radius: 1rem;
  overflow: hidden;
  box-sizing: border-box;
  width: calc(50% - (var(--app-gutter-xl) / 2));

  &.v-app-spectacle-slug-block__coll__item--no-padding {
    padding: 0;
  }
}

.v-app-spectacle-slug-block__coll__content__text__link {
  margin-top: .5rem;

  .app-button {
    margin-bottom: var(--app-gutter-xl);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    border-radius: .75rem;
    padding-top: .25rem;
    padding-bottom: .25rem;
    transform: none;
    white-space: wrap;

    svg {
      display: block;
      height: 1rem;
      width: auto;
      flex-shrink: 0;
      fill: var(--app-color-primary);
    }
  }
}
.v-app-spectacle-slug-block__coll__content__text__link:last-child > *:last-child{
  margin-bottom: 0;
}

.v-app-spectacle-slug-block__coll__content__text__quote {

  > div:first-child {
    font-style: italic;
  }

  > div:nth-child(2) {
    text-align: right;
  }

}

.v-app-spectacle-slug-block__coll__content__text__gallery__scroll {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: var(--app-gutter-xl);
  overflow-x: scroll;
  height: 50vh;
  border-radius: 1rem;
  background: rgba(255, 255, 255, .25);
  backdrop-filter: blur(1rem);

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

.v-app-spectacle-slug-block__coll__content__text__gallery {
  position: relative;
  padding-bottom: 1rem;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
}

.v-app-spectacle-slug-block__coll__content__text__gallery__ui-icon {
  position: absolute;
  bottom: 0;
  left: 50%;
  height: 1rem;
  width: auto;
  display: block;
  transform: translateX(-50%);
  fill: var(--app-color-secondary);
}

.v-app-spectacle-slug-block__coll__content__text__gallery__item {
  position: relative;

  .v-app-spectacle-slug-block__coll__content__text__gallery__item__legendary {
    position: absolute;
    bottom: 0;
    left: 0;
    background: white;
    width: 100%;
    padding-left: 1rem;
    padding-right: var(--app-gutter);
    box-sizing: border-box;
  }
}

.v-app-spectacle-slug-block__coll__content__text__image {
  position: relative;
  width: 100%;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.v-app-spectacle-slug-block__coll__content__text__youtube {
  display: block;
  border: none;
  overflow: hidden;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
  border-radius: 1rem;
  background: var(--app-color-grey);

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.only-one {
    margin: calc( -1 * var(--app-gutter-xl) );
    width: calc(100% +   2 * var(--app-gutter-xl));
  }
}

.v-app-spectacle-slug-block__coll__content__text__image__img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 1rem;

  .only-one & {
    width: calc(100% +  2 * var(--app-gutter-xl));
    margin-bottom: calc( -2 * var(--app-gutter-xl) );
    margin-left: calc( -1 * var(--app-gutter-xl) );
    margin-top: calc( -1 * var(--app-gutter-xl) );
  }
}

.v-app-spectacle-slug-block__coll__content__text__image__legendary {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding-left: 1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;

  .only-one & {
    bottom: var(--app-gutter-xl);
    left: calc( -1 * var(--app-gutter-xl) );
    width: calc(100% +   2 * var(--app-gutter-xl));
  }
}
</style>

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
            <a class="app-button app-button--text-wrap"
               target="_blank"
               :href="blockContent.content.link"
               :class="{
                  'is-solo-in-block': only_one_in_block,
               }"
            >
              {{ blockContent.content.text }}
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
            <h2 class="v-app-spectacle-slug-block__coll__content__text__gallery__title">
              {{ blockContent.content.title }}
            </h2>
            <AppGallery :gallery_data="blockContent.images" />
          </div>


          <div v-else-if="blockContent.type === 'soundCloudPlayer'">
            <SoundCloudPlayer
              :url="blockContent.content.url"
              :title="blockContent.content.title"
            />
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
    only_one_in_block: boolean
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

  &:first-child {
    margin-top: 0;
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

.v-app-spectacle-slug-block__coll__content__text__gallery {
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.v-app-spectacle-slug-block__coll__content__text__gallery__title {
  margin-top: 0;
  margin-bottom: .5em;
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

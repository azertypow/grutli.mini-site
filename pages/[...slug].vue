<template>
  <section class="v-spectacle-slug"
  >
    <div class="v-spectacle-slug__coll">
      <img alt="image texte"
           class="v-spectacle-slug__img"
           src="/images/241122_Grutli_Flyers_23.jpg"
      />
    </div>
    <div class="v-spectacle-slug__coll">
      <div class="v-spectacle-slug__coll__content">
        <div class="v-spectacle-slug__coll__content__text" v-if="pageData">
          <h1 class="app-font-align-center app-font-h2">{{pageData.pageContent.content.title}}</h1>

          <template v-if="useFalkIsActive().value">

            <template v-if="pageData.pageContent.content.htmlcontent_falk.length">
              <!--            block system -->
              <template v-for="content of pageData.pageContent.content.htmlcontent_falk">
                <div v-if="content.type === 'textWithTitle'"
                     class="v-spectacle-slug__coll__content__text__text"
                     v-html="content.content.text"
                ></div>

                <div v-if="content.type === 'link'"
                     class="v-spectacle-slug__coll__content__text__link"
                >
                  <a class="app-button"
                     :href="content.content.link"
                  >
                    <span>{{content.content.text}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
                  </a>
                </div>

                <div v-if="content.type === 'quote'"
                     class="v-spectacle-slug__coll__content__text__quote"
                >
                  <div v-html="content.content.text"></div>
                  <div v-html="content.content.citation"></div>
                </div>

                <div v-else-if="content.type === 'text'"
                     class="v-spectacle-slug__coll__content__text__text"
                     v-html="content.content.text"
                ></div>

                <iframe v-if="content.type === 'video'"
                        class="v-spectacle-slug__coll__content__text__youtube"
                        :src="`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIDFromUrl(content.content.url)}`"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                ></iframe>

                <img v-else-if="content.type === 'image'"
                     class="v-spectacle-slug__coll__content__text__image"
                     v-for="image of content.images"
                     :src="image.resize.large"
                     :alt="image.alt || 'pas de texte alt'"
                >

                <div v-else-if="content.type === 'imageGallery'"
                     class="v-spectacle-slug__coll__content__text__gallery"
                >
                  <img v-for="image of content.images"
                       :src="image.resize.large"
                       :alt="image.alt || 'pas de texte alt'"
                  >
                </div>
              </template>
              <!--            /block system -->
            </template>

            <template v-else>
              <h4 class="app-font-align-center"
                  style="color: var(--app-color-orange)"
              >(La version FALK n'est pas encore mise en ligne)</h4>

              <!--            block system -->
              <template v-for="content of pageData.pageContent.content.htmlcontent">
                <div v-if="content.type === 'textWithTitle'"
                     class="v-spectacle-slug__coll__content__text__text"
                     v-html="content.content.text"
                ></div>

                <div v-if="content.type === 'link'"
                     class="v-spectacle-slug__coll__content__text__link"
                >
                  <a class="app-button"
                     :href="content.content.link"
                  >
                    <span>{{content.content.text}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
                  </a>
                </div>

                <div v-if="content.type === 'quote'"
                     class="v-spectacle-slug__coll__content__text__quote"
                >
                  <div v-html="content.content.text"></div>
                  <div v-html="content.content.citation"></div>
                </div>

                <div v-else-if="content.type === 'text'"
                     class="v-spectacle-slug__coll__content__text__text"
                     v-html="content.content.text"
                ></div>

                <iframe v-if="content.type === 'video'"
                        class="v-spectacle-slug__coll__content__text__youtube"
                        :src="`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIDFromUrl(content.content.url)}`"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                ></iframe>

                <img v-else-if="content.type === 'image'"
                     class="v-spectacle-slug__coll__content__text__image"
                     v-for="image of content.images"
                     :src="image.resize.large"
                     :alt="image.alt || 'pas de texte alt'"
                >

                <div v-else-if="content.type === 'imageGallery'"
                     class="v-spectacle-slug__coll__content__text__gallery"
                >
                  <img v-for="image of content.images"
                       :src="image.resize.large"
                       :alt="image.alt || 'pas de texte alt'"
                  >
                </div>
              </template>
              <!--            /block system -->

            </template>

          </template>

          <template v-else>
            <!--            block system -->
            <template v-for="content of pageData.pageContent.content.htmlcontent">
              <div v-if="content.type === 'textWithTitle'"
                   class="v-spectacle-slug__coll__content__text__text"
                   v-html="content.content.text"
              ></div>

              <div v-if="content.type === 'link'"
                   class="v-spectacle-slug__coll__content__text__link"
              >
                <a class="app-button"
                   :href="content.content.link"
                >
                  <span>{{content.content.text}}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
                </a>
              </div>

              <div v-if="content.type === 'quote'"
                   class="v-spectacle-slug__coll__content__text__quote"
              >
                <div v-html="content.content.text"></div>
                <div v-html="content.content.citation"></div>
              </div>

              <div v-else-if="content.type === 'text'"
                   class="v-spectacle-slug__coll__content__text__text"
                   v-html="content.content.text"
              ></div>

              <iframe v-if="content.type === 'video'"
                      class="v-spectacle-slug__coll__content__text__youtube"
                      :src="`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIDFromUrl(content.content.url)}`"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
              ></iframe>

              <img v-else-if="content.type === 'image'"
                   class="v-spectacle-slug__coll__content__text__image"
                   v-for="image of content.images"
                   :src="image.resize.large"
                   :alt="image.alt || 'pas de texte alt'"
              >

              <div v-else-if="content.type === 'imageGallery'"
                   class="v-spectacle-slug__coll__content__text__gallery"
              >
                <img v-for="image of content.images"
                     :src="image.resize.large"
                     :alt="image.alt || 'pas de texte alt'"
                >
              </div>
            </template>
            <!--            /block system -->
          </template>
        </div>

        <div class="v-spectacle-slug__coll__content__children-link" v-if="pageData">
          <nuxt-link class="app-button"
                     :href="slug ? slug + '/' + childLink.pageContent.slug : childLink.pageContent.slug"
                     v-for="childLink of pageData.childrenDetails"
          >{{childLink.pageContent.content.title}}</nuxt-link>
        </div>

      </div>
    </div>
  </section>
</template>





<script setup lang="ts">

import {fetchPage} from "~/utlis/apiCmsFetch";
import type {ApiSimplePage} from "~/utlis/ApiCmsTypes";
import {useFalkIsActive} from "~/composables/cmsData";
import {getYoutubeVideoIDFromUrl} from "~/utlis/videoHelper";

const { slug } = useRoute().params;

const pageData: Ref<ApiSimplePage | null> = ref(null)

onMounted(async () => {
    pageData.value = await fetchPage(slug)
    console.log(useRoute().params)
})

const flakIsActive: Ref<boolean> = useFalkIsActive()

</script>





<style lang="scss" scoped >
@use '../assets/style/typo';

.v-spectacle-slug {
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  padding-bottom: var(--v-audio-player-header-height);

  @media (min-width: 1200px) {
    flex-direction: row;
  }
}

.v-spectacle-slug__coll {
  flex-shrink: 0;
  width: 100%;

  @media (min-width: 1200px) {
    width: 50%;
  }
}

.v-spectacle-slug__coll__content {
  background: white;
  min-height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: var(--app-gutter-xl) var(--app-gutter-xl);
}

.v-spectacle-slug__coll__content__text {
  background: white;
  box-sizing: border-box;
  overflow: hidden;
}

.v-spectacle-slug__coll__content__text__image {
  display: block;
  width: 100%;
  height: auto;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
}

.v-spectacle-slug__coll__content__text__gallery {
  display: flex;
  flex-direction: row;
  gap: var(--app-gutter-xl);
  overflow-x: scroll;
  height: 50vh;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);

  /***
  scroll
  */

  /* CSS pseudos elements (firefox) */
  scrollbar-width: thin;
  scrollbar-color: var(--app-color-orange) transparent;
  scrollbar-gutter: stable both-edges;

  /* WebKit (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--app-color-orange);
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

.v-spectacle-slug__coll__content__text__youtube {
  display: block;
  border: none;
  overflow: hidden;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
}


:global(.v-spectacle-slug__coll__content__text > *:first-child) {
  margin-top: 0;
}

:global(.v-spectacle-slug__coll__content__text > *:last-child) {
  margin-bottom: 0;
}

:global(.v-spectacle-slug__coll__content__text h2) {
  @extend .app-font-h3;
}

:global(.v-spectacle-slug__coll__content__text > *:last-child) {
  margin-bottom: 0;
}

:global(.v-spectacle-slug__coll__content img) {
  display: block;
  width: 100%;
}

:global(.v-spectacle-slug__coll__content__children-link a) {
  margin-bottom: var(--app-gutter-xl);
}

.v-spectacle-slug__img {
  display: block;
  width: 100%;
  user-select: none;
  pointer-events: none;
  position: sticky;
  top: 0;
}
</style>

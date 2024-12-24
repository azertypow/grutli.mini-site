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
          <h1 class="app-font-h2">{{pageData.pageContent.content.title}}</h1>

          <template v-if="useFalkIsActive().value">
            <template v-for="content of pageData.pageContent.content.htmlcontent_falk">

              <div v-if="content.type === 'textWithTitle'"
                   v-html="content.content.text"
              ></div>

              <img v-if="content.type === 'image'" v-for="image of content.images" :src="image.resize.large">

            </template>
          </template>
          <template v-else>
            <template v-for="content of pageData.pageContent.content.htmlcontent">

              <div v-if="content.type === 'textWithTitle'"
                   v-html="content.content.text"
              ></div>

              <img v-if="content.type === 'image'" v-for="image of content.images" :src="image.resize.large">

            </template>
          </template>
        </div>

        <div class="v-spectacle-slug__coll__content__children-link" v-if="pageData">
          <nuxt-link :href="slug ? slug + '/' + childLink.pageContent.slug : childLink.pageContent.slug" v-for="childLink of pageData.childrenDetails"
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
    flex-wrap: nowrap;
  }
}

.v-spectacle-slug__coll {
  width: 100%;
}

.v-spectacle-slug__coll__content {
  background: white;
  min-height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: calc(var(--app-gutter) * 2 );
}

:global(.v-spectacle-slug__coll__content__text > *:first-child) {
  margin-top: 0;
}

:global(.v-spectacle-slug__coll__content__text > *:last-child) {
  margin-top: 0;
}

:global(.v-spectacle-slug__coll__content__text h2) {
  @extend .app-font-h3;
}

:global(.v-spectacle-slug__coll__content__text > *:last-child) {
  margin-top: 0;
}

:global(.v-spectacle-slug__coll__content img) {
  display: block;
  width: 100%;
}

:global(.v-spectacle-slug__coll__content__children-link a) {
  display: block;
  box-sizing: border-box;
  border: solid;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
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

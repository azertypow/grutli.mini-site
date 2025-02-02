<template>
  <section class="v-slug"
  >

    <div class="v-slug__children-link" v-if="pageData && pageData.childrenDetails && pageData.childrenDetails.length > 0">
      <nuxt-link class="v-slug__children-link__item app-font-small app-button-grey"
                 v-for="childLink of pageData.childrenDetails"
                 :href="slug ? slug + '/' + childLink.pageContent.slug : childLink.pageContent.slug"
      >{{childLink.pageContent.content.title}}</nuxt-link>
    </div>

    <div class="v-slug__children-link" v-if="parentSubPage">
      <nuxt-link class="v-slug__children-link__item app-font-small app-button-grey"
                 v-for="subPage of parentSubPage"
                 :href="subPage.pageContent.slug"
      >{{subPage.pageContent.content.title}}</nuxt-link>
    </div>

    <div class="v-slug__item v-slug__item--image">
      <img alt="image texte"
           class="v-slug__img"
           src="/images/241122_Grutli_Flyers_23.jpg"
      />
    </div>
    <template v-if="pageData">
      <template v-if="useFalkIsActive().value">
        <template v-for="content of pageData.pageContent.content.content">
          <div class="v-slug__item app-remove-first-last-child-margin"
               v-if="content.type === 'section-block-content'">
            <h2>{{content.content.titre}}</h2>
            <template v-if="content.content.htmlcontent_falk.length">
              <AppBlockContent
                      v-for="htmlContentBlock of content.content.htmlcontent_falk"
                      :html_content_block="htmlContentBlock"
              />
            </template>
            <template v-else>
              <h4 class="app-font-align-center"
                  style="color: var(--app-color-orange)"
              >(La version FALK n'est pas encore mise en ligne)</h4>
              <AppBlockContent
                      v-for="htmlContentBlock of content.content.htmlcontent"
                      :html_content_block="htmlContentBlock"
              />
            </template>

          </div>
        </template>
      </template>

      <template v-else>
        <template v-for="content of pageData.pageContent.content.content">
          <div class="v-slug__item app-remove-first-last-child-margin"
               v-if="content.type === 'section-block-content'">
            <h2 class="v-slug__item__title">{{content.content.titre}}</h2>
            <AppBlockContent
                    v-for="htmlContentBlock of content.content.htmlcontent"
                    :html_content_block="htmlContentBlock"
            />
          </div>
        </template>
      </template>
    </template>
  </section>
</template>





<script setup lang="ts">

import {fetchPage} from "~/utlis/apiCmsFetch";
import type {ApiSimplePage, ApiSimplePage_ChildDetails} from "~/utlis/ApiCmsTypes";
import {useFalkIsActive} from "~/composables/cmsData";
import {getYoutubeVideoIDFromUrl} from "~/utlis/videoHelper";
import AppBlockContent from "~/components/AppBlockContent.vue";

const { slug } = useRoute().params;

const pageData: Ref<ApiSimplePage | null> = ref(null)
const parentSubPage: Ref<ApiSimplePage_ChildDetails[] | null> = ref(null)

onMounted(async () => {
    fetchPage(slug).then(async (value) => {
        pageData.value = value

        if( value === null ) return

        if( !value.pageContent.parent ) return

        if( value.pageContent.parent.length === 0 ) return

        parentSubPage.value = (await fetchPage(value.pageContent.parent))?.childrenDetails || null
    })
})
</script>





<style lang="scss" scoped >
@use '../assets/style/typo';

.v-slug {
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  padding-bottom: var(--v-audio-player-header-height);
  gap: 1rem;
  align-items: flex-start;
  box-sizing: border-box;
  padding-left: var(--app-gutter);
  padding-right: var(--app-gutter);

  @media (min-width: 1200px) {
    flex-direction: row;
  }
}

.v-slug__children-link {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding-bottom: var(--app-gutter);
  gap: var(--app-gutter);
}

.v-slug__children-link__item {
  margin: 0;
}

.v-slug__item {
  flex-shrink: 0;
  width: 100%;
  overflow: hidden;
  background: var(--app-color-grey);
  border-radius: 1rem;
  box-sizing: border-box;
  padding: var(--app-gutter-xl);

  @media (min-width: 1200px) {
    width: calc(50% - (1rem / 2));
  }
}

.v-slug__item--image {
  padding: 0;
}

.v-slug__item__title {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.v-slug__img {
  display: block;
  width: 100%;
  user-select: none;
  pointer-events: none;
  position: sticky;
  top: 0;
}
</style>

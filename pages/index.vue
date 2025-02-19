<template>
    <section class="v-index"
    >
      <div class="v-index__list-wrap"
      >
        <div class="v-index__list"
        >
          <template v-for="value of siteInfo?.spectacles.filter(value => value.pageContent.content.showinhome === 'true')">
            <div class="v-index__item">
              <AppSpectacleCard
                      :to="'/spectacle/' + value.pageContent.slug"
                      :title="value.pageContent.content.title"
                      :peoples="value.pageContent.content.company"
                      :event-title="value.pageContent.content.eventtitle"
                      :dates="{start: value.pageContent.content.datestart, end: value.pageContent.content.dateend}"
              />
            </div>
          </template>
          <template v-for="value of pageToShowInHome">
            <div class="v-index__item">
              <AppSpectacleCard
                      :to="'/' + value.pageContent_slug"
                      :title="value.pageContent_title"
              />
            </div>
          </template>
        </div>
      </div>
    </section>
</template>





<script setup lang="ts">
import type {SiteInfoPageSimple, SiteInfo, PageContent, PageChildren} from "~/utlis/ApiCmsTypes";
import AppSpectacleCard from "~/components/AppSpectacleCard.vue";
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks, useSiteInfo
} from "~/composables/cmsData";

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

const siteInfo: Ref<SiteInfo | null> = useSiteInfo()

type PageToShowInHome = {
    title: string,
    uri: string,
    showInHome: "true" | "false"
    pageContent_slug: string,
    pageContent_title: string,
}[]

const pageToShowInHome: ComputedRef<PageToShowInHome> = computed(() => {

    if( !siteInfo.value ) return []

    const pages: (PageContent | PageChildren)[] = [
        ...siteInfo.value['page-simple'].map(simplePage => simplePage.pageContent),
        ...siteInfo.value['page-simple'].flatMap(simplePage => {
            return simplePage.children
        })
    ]

    return pages.map((value: PageContent | PageChildren) => {

        if('children' in value) return {
            title: value.content.title,
            uri: value.uri,
            showInHome: value.content.showinhome,
            pageContent_slug: value.slug,
            pageContent_title: value.content.title,
        }


        return {
            title: value.title,
            uri: value.uri,
            showInHome: value.showinhome,
            pageContent_title: value.title,
            pageContent_slug: value.slug,
        }
    }).filter(value => value.showInHome === 'true')

})


</script>





<style lang="scss" scoped >
.v-index__list-wrap {
  padding: var(--app-gutter-xl) var(--app-gutter) calc( var(--v-audio-player-header-height) + var(--app-gutter));
  //background: red;
}

.v-index__list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
  gap: var(--app-gutter-xl);
}

.v-index__item__peoples {
  display: none;
}

.v-index__item {
  box-sizing: border-box;
  width: calc( (100% / 3) - var(--app-gutter-xl) );
  flex-grow: 1;
  transition: transform .25s ease-in-out;

  &:hover {
    transform: scale(1.015);
  }

  @media (max-width: 1100px) {
    width: 100%;
  }
}
</style>

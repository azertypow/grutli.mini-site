<template>
    <section class="v-index"
    >
      <div class="v-index__list-wrap"
      >
        <div class="v-index__list"
        >
          <template v-for="value of curentSeasonSpectacle.filter(value => value.pageContent.content.showinhome === 'true')">
            <div class="v-index__item">
              <AppSpectacleCard
                      :event_info="value.pageContent.content.eventinfo"
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
                      :to="'/' + value.pageContent_uri"
                      :title="value.pageContent_title"
              />
            </div>
          </template>
        </div>
      </div>
    </section>
</template>





<script setup lang="ts">
import type {
    SiteInfoPageSimple,
    SiteInfo,
    PageContent,
    PageChildren,
    ApiSeasons,
    ApiSeasons_value, Spectacle
} from "~/utlis/ApiCmsTypes";
import AppSpectacleCard from "~/components/AppSpectacleCard.vue";
import {
    useAppSeasons, useAppSeasons_active,
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks, useSiteInfo
} from "~/composables/cmsData";

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

const siteInfo: Ref<SiteInfo | null> = useSiteInfo()

useHead({
    title: 'Scènes du Grutli'
})

type PageToShowInHome = {
    title: string,
    uri: string,
    showInHome: "true" | "false"
    pageContent_uri: string,
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
            pageContent_uri: value.uri,
            pageContent_title: value.content.title,
        }


        return {
            title: value.title,
            uri: value.uri,
            showInHome: value.showinhome,
            pageContent_title: value.title,
            pageContent_uri: value.uri,
        }
    }).filter(value => value.showInHome === 'true')

})

const activeSeason: Ref<ApiSeasons_value[] | null> = useAppSeasons_active()

const curentSeasonSpectacle: ComputedRef<Spectacle[]> = computed(() => {
    const siteInfo_value      = siteInfo.value
    const activeSeason_value  = activeSeason.value

    if (!siteInfo_value)      return []
    if (!activeSeason_value)  return []

    const activeSaisonsSlug = activeSeason_value.map(season => season.slug)

    console.log( activeSaisonsSlug )

    return siteInfo_value.spectacles.filter( (spectacle: Spectacle) => {
        return activeSaisonsSlug.includes( spectacle.pageContent.content.season )
    })
})

</script>





<style lang="scss" scoped >
.v-index__list-wrap {
  padding: var(--app-gutter-xl) 0 calc( var(--v-audio-player-header-height) + var(--app-gutter));
  //background: red;

  @media (max-width: 1600px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }


  @media (max-width: 1500px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media (max-width: 1200px) {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  @media (max-width: 700px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media (max-width: 550px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (max-width: 400px) {
    padding-left:   .5rem;
    padding-right:  .5rem;
  }
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

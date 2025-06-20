<template>
    <section class="v-index"
    >
      <div class="v-index__season app-font-mono"
           v-if="currentSeason"
      >
        <div class="v-index__season-title__info">{{currentSeason.content.dateinformation}}</div>
        <div class="v-index__season-title__title"
        >{{currentSeason.content.title}}
        </div>
        <div class="v-index__season-title__subscription">
          <a  class="app-button-grey app-button-grey--with-glow-effect app-font-small"
              target="_blank"
              :href="useTicketServiceInfo().value?.page_content.subscription_link"
              v-if="useTicketServiceInfo().value?.page_content.subscription_toggle === 'true'"
          >
            {{useTicketServiceInfo().value?.page_content.subscription_text}}
          </a>
        </div>
      </div>

      <div class="v-index__list-wrap"
      >
        <div class="v-index__list"
        >
          <template v-for="value of spectacleToShowInHome">
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
    useParentSubPageForNavLinks, useSiteInfo, useTicketServiceInfo
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

const currentSeason: ComputedRef<ApiSeasons_value | undefined> = computed( () =>
  useAppSeasons().value?.value.find(value => value.content.statut === 'en-cours')
)

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

const spectacleToShowInHome: ComputedRef<Spectacle[]> = computed(() => {
    const siteInfo_value      = siteInfo.value

    if (!siteInfo_value)      return []

    return siteInfo_value.spectacles.filter(value => value.pageContent.content.showinhome === 'true')
})

</script>





<style lang="scss" scoped >

.v-index__season {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 1rem;

  @media (min-height: 1000px) {
    margin-bottom: 2rem;
    margin-top: -5rem;
  }

  @media (max-width: 1100px) {
    position: static;
  }
}

.v-index__season-title__title {
  font-size: 1rem;
  font-weight: 600;
  margin-top: .25rem;
}

.v-index__season-title__subscription {
  margin-top: .5rem;
}

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

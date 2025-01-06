<template>
    <section class="v-index"
    >
      <div class="v-index__list">
        <template v-for="value of siteInfo?.spectacles.slice(0, 3)">
          <div class="v-index__item">
            <AppSpectacleCard
                    :to="'/spectacle/' + value.pageContent.slug"
                    :title="value.pageContent.content.title"
                    :peoples="[]"
                    :get-date-from-ticket-service="true"
                    :event-title="value.pageContent.content.eventtitle"
            />
          </div>
        </template>

        <template v-for="value of pageToShowInHome">
          <div class="v-index__item">
            <AppSpectacleCard
                    :to="'/' + value.pageContent.slug"
                    :title="value.pageContent.content.title"
            />
          </div>
        </template>
      </div>
    </section>
</template>





<script setup lang="ts">
import {_routes} from "~/utlis/spectacle/_routes";
import type {PageSimple, SiteInfo} from "~/utlis/ApiCmsTypes";
import AppSpectacleCard from "~/components/AppSpectacleCard.vue";

const pages = _routes

const siteInfo: Ref<SiteInfo | null> = useSiteInfo()

const pageToShowInHome: ComputedRef<PageSimple[]> = computed(() => {

    console.log(siteInfo.value?.['page-simple'])

    return siteInfo.value?.['page-simple'].filter(page => page.pageContent.content.showinhome === 'true') || []
})


</script>





<style lang="scss" scoped >
.v-index__list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: var(--app-gutter-xl) var(--app-gutter) calc( var(--v-audio-player-header-height) + var(--app-gutter));
  justify-content: center;
}

.v-index__item__peoples {
  display: none;
}

.v-index__item {
  color: white;
  box-sizing: border-box;
  padding-left: var(--app-gutter);
  padding-right: var(--app-gutter);
  margin-bottom: var(--app-gutter-xl);
  width: 50%;

  @media (max-width: 1100px) {
    width: 100%;
  }

  &:nth-child(-n+3) {
    max-width: 30rem;
    width: calc(100% / 3);

    @media (max-width: 1100px) {
      width: 100%;
    }
  }

  &:nth-child(1n) {
    a {
      background-position: 24rem 0;
    }
  }

  &:nth-child(2n) {
    a {
      background-position: 35rem 23rem;
    }
  }

  &:nth-child(3n) {
    a {
      background-position: -7rem 60rem;
    }
  }
}
</style>

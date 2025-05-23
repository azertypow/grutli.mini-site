<template>
  <section class="v-diffusion-slug"
  >
    <div class="v-diffusion-slug__list-wrap"
    >
      <div class="v-diffusion-slug__list"
           v-if="pageData"
      >
        <template v-for="pageChildren of pageData.childrenDetails">
          <nuxt-link class="v-diffusion-slug__item"
                     :href="`/diffusion/${slug}/${pageChildren.slug}`"
          >
            <AppTileDefault
                    :event_info="pageChildren.eventInfo"
            >

              <template #header>
                <div style="font-size: 1rem; line-height: 1.2" class="app-font-h5 app-font-align-center">
                  <template v-for="(people, index) of pageChildren.company">
                    <template v-if="index > 0">, </template>{{people.authors_name}}
                  </template>
                </div>
              </template>

              <template #content>
                <div v-html="pageChildren.event_intro" class="app-remove-first-last-child-margin"/>
              </template>

              <template #footer>
                {{pageChildren.title}}
              </template>
            </AppTileDefault>
          </nuxt-link>
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
    ApiSeasons_value, Spectacle, ApiPage_template_diffusion, ApiPage_template_diffusion_subPage
} from "~/utlis/ApiCmsTypes";
import AppSpectacleCard from "~/components/AppSpectacleCard.vue";
import {
    useAppSeasons, useAppSeasons_active,
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks, useSiteInfo
} from "~/composables/cmsData";
import {fetchPage_template_diffusions__subpage} from "~/utlis/apiCmsFetch";

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

useHead({
    title: 'Scènes du Grutli'
})

const pageData: Ref<ApiPage_template_diffusion_subPage | null> = ref(null)

const { slug } = useRoute().params as { slug: string }

onMounted(async () => {

    console.log( slug )

    pageData.value = await fetchPage_template_diffusions__subpage(['diffusion', slug])

})

</script>





<style lang="scss" scoped >
.v-diffusion-slug__list-wrap {
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
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media (max-width: 400px) {
    padding-left:   1rem;
    padding-right:  1rem;
  }
}

.v-diffusion-slug__list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
  gap: var(--app-gutter-xl);
}

.v-diffusion-slug__item__peoples {
  display: none;
}

.v-diffusion-slug__item {
  box-sizing: border-box;
  width: calc( (100% / 3) - var(--app-gutter-xl) );
  flex-grow: 1;

  @media (max-width: 1100px) {
    width: 100%;
  }
}
</style>

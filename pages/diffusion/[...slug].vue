<template>
  <section class="v-diffusion-slug"
  >
    <div class="v-diffusion-slug__list-wrap"
    >
      <div class="v-diffusion-slug__list"
           v-if="pageDate"
      >
        <template v-for="value of pageDate.childrenDetails">
          <div class="v-diffusion-slug__item">
            <AppSpectacleCard
                    :to="''"
                    :title="value.pageContent.content.company.replace('- \n  authors_name: ', '').replace('authors_link:', '')"
                    :peoples="[{id: '', authors_name: value.pageContent.content.title, authors_link:''}]"
                    :event-title="undefined"
                    :dates="undefined"
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
    ApiSeasons_value, Spectacle, ApiPage_template_diffusion
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

const pageDate: Ref<ApiPage_template_diffusion | null> = ref(null)

const { slug } = useRoute().params;

onMounted(async () => {

    console.log( slug )

    pageDate.value = await fetchPage_template_diffusions__subpage(['diffusion', ...slug])

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
  transition: transform .25s ease-in-out;

  &:hover {
    transform: scale(1.015);
  }

  @media (max-width: 1100px) {
    width: 100%;
  }
}
</style>

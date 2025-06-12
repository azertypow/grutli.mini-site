<template>
  <section class="v-diffusion"
  >
    <template v-if="pageData">
      <template v-for="content of pageData.pageContent.content.htmlcontent">
        <div class="v-diffusion__item app-remove-first-last-child-margin"
        >
          <AppBlockContent
                  v-for="htmlContentBlock of pageData.pageContent.content.htmlcontent"
                  :html_content_block="htmlContentBlock"
          />
        </div>
      </template>

      <div class="v-diffusion__item__wrapper">
        <nuxt-link class="v-diffusion__item v-diffusion__item--link app-remove-first-last-child-margin"
                   v-for="children of pageData.childrenDetails"
                   :href="`/diffusion/${children.pageContent.slug}`"
        >
          <span>
              {{children.pageContent.content.title}}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg"
               style="vertical-align: bottom; margin-left: .5rem;"
               height=".75rem" viewBox="0 -960 960 960" width=".75rem" fill="black"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
        </nuxt-link>
      </div>
    </template>
  </section>
</template>





<script setup lang="ts">

import {fetchPage, fetchPage_template_diffusions} from "~/utlis/apiCmsFetch";
import type {ApiPage_template_diffusion, ApiSimplePage, ApiSimplePage_ChildDetails} from "~/utlis/ApiCmsTypes";
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useFalkIsActive,
    useParentSubPageForNavLinks
} from "~/composables/cmsData";
import AppBlockContent from "~/components/AppBlockContent.vue";
import AppSpectacleCardLoader from "~/components/AppSpectacleCardLoader.vue";

const { slug } = useRoute().params;

const pageData: Ref<ApiPage_template_diffusion | null> = ref(null)

onMounted(async () => {



    fetchPage_template_diffusions('diffusion').then(async (value: ApiPage_template_diffusion | null) => {
        pageData.value = value

        useHead({
            title: pageData.value?.pageContent.content.title
        })

        console.log( pageData.value )


        useCurrentPageForNavLinks().value = null
        // get_childrenDetailsForNavLinks(value)
        //     .then(childPagesDetails => useChildrenDetailsForNavLinks().value = childPagesDetails)
        //
        // get_parentSubPageForNavLinks(value)
        //     .then(async parentPage => {
        //         useParentSubPageForNavLinks().value = parentPage?.childrenDetails || null
        //         useCurrentPageForNavLinks().value = await get_currentORParentPageForNavLinks({
        //             parentDetails: parentPage,
        //             currentPageDetails: value,
        //         })
        //     })
    })

})

interface get_currentORParentPageForNavLinksProps {
    parentDetails: ApiSimplePage | null;
    currentPageDetails: ApiSimplePage | null;
}

async function get_currentORParentPageForNavLinks(
    {
        parentDetails,
        currentPageDetails
    }: get_currentORParentPageForNavLinksProps
): Promise<{slug: string, title: string} | null> {

    if(parentDetails) {
        return {
            slug: parentDetails.pageContent.slug,
            title: parentDetails.pageContent.content.title
        }
    }

    else if(currentPageDetails) {
        return {
            slug: currentPageDetails.pageContent.slug,
            title: currentPageDetails.pageContent.content.title,
        }
    }

    return null
}

async function get_parentSubPageForNavLinks(value: ApiSimplePage | null): Promise<ApiSimplePage | null> {
    if( !value ) return null
    if( !value.pageContent.parent ) return null
    if( value.pageContent.parent.length < 1 ) return null

    return (await fetchPage(value.pageContent.parent)) || null
}

async function get_childrenDetailsForNavLinks(value: ApiSimplePage | null): Promise<ApiSimplePage_ChildDetails[] | null> {
    if ( !value ) return null

    if( !value.childrenDetails ) return null
    if( value.childrenDetails.length < 1 ) return null

    return value.childrenDetails
}
</script>





<style lang="scss" scoped >
@use '../assets/style/typo';

.v-diffusion {
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding-bottom: var(--v-audio-player-header-height);
  gap: var(--app-gutter-xl);
  align-items: flex-start;
  box-sizing: border-box;
  padding-left: var(--app-gutter-xl);
  padding-right: var(--app-gutter-xl);
  flex-direction: row;
}

.v-diffusion__item {
  flex-shrink: 0;
  width: 100%;
  overflow: hidden;
  background: var(--app-bg-glow-color);
  backdrop-filter: var(--app-bg-glow-filter);
  border-radius: 1rem;
  box-sizing: border-box;
  padding: var(--app-gutter-xl);
  padding-top: 1.25rem;

  @media (min-width: 1200px) {
    width: calc(50% - (var(--app-gutter-xl) / 2));
  }

  &.has-only-image {
    padding: 0;
  }

  &.v-diffusion__item--link {
    width: 100%;
    text-decoration: none;
    text-align: center;
    padding-bottom: 1rem;
  }
}

.v-diffusion__item__wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-gutter-xl);

  @media (min-width: 1200px) {
    width: calc(50% - (var(--app-gutter-xl) / 2));
  }
}

.v-diffusion__item--image {
  padding: 0;
}

.v-diffusion__item__title {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-family: 'ABCOracleWebSite triple', monospace;
  font-weight: normal;
  font-variation-settings: "slnt" 0, "wght" 600;
  line-height: 1.15em;
  font-size: 1rem;
  max-width: 15em;
}

.v-diffusion__img {
  display: block;
  width: 100%;
  user-select: none;
  pointer-events: none;
  position: sticky;
  top: 0;
}
</style>

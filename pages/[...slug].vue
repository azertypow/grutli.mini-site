<template>
  <section class="v-slug"
  >
    <!--//////////
    /// masonry
    //////////-->
    <!--    masonry FALSE // windows width < breakpoint-->
    <template v-if="windowsWidthIsSmallerThan1200pxCSSBreakpoint">
      <template v-if="pageData">
        <template v-if="useFalkIsActive().value">
          <template v-for="content of pageData.pageContent.content.content">
            <template v-if="content.type === 'section-block-content'">
              <div class="v-slug__item app-remove-first-last-child-margin"
                   v-if="content.content.htmlcontent_falk.length"
              >
                <h2>{{ content.content.titre }}</h2>
                <AppBlockContent
                        v-for="htmlContentBlock of content.content.htmlcontent_falk"
                        :html_content_block="htmlContentBlock"
                />
              </div>
            </template>

            <div class="v-slug__item"
                 v-else>
              <AppSpectacleCardLoader
                      :slug="content.content.linked_spectacle"
              />
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
            <div class="v-slug__item"
                 v-else>
              <AppSpectacleCardLoader
                      :slug="content.content.linked_spectacle"
              />
            </div>
          </template>
        </template>
      </template>
    </template>
    <!--    masonry TRUE // windows width > breakpoint -->
    <template v-else>
      <div class="v-slug__masonry-coll">
        <template v-if="pageData">
          <template v-if="useFalkIsActive().value">
            <template v-for="(content, index) of pageData.pageContent.content.content.filter((_, i) => i % 2 === 0)">
              <template v-if="content.type === 'section-block-content'">
                <div class="v-slug__item app-remove-first-last-child-margin"
                     v-if="content.content.htmlcontent_falk.length"
                >
                  <h2>{{ content.content.titre }}</h2>
                  <AppBlockContent
                          v-for="htmlContentBlock of content.content.htmlcontent_falk"
                          :html_content_block="htmlContentBlock"
                  />
                </div>
              </template>

              <div class="v-slug__item"
                   v-else>
                <AppSpectacleCardLoader
                        :slug="content.content.linked_spectacle"
                />
              </div>


            </template>
          </template>

          <template v-else>
            <template v-for="content of pageData.pageContent.content.content.filter((_, i) => i % 2 === 0)">
              <div class="v-slug__item app-remove-first-last-child-margin"
                   v-if="content.type === 'section-block-content'">
                <h2 class="v-slug__item__title">{{content.content.titre}}</h2>
                <AppBlockContent
                        v-for="htmlContentBlock of content.content.htmlcontent"
                        :html_content_block="htmlContentBlock"
                />
              </div>
              <div class="v-slug__item"
                   v-else>
                <AppSpectacleCardLoader
                        :slug="content.content.linked_spectacle"
                />
              </div>
            </template>
          </template>
        </template>
      </div>
      <div class="v-slug__masonry-coll">
<!--        <div class="v-slug__item v-slug__item&#45;&#45;image">-->
<!--          <img alt="image texte"-->
<!--               class="v-slug__img"-->
<!--               src="/images/241122_Grutli_Flyers_23.jpg"-->
<!--          />-->
<!--        </div>-->
        <template v-if="pageData">
          <template v-if="useFalkIsActive().value">
            <template v-for="content of pageData.pageContent.content.content.filter((_, i) => i % 2 !== 0)">
              <template v-if="content.type === 'section-block-content'">
                <div class="v-slug__item app-remove-first-last-child-margin"
                     v-if="content.content.htmlcontent_falk.length"
                >
                  <h2>{{ content.content.titre }}</h2>
                  <AppBlockContent
                          v-for="htmlContentBlock of content.content.htmlcontent_falk"
                          :html_content_block="htmlContentBlock"
                  />
                </div>
              </template>

              <div class="v-slug__item"
                   v-else>
                <AppSpectacleCardLoader
                        :slug="content.content.linked_spectacle"
                />
              </div>


            </template>
          </template>

          <template v-else>
            <template v-for="content of pageData.pageContent.content.content.filter((_, i) => i % 2 !== 0)">
              <div class="v-slug__item app-remove-first-last-child-margin"
                   v-if="content.type === 'section-block-content'">
                <h2 class="v-slug__item__title">{{content.content.titre}}</h2>
                <AppBlockContent
                        v-for="htmlContentBlock of content.content.htmlcontent"
                        :html_content_block="htmlContentBlock"
                />
              </div>
              <div class="v-slug__item"
                   v-else>
                <AppSpectacleCardLoader
                        :slug="content.content.linked_spectacle"
                />
              </div>
            </template>
          </template>
        </template>
      </div>
    </template>
    <!--//////////
    /// masonry END
    //////////-->

  </section>
</template>





<script setup lang="ts">

import {fetchPage} from "~/utlis/apiCmsFetch";
import type {ApiSimplePage, ApiSimplePage_ChildDetails} from "~/utlis/ApiCmsTypes";
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useFalkIsActive,
    useParentSubPageForNavLinks
} from "~/composables/cmsData";
import AppBlockContent from "~/components/AppBlockContent.vue";
import AppSpectacleCardLoader from "~/components/AppSpectacleCardLoader.vue";

const { slug } = useRoute().params;

const pageData: Ref<ApiSimplePage | null> = ref(null)

onMounted(async () => {
    fetchPage(slug).then(async (value: ApiSimplePage | null) => {
        pageData.value = value

        get_childrenDetailsForNavLinks(value)
            .then(childPagesDetails => useChildrenDetailsForNavLinks().value = childPagesDetails)

        get_parentSubPageForNavLinks(value)
            .then(async parentPage => {
                useParentSubPageForNavLinks().value = parentPage?.childrenDetails || null
                useCurrentPageForNavLinks().value = await get_currentORParentPageForNavLinks({
                    parentDetails: parentPage,
                    currentPageDetails: value,
                })
            })
    })

    setWindowsWidth()
    window.addEventListener('resize', setWindowsWidth)
})

onUnmounted(() => {
    window.removeEventListener('resize', setWindowsWidth)
})

const windowsWidthIsSmallerThan1200pxCSSBreakpoint = ref(true) //breakpoint @media (min-width: 1200px) {
const breakpointCSSMinWidthBreakpoint = 1200

function setWindowsWidth() {
    windowsWidthIsSmallerThan1200pxCSSBreakpoint.value = window.innerWidth < breakpointCSSMinWidthBreakpoint
}

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

.v-slug {
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

.v-slug__masonry-coll {
  box-sizing: border-box;
  width: calc(50% - 1rem / 2);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > .v-slug__item {
    width: 100%;
  }
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
    width: calc(50% - (var(--app-gutter-xl) / 2));
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

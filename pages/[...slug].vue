<template>
  <section class="v-slug"
           :class="{
              'with-3-coll': pageData?.pageContent.content.templatewith_3_coll === 'true'
           }"
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
                   :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent_falk[0].type === 'image'
                   }"
              >
                <h2 class="v-slug__item__title"
                    v-if="content.content.titre && content.content.titre.length > 0"
                    v-html="content.content.titre"
                ></h2>
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
                 v-if="content.type === 'section-block-content'"
                 :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent[0].type === 'image'
                   }"
            >
              <h2 class="v-slug__item__title"
                  v-if="content.content.titre && content.content.titre.length > 0"
                  v-html="content.content.titre"
              ></h2>
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



      <!--    masonry TRUE // windows width > breakpoint // template coll 3-->
      <template v-if="pageData?.pageContent.content.templatewith_3_coll === 'true'">
        <div class="v-slug__masonry-coll">
          <template v-if="pageData">
            <template v-if="useFalkIsActive().value">
              <template v-for="(content, index) of pageData.pageContent.content.content.filter((_, i) => i % 3 === 0)">
                <template v-if="content.type === 'section-block-content'">
                  <div  class="v-slug__item app-remove-first-last-child-margin"
                        v-if="content.content.htmlcontent_falk.length"
                        :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent_falk[0].type === 'image'
                      }"
                  >
                    <h2 class="v-slug__item__title"
                        v-if="content.content.titre && content.content.titre.length > 0"
                        v-html="content.content.titre"
                    ></h2>
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
              <template v-for="content of pageData.pageContent.content.content.filter((_, i) => i % 3 === 0)">
                <div class="v-slug__item app-remove-first-last-child-margin"
                     v-if="content.type === 'section-block-content'"
                     :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent[0].type === 'image'
                   }"
                >
                  <h2 class="v-slug__item__title"
                      v-if="content.content.titre && content.content.titre.length > 0"
                      v-html="content.content.titre"
                  ></h2>
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
              <template v-for="content of pageData.pageContent.content.content.filter((_, i) => i % 3 === 1)">
                <template v-if="content.type === 'section-block-content'">
                  <div class="v-slug__item app-remove-first-last-child-margin"
                       v-if="content.content.htmlcontent_falk.length"
                       :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent_falk[0].type === 'image'
                   }"
                  >
                    <h2 class="v-slug__item__title"
                        v-if="content.content.titre && content.content.titre.length > 0"
                        v-html="content.content.titre"
                    ></h2>
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
              <template v-for="content of pageData.pageContent.content.content.filter((_, i) => i % 3 === 1)">
                <div class="v-slug__item app-remove-first-last-child-margin"
                     v-if="content.type === 'section-block-content'"
                     :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent[0].type === 'image'
                   }"
                >
                  <h2 class="v-slug__item__title"
                      v-if="content.content.titre && content.content.titre.length > 0"
                      v-html="content.content.titre"
                  ></h2>
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
              <template v-for="content of pageData.pageContent.content.content.filter((_, i) => i % 3 === 2)">
                <template v-if="content.type === 'section-block-content'">
                  <div class="v-slug__item app-remove-first-last-child-margin"
                       v-if="content.content.htmlcontent_falk.length"
                       :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent_falk[0].type === 'image'
                   }"
                  >
                    <h2 class="v-slug__item__title"
                        v-if="content.content.titre && content.content.titre.length > 0"
                        v-html="content.content.titre"
                    ></h2>
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
              <template v-for="content of pageData.pageContent.content.content.filter((_, i) => i % 3 === 2)">
                <div class="v-slug__item app-remove-first-last-child-margin"
                     v-if="content.type === 'section-block-content'"
                     :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent[0].type === 'image'
                   }"
                >
                  <h2 class="v-slug__item__title"
                      v-if="content.content.titre && content.content.titre.length > 0"
                      v-html="content.content.titre"
                  ></h2>
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

      <!--    masonry TRUE // windows width > breakpoint // template coll 2-->
      <template v-else>
        <div class="v-slug__masonry-coll">
          <template v-if="pageData">
            <template v-if="useFalkIsActive().value">
              <template v-for="(content, index) of pageData.pageContent.content.content.filter((_, i) => i % 2 === 0)">
                <template v-if="content.type === 'section-block-content'">
                  <div  class="v-slug__item app-remove-first-last-child-margin"
                        v-if="content.content.htmlcontent_falk.length"
                        :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent_falk[0].type === 'image'
                      }"
                  >
                    <h2 class="v-slug__item__title"
                        v-if="content.content.titre && content.content.titre.length > 0"
                        v-html="content.content.titre"
                    ></h2>
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
                     v-if="content.type === 'section-block-content'"
                     :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent[0].type === 'image'
                   }"
                >
                  <h2 class="v-slug__item__title"
                      v-if="content.content.titre && content.content.titre.length > 0"
                      v-html="content.content.titre"
                  ></h2>
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
                       :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent_falk[0].type === 'image'
                   }"
                  >
                    <h2 class="v-slug__item__title"
                        v-if="content.content.titre && content.content.titre.length > 0"
                        v-html="content.content.titre"
                    ></h2>
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
                     v-if="content.type === 'section-block-content'"
                     :class="{
                       'has-only-image': (!content.content.titre || content.content.titre.length === 0) && content.content.htmlcontent[0].type === 'image'
                   }"
                >
                  <h2 class="v-slug__item__title"
                      v-if="content.content.titre && content.content.titre.length > 0"
                      v-html="content.content.titre"
                  ></h2>
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
        if( !value ) useRouter().push('/erreur')

        pageData.value = value

        useHead({
            title: pageData.value?.pageContent.content.title
        })

        redirectToFirstPageChildrenIfContentIsEmpty(value)

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

function redirectToFirstPageChildrenIfContentIsEmpty(value: ApiSimplePage | null) {

    if( !value ) return
    if( !value.childrenDetails ) return

    const contentIsEmpty = value.pageContent.content.content.length === 0
    const hasChildrenPage = value.childrenDetails.length > 0

    if( contentIsEmpty && hasChildrenPage ) {
        useRouter().push( value.childrenDetails[0].pageContent.uri )
    }
}

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
  width: calc( ( (100% + var(--app-gutter-xl)) / 2) - var(--app-gutter-xl));
  display: flex;
  flex-direction: column;
  gap: var(--app-gutter-xl);

  > .v-slug__item {
    width: 100%;
  }

  .with-3-coll & {
    width: calc( ( (100% + var(--app-gutter-xl)) / 3) - var(--app-gutter-xl));
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
  padding-top: 1.25rem;

  @media (min-width: 1200px) {
    width: calc(50% - (var(--app-gutter-xl) / 2));
  }

  &.has-only-image {
    padding: 0;
  }
}

.v-slug__item--image {
  padding: 0;
}

.v-slug__item__title {
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

.v-slug__img {
  display: block;
  width: 100%;
  user-select: none;
  pointer-events: none;
  position: sticky;
  top: 0;
}
</style>

<template>
  <section class="v-spectacle-slug"
  >
    <template v-if="useWindowsWidthIsSmallerThan1200pxCSSBreakpoint().value">
      <div class="v-spectacle-slug__coll">
        <!-- [START] compagnie info -->
        <div class="v-spectacle-slug__coll__item">
          <div class="v-spectacle-slug__coll__text-content__details__peoples app-remove-first-last-child-margin app-font-mono"
          >
            <h1>{{pageData?.pageContent.content.title}}</h1>
            <p style="margin:0; font-size: 1rem; line-height: 1.2; font-weight: 600" v-for="item of pageData?.pageContent.content.company">{{item.authors_name}}</p>
          </div>

          <div class="v-spectacle-slug__coll__text-content__details__details app-remove-first-last-child-margin"
          >
            <div v-html="pageData?.pageContent.content.event_intro" class="app-remove-first-child-margin"/>
            <p>{{pageData?.pageContent.content.eventinfo}}</p>
          </div>
        </div>
        <!-- [END] compagnie info -->
        <!-- [START] spectacles blocks array -->
        <template v-for="(htmlContent, index) of splitHtmlContentByBreakBlock">
          <div class="v-spectacle-slug__coll__item app-remove-first-last-child-margin">
            <AppSpectacleSlugBlock
                    :html_content="htmlContent"
            />
          </div>
        </template>
        <!-- [END] spectacles blocks array -->
      </div>
    </template>
    <template v-else>
      <AppColl>

        <template #left>
          <!-- [START] spectacles blocks array -->
          <template v-for="(htmlContent, index) of splitHtmlContentByBreakBlock">
            <template v-if="index % 2 === 0">
              <div class="v-spectacle-slug__coll__item app-remove-first-last-child-margin">
                <AppSpectacleSlugBlock
                        :html_content="htmlContent"
                />
              </div>
            </template>
          </template>
          <!-- [END] spectacles blocks array -->
        </template>


        <template #right>
          <!-- [START] compagnie info -->
          <div class="v-spectacle-slug__coll__item">
            <div class="v-spectacle-slug__coll__text-content__details__peoples app-remove-first-last-child-margin app-font-mono"
            >
              <h1>{{pageData?.pageContent.content.title}}</h1>
              <p style="margin:0; font-size: 1rem; line-height: 1.2; font-weight: 600" v-for="item of pageData?.pageContent.content.company">{{item.authors_name}}</p>
            </div>

            <div class="v-spectacle-slug__coll__text-content__details__details app-remove-first-last-child-margin"
            >
              <div v-html="pageData?.pageContent.content.event_intro" class="app-remove-first-child-margin"/>
              <p>{{pageData?.pageContent.content.eventinfo}}</p>
            </div>
          </div>
          <!-- [END] compagnie info -->

          <!-- [START] spectacles blocks array -->
          <template v-for="(htmlContent, index) of splitHtmlContentByBreakBlock">
            <template v-if="index % 2 !== 0">
              <div class="v-spectacle-slug__coll__item app-remove-first-last-child-margin">
                <AppSpectacleSlugBlock
                        :html_content="htmlContent"
                />
              </div>
            </template>
          </template>
          <!-- [END] spectacles blocks array -->
        </template>

      </AppColl>
    </template>
  </section>
</template>


<script setup lang="ts">
import {fetchPage_template_diffusionSinglePage, fetchPageSpectacle} from "~/utlis/apiCmsFetch";
import type {
    ApiHTMLContent_Blocks,
    ApiPage_template_diffusionSinglePage
} from "~/utlis/ApiCmsTypes";
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks,
} from "~/composables/cmsData";

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

const pageData: Ref<ApiPage_template_diffusionSinglePage | null> = ref(null)

const splitHtmlContentByBreakBlock: ComputedRef<ApiHTMLContent_Blocks[][] | null> = computed(() => {
    if (!pageData.value) return null

    const arrayToReturn: ApiHTMLContent_Blocks[][] = [[]]

    for (const block of pageData.value.pageContent.content.htmlcontent) {

        if (block.type === 'break') {
            arrayToReturn.push([])
        } else {
            arrayToReturn[arrayToReturn.length - 1].push(block)
        }
    }

    return arrayToReturn.filter(value => value.length > 0)

})

const wrapNumbersInSpan = (value: { text: string, eventID: number }): string => {

    const wrappedText = value.text.replace(/\b(\d+)\b/g, "<span>$1</span>");
    return `<a target="_blank" href="https://infomaniak.events/shop/UwCaGkGB7O/event/${value.eventID}">${wrappedText}</a>`;
};

onMounted(async () => {
    const {slug, id} = useRoute().params as { slug: string, id: string }
    pageData.value = await fetchPage_template_diffusionSinglePage(['diffusion', slug, id])

    useHead({
        title: pageData.value?.pageContent.content.title
    })
})

</script>


<style lang="scss" scoped>
@use '@/assets/style/typo';

.v-spectacle-slug {
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding-left: var(--app-gutter-xl);
  padding-right: var(--app-gutter-xl);
}

.v-spectacle-slug__coll {
  display: flex;
  flex-direction: column;
  gap: var(--app-gutter-xl);
}

.v-spectacle-slug__coll__item {
  background: var(--app-bg-glow-color);
  backdrop-filter: var(--app-bg-glow-filter);
  padding: var(--app-gutter-xl);
  border-radius: 1rem;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;

  &.v-spectacle-slug__coll__item--no-padding {
    padding: 0;
  }
}

.v-spectacle-slug__coll__text-content {
  box-sizing: border-box;
  padding: var(--app-gutter-xl) var(--app-gutter-xl) 1.5rem;
  overflow: hidden;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.v-spectacle-slug__coll__content__text__youtube {
  display: block;
  border: none;
  overflow: hidden;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
  border-radius: 1rem
}

.v-spectacle-slug__coll__text-content__details__peoples {
  text-align: center;
  margin-bottom: .5rem;
}

.v-spectacle-slug__coll__text-content__details__details {
  text-align: center;
}

.v-spectacle-slug__img {
  display: block;
  width: 100%;
  user-select: none;
  pointer-events: none;
  position: sticky;
  top: 0;
  height: auto;
  object-fit: cover;
  border-radius: 1rem;
}

.v-spectacle-slug__coll__text-content__details {
  margin-top: 1rem;
  border-top: solid 2px;
  padding-top: 1rem;
}

.v-spectacle-slug__time-info {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  text-align: right;
  padding-top: var(--app-gutter);
  padding-bottom: var(--app-gutter);

  span {
    color: var(--app-color-secondary);
  }
}

.v-spectacle-slug__toggle-details + .v-spectacle-slug__detailsHtml {
  margin-top: .5rem;
}
</style>

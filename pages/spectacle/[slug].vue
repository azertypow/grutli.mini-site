<template>
  <section class="v-spectacle-slug"
  >

    <template v-if="useWindowsWidthIsSmallerThan1200pxCSSBreakpoint().value">

      <div class="v-spectacle-slug__mobil-coll">
        <!-- [START] slug info -->
        <div class="v-spectacle-slug__item app-remove-first-last-child-margin"
             v-if="pageData"
        >
          <app-spectacle-slug-info
                  :page_data="pageData"
                  :first_and_last_date="firstAndLAstDate"
                  :place_name="placeName"
                  :event_info="pageData?.pageContent.content.eventinfo"
          />
        </div>
        <!-- [END] slug info -->

        <!-- [START] gallery -->
        <div class="v-spectacle-slug__item app-remove-first-last-child-margin"
             v-if="pageData?.pageContent.content.gallery && pageData?.pageContent.content.gallery.length > 0"
        >
          <AppGallery :gallery_data="pageData.pageContent.content.gallery" />
        </div>
        <!-- [END] gallery -->

        <!-- [START] YouTube links -->
        <template v-if="
                pageData?.pageContent.content.youtube_links
                && pageData?.pageContent.content.youtube_links.length > 0
                "
        >
          <template v-for="youtube_link of pageData?.pageContent.content.youtube_links">
            <div class="v-spectacle-slug__item">
              <iframe class="v-spectacle-slug__youtube-link"
                      :src="`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIDFromUrl(youtube_link.link_url)}`"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
              ></iframe>
            </div>
          </template>
        </template>
        <!-- [END] YouTube links -->


        <!-- [START] spectacles blocks array -->
        <template v-for="(htmlContent, index) of splitHtmlContentByBreakBlock">
          <div class="v-spectacle-slug__item app-remove-first-last-child-margin">
            <AppSpectacleSlugBlock
                    :html_content="htmlContent"
            />
          </div>
        </template>
        <!-- [END] spectacles blocks array -->



        <!-- [START] date details -->
        <div class="v-spectacle-slug__item app-remove-first-last-child-margin"
             v-if="
              (pageData?.pageContent.content.htmldetails && pageData?.pageContent.content.htmldetails.length > 0)
              || (dateByMounth && dateByMounth.length > 0)
             "
        >
          <AppSpectacleSlugDateDetails
                  :date_by_mounth="dateByMounth"
                  :content_html_details="pageData?.pageContent.content.htmldetails"
          />
        </div>
        <!-- [END] date details -->



        <!-- [START] cover -->
        <div class="v-spectacle-slug__item v-spectacle-slug__item--no-padding"
             v-if="pageData?.cover && pageData?.cover[0]"
        >
          <div class="v-spectacle-slug__item__cover">
            <img :alt="pageData.cover[0].alt || 'pas de texte alt' "
                 v-if="pageData"
                 class="v-spectacle-slug__item__cover__img"
                 :src="pageData.cover[0].resize.xxl"
            />
            <div class="v-spectacle-slug__item__cover__photographer"
                 v-if="pageData.cover[0].photographer && pageData.cover[0].photographer.length > 0"
            >{{ pageData.cover[0].photographer }}
            </div>
          </div>
        </div>
        <!-- [END] cover -->




      </div>

    </template>

    <AppColl v-else>

      <template #left>

        <!-- [START] cover -->
        <div class="v-spectacle-slug__item v-spectacle-slug__item--no-padding"
             v-if="pageData?.cover && pageData?.cover[0]"
        >
          <div class="v-spectacle-slug__item__cover">
            <img :alt="pageData.cover[0].alt || 'pas de texte alt' "
                 v-if="pageData"
                 class="v-spectacle-slug__item__cover__img"
                 :src="pageData.cover[0].resize.xxl"
            />
            <div class="v-spectacle-slug__item__cover__photographer"
                 v-if="pageData.cover[0].photographer && pageData.cover[0].photographer.length > 0"
            >{{ pageData.cover[0].photographer }}
            </div>
          </div>
        </div>
        <!-- [END] cover -->

        <!-- [START] gallery -->
        <div class="v-spectacle-slug__item app-remove-first-last-child-margin"
             v-if="pageData?.pageContent.content.gallery && pageData?.pageContent.content.gallery.length > 0"
        >
          <AppGallery :gallery_data="pageData.pageContent.content.gallery" />
        </div>
        <!-- [END] gallery -->

        <!-- [START] YouTube links -->
        <template v-if="
                pageData?.pageContent.content.youtube_links
                && pageData?.pageContent.content.youtube_links.length > 0
                "
        >
          <template v-for="youtube_link of pageData?.pageContent.content.youtube_links">
            <div class="v-spectacle-slug__item">
              <iframe class="v-spectacle-slug__youtube-link"
                      :src="`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIDFromUrl(youtube_link.link_url)}`"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
              ></iframe>
            </div>
          </template>
        </template>
        <!-- [END] YouTube links -->


        <!-- [START] date details -->
        <div class="v-spectacle-slug__item app-remove-first-last-child-margin"
             v-if="
              (pageData?.pageContent.content.htmldetails && pageData?.pageContent.content.htmldetails.length > 0)
              || (dateByMounth && dateByMounth.length > 0)
             "
        >
          <AppSpectacleSlugDateDetails
                  :date_by_mounth="dateByMounth"
                  :content_html_details="pageData?.pageContent.content.htmldetails"
          />
        </div>
        <!-- [END] date details -->

      </template>


      <template #right>
        <!-- [START] slug info -->
        <div class="v-spectacle-slug__item app-remove-first-last-child-margin">
          <app-spectacle-slug-info
                  :page_data="pageData"
                  :first_and_last_date="firstAndLAstDate"
                  :place_name="placeName"
                  :event_info="pageData?.pageContent.content.eventinfo"
          />
        </div>
        <!-- [END] slug info -->



        <!-- [START] spectacles blocks array -->
        <template v-for="(htmlContent, index) of splitHtmlContentByBreakBlock">
          <div class="v-spectacle-slug__item app-remove-first-last-child-margin">
            <AppSpectacleSlugBlock
                    :html_content="htmlContent"
            />
          </div>
        </template>
        <!-- [END] spectacles blocks array -->
      </template>

    </AppColl>
  </section>
</template>


<script setup lang="ts">
import {fetchPageSpectacle} from "~/utlis/apiCmsFetch";
import type {ApiCmsPageSpectacle, ApiHTMLContent_Blocks} from "~/utlis/ApiCmsTypes";
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks,
    usePlacesInfo
} from "~/composables/cmsData";
import {getYoutubeVideoIDFromUrl} from "~/utlis/videoHelper";
import {formatDate_byDay, formatDateStartAndDateEndToString, formatTime, normalizeDate} from "~/utlis/formatDate";
import {formatTitle} from "~/utlis/formatStringCiattion";

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

const pageData: Ref<ApiCmsPageSpectacle | null> = ref(null)

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

const dateByMounth: ComputedRef<null | { mouth: string; dates: {day: string, time: string, url?: string}[] }[]> = computed(() => {
    if (!pageData.value) return null

    const groupedDateByMouth: {
        mouth: string
        url?: string
        isRelax?: 'true' | 'false'
        dates: {day: string, time: string}[]
    }[] = []

    pageData.value.pageContent.content.list_of_dates?.forEach(dateItem => {
        if( dateItem.list_of_dates_date ) {
          const date = new Date( normalizeDate( dateItem.list_of_dates_date ))
          const mouthOfDate = date.toLocaleDateString('fr-FR', {month: 'long'})

          const indexOfMouthGroup = groupedDateByMouth.findIndex(value => value.mouth === mouthOfDate)

          const itemToPush = {
              day: formatDate_byDay(dateItem.list_of_dates_date),
              time: dateItem.list_of_dates_hour ? formatTime(dateItem.list_of_dates_hour) : '',
              url: dateItem.list_of_dates_ticket_link,
              isRelax: dateItem.list_of_dates_is_relax,
          }

          if (indexOfMouthGroup === -1) {
              groupedDateByMouth.push({
                  mouth: mouthOfDate,
                  dates: [itemToPush],
              })
          } else {
              groupedDateByMouth[indexOfMouthGroup].dates.push(itemToPush)
          }
        }
    })

    return groupedDateByMouth.toReversed()
})


const placeName: ComputedRef<string | null> = computed(() => {

    if (!pageData.value) return null

    const placesInfo = usePlacesInfo().value
    if (!placesInfo) return pageData.value.pageContent.content.places

    const translatedPlaceBySlug =
        placesInfo.value.find(placeItem => placeItem.slug === pageData.value?.pageContent.content.places)

    if (translatedPlaceBySlug) return translatedPlaceBySlug.title
    return null
})

const firstAndLAstDate: ComputedRef<null | string> = computed(() => {

    if (!pageData.value) return null

    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    const dateEnd = new Date( normalizeDate( pageData.value.pageContent.content.dateend.replace(" ", "T")) )
    dateEnd.setHours(0, 0, 0, 0)

    if (currentDate > dateEnd) return 'passé'

    return formatDateStartAndDateEndToString(pageData.value.pageContent.content.datestart, pageData.value.pageContent.content.dateend)
})

onMounted(async () => {

    const pageDataFetched = await fetchPageSpectacle(useRoute().params.slug as string)

    if( !pageDataFetched ) useRouter().push('/erreur')

    pageData.value = pageDataFetched

    useHead({
        title: 'Spectacle | ' + pageData.value?.pageContent.content.title
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

.v-spectacle-slug__item {
  background: var(--app-bg-glow-color);
  backdrop-filter: var(--app-bg-glow-filter);
  padding: var(--app-gutter-xl);
  border-radius: 1rem;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  max-width: 25rem;
  margin-left: auto;
  margin-right: auto;

  &.v-spectacle-slug__item--no-padding {
    padding: 0;
  }
}

.v-spectacle-slug__youtube-link {
  display: block;
  border: none;
  overflow: hidden;
  height: auto;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  background: var(--app-color-grey);
  margin: calc( -1 * var(--app-gutter-xl) );
  width: calc(100% +   2 * var(--app-gutter-xl));
}

.v-spectacle-slug__text-content {
  background: var(--app-bg-glow-color);
  backdrop-filter: var(--app-bg-glow-filter);
  box-sizing: border-box;
  padding: var(--app-gutter-xl) var(--app-gutter-xl) 1.5rem;
  overflow: hidden;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.v-spectacle-slug__content__text__image {
  position: relative;
  width: 100%;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
}

.v-spectacle-slug__content__text__image__img {
  display: block;
  width: 100%;
  height: auto;
}

.v-spectacle-slug__content__text__image__legendary {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
}

.v-spectacle-slug__content__text__youtube {
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

:global( .v-spectacle-slug__text-content__details__peoples > *) {
  @extend .app-font-small;
}

:global( .v-spectacle-slug__text-content__details__details > *) {
  @extend .app-font-small;
}

.v-spectacle-slug__item__cover {
  position: relative;
  width: 100%;
}

.v-spectacle-slug__item__cover__img {
  display: block;
  width: 100%;
  user-select: none;
  pointer-events: none;
  height: auto;
  object-fit: cover;
  border-radius: 1rem;
}

.v-spectacle-slug__item__cover__photographer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding-left: 1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;

  .only-one & {
    bottom: var(--app-gutter-xl);
    left: calc( -1 * var(--app-gutter-xl) );
    width: calc(100% +   2 * var(--app-gutter-xl));
  }
}

.v-spectacle-slug__text-content__details {
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

.v-spectacle-slug__mobil-coll {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  gap: var(--app-gutter-xl);
  flex-direction: column;
}


.v-spectacle-slug__mobil-coll__item {
  //width: 100%;
  //display: flex;
  //flex-wrap: nowrap;
  //gap: var(--app-gutter-xl);
  //flex-direction: column;
  //flex-shrink: 1;
}
</style>

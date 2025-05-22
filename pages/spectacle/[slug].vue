<template>
  <section class="v-spectacle-slug"
  >
    <div class="v-spectacle-slug__coll">

      <!-- [START] 2 first blocks -->
      <div class="v-spectacle-slug__coll__item v-spectacle-slug__coll__item--no-padding">
        <img alt="image texte"
             v-if="pageData"
             class="v-spectacle-slug__img"
             :src="pageData?.cover[0].resize.xxl"
        />
      </div>

      <div class="v-spectacle-slug__coll__item app-remove-first-last-child-margin">
        <app-spectacle-slug-info
                :page_data="pageData"
                :first_and_last_date="firstAndLAstDate"
                :place_name="placeName"
        />
      </div>
      <!-- [END] 2 first blocks -->


      <!-- [START] spectacles blocks -->
      <template v-for="htmlContent of splitHtmlContentByBreakBlock">
        <div class="v-spectacle-slug__coll__item app-remove-first-last-child-margin">
          <AppSpectacleSlugBlock
                  :html_content="htmlContent"
          />
        </div>
      </template>
      <!-- [END] spectacles blocks -->


      <div class="v-spectacle-slug__coll__item app-remove-first-last-child-margin">
        <AppSpectacleSlugDateDetails
                :date_by_mounth="dateByMounth"
                :content_html_details="pageData?.pageContent.content.htmldetails"
        />
      </div>

      <div class="v-spectacle-slug__coll__item app-remove-first-last-child-margin">
        <div class="v-spectacle-slug__coll__text-content__details__peoples app-remove-first-last-child-margin"
             v-html="pageData?.pageContent.content.peoples.replaceAll(':', '<br>')"
        />
        <div class="v-spectacle-slug__coll__text-content__details__details app-remove-first-last-child-margin"
             v-html="pageData?.pageContent.content.details.replaceAll(':', '<br>')"
        />
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import {fetchPageSpectacle} from "~/utlis/apiCmsFetch";
import type {ApiCmsPageSpectacle, ApiHTMLContent_Blocks} from "~/utlis/ApiCmsTypes";
import {type ApiTicketInfomaniak_event, apiTicketInfomaniak_fetchEvents} from "~/utlis/apiTicketInfomaniak";
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks,
    usePlacesInfo
} from "~/composables/cmsData";
import {getYoutubeVideoIDFromUrl} from "~/utlis/videoHelper";
import {formatDate_byDay, formatDateStartAndDateEndToString, formatTime} from "~/utlis/formatDate";
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

const dateByMounth: ComputedRef<null | { mouth: string; dates: string[] }[]> = computed(() => {
    if (!pageData.value) return null

    const groupedDateByMouth: {
        mouth: string
        dates: string[]
    }[] = []

    pageData.value.pageContent.content.list_of_dates.forEach(dateItem => {

        const date = new Date(dateItem.list_of_dates_date)
        const mouthOfDate = date.toLocaleDateString('fr-FR', {month: 'long'})

        const indexOfMouthGroup = groupedDateByMouth.findIndex(value => value.mouth === mouthOfDate)

        if (indexOfMouthGroup === -1) {
            groupedDateByMouth.push({
                mouth: mouthOfDate,
                dates: [`${formatDate_byDay(dateItem.list_of_dates_date)} ${formatTime(dateItem.list_of_dates_hour)}`]
            })
        } else {
            groupedDateByMouth[indexOfMouthGroup].dates.push(`${formatDate_byDay(dateItem.list_of_dates_date)} ${formatTime(dateItem.list_of_dates_hour)}`)
        }
    })

    return groupedDateByMouth
})


// todo: clean
const ticketInfo: Ref<ApiTicketInfomaniak_event[] | null | 'loaded'> = ref(null)

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
    const dateEnd = new Date(pageData.value.pageContent.content.dateend.replace(" ", "T"))
    dateEnd.setHours(0, 0, 0, 0)

    if (currentDate > dateEnd) return 'passé'

    return formatDateStartAndDateEndToString(pageData.value.pageContent.content.datestart, pageData.value.pageContent.content.dateend)
})

const groupedByMonth: ComputedRef<{ [month: string]: { text: string, eventID: number }[] } | null> = computed(() => {
    if (ticketInfo.value === null) return null
    if (!Array.isArray(ticketInfo.value)) return null

    return ticketInfo.value.reduce((acc: { [month: string]: { text: string, eventID: number }[] }, eventItem) => {
        const date = new Date(eventItem.date.replace(" ", "T"));
        const monthKey = date.toLocaleDateString('fr-FR', {month: 'long', year: 'numeric'});

        if (!acc[monthKey]) {
            acc[monthKey] = [];
        }

        acc[monthKey].push({
            text: new Date(eventItem.date.replace(" ", "T")).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
            }).replace(':', 'h').replace(/\b(\d{1,2}h\d{2})\b/g, 'à $1'),
            eventID: eventItem.event_id
        });

        return acc;
    }, {})
});

const wrapNumbersInSpan = (value: { text: string, eventID: number }): string => {

    const wrappedText = value.text.replace(/\b(\d+)\b/g, "<span>$1</span>");
    return `<a target="_blank" href="https://infomaniak.events/shop/UwCaGkGB7O/event/${value.eventID}">${wrappedText}</a>`;
};

onMounted(async () => {


    pageData.value = await fetchPageSpectacle(useRoute().params.slug as string)

    useHead({
        title: 'Spectacle | ' + pageData.value?.pageContent.content.title
    })

    if (!pageData.value) return
    if (!pageData.value.pageContent.content.eventtitle[0]) return

    apiTicketInfomaniak_fetchEvents({
        search: pageData.value.pageContent.content.eventtitle[0]
    }).then((ticketInfomaniakEvents: ApiTicketInfomaniak_event[]) => {
        ticketInfo.value = ticketInfomaniakEvents.filter(value => {
            return pageData.value!.pageContent.content.eventtitle.includes(value.name)
        })
    })


})

</script>


<style lang="scss" scoped>
@use '@/assets/style/typo';

.v-spectacle-slug {
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-left: var(--app-gutter-xl);
  padding-right: var(--app-gutter-xl);
  gap: var(--app-gutter-xl);

  @media (min-width: 1200px) {
    flex-direction: row;
    flex-wrap: nowrap;
  }
}

.v-spectacle-slug__coll {
  flex-shrink: 0;
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--app-gutter-xl);
}

.v-spectacle-slug__coll__item {
  background: var(--app-color-grey);
  padding: var(--app-gutter-xl);
  border-radius: 1rem;
  overflow: hidden;
  box-sizing: border-box;
  width: calc(50% - (var(--app-gutter-xl) / 2));

  &.v-spectacle-slug__coll__item--no-padding {
    padding: 0;
  }
}

.v-spectacle-slug__coll__text-content {
  background: var(--app-color-grey);
  box-sizing: border-box;
  padding: var(--app-gutter-xl) var(--app-gutter-xl) 1.5rem;
  overflow: hidden;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.v-spectacle-slug__coll__content__text__image {
  position: relative;
  width: 100%;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
}

.v-spectacle-slug__coll__content__text__image__img {
  display: block;
  width: 100%;
  height: auto;
}

.v-spectacle-slug__coll__content__text__image__legendary {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
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

:global( .v-spectacle-slug__coll__text-content__details__peoples > *) {
  @extend .app-font-small;
}

:global( .v-spectacle-slug__coll__text-content__details__details > *) {
  @extend .app-font-small;
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
    color: var(--app-color-orange);
  }
}

.v-spectacle-slug__toggle-details + .v-spectacle-slug__detailsHtml {
  margin-top: .5rem;
}
</style>

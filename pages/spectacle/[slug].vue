<template>
    <section class="v-spectacle-slug"
    >
      <div class="v-spectacle-slug__coll">

        <div class="v-spectacle-slug__coll__item v-spectacle-slug__coll__item--no-padding">
          <img alt="image texte"
               v-if="pageData"
               class="v-spectacle-slug__img"
               :src="pageData?.cover[0].resize.xxl"
          />
        </div>

        <div class="v-spectacle-slug__coll__item app-remove-first-last-child-margin">
          <div class="v-spectacle-slug__coll__header">
            <div class="v-spectacle-slug__coll__header__season-name">
              {{useAppSeasons().value?.value.find(item => item.slug === pageData?.pageContent.content.season)?.content.title}}
            </div>
            <div class="v-spectacle-slug__coll__header__ticket">

              <a class="app-button-grey app-font-small"
                 v-if="pageData?.pageContent.content.externalticketservicelink"
                 :href="pageData.pageContent.content.externalticketservicelink"
                 target="_blank"
              >
                <template v-if="pageData.pageContent.content.externalticketservicename">
                  {{pageData.pageContent.content.externalticketservicename}}
                </template>
                <template v-else>
                  Prendre un billet
                </template>
              </a>

              <div class="app-button-grey app-font-small"
                   v-else-if="ticketInfo && ticketInfo === 'loaded'"
              ><span class=""
                     style="opacity: .5"
              >chargement…</span></div>

              <a class="app-button-grey app-font-small"
                 v-else-if="ticketInfo && ticketInfo.length > 0"
                 target="_blank"
                 :href="`https://infomaniak.events/shop/UwCaGkGB7O/events/${ticketInfo[0].event_id}`"
              >Prendre un billet</a>
              <a class="app-button-grey app-font-small"
                 href="#dates-details"
              >Dates & horaires</a>
            </div>
          </div>

          <div class="v-spectacle-slug__coll__text-content__date_and_place">
            <div v-if="firstAndLAstDate">{{ firstAndLAstDate }}</div>
            <div>{{ placeName }}</div>
          </div>
          <h1 class="v-spectacle-slug__coll__text-content__title app-font-align-center app-font-h3">
            {{ pageData?.pageContent.content.title }}</h1>
          <div class="v-spectacle-slug__coll__text-content__is-cover app-font-align-center app-font-small"
               v-if="pageData?.pageContent.content.iscover === 'true'"
          >
            Reprise
          </div>

          <div class="v-spectacle-slug__coll__text-content__company app-font-mono">
            <div v-for="companyPeople of pageData?.pageContent.content.company">
              <template v-if="companyPeople.authors_link">
                <a target="_blank" :href="companyPeople.authors_link">
                  {{ companyPeople.authors_name }}
                </a>
              </template>
              <template v-else>
                <div>
                  {{ companyPeople.authors_name }}
                </div>
              </template>
            </div>
          </div>
        </div>

        <template v-for="htmlContent of splitHtmlContentByBreakBlock">
          <div class="v-spectacle-slug__coll__item app-remove-first-last-child-margin">
            <template v-for="blockContent of htmlContent">

              <div v-if="blockContent.type === 'textWithTitle'"
                   class="v-spectacle-slug__coll__content__text__text"
                   v-html="blockContent.content.text"
              ></div>

              <div v-if="blockContent.type === 'link'"
                   class="v-spectacle-slug__coll__content__text__link"
              >
                <a class="app-button"
                   target="_blank"
                   :href="blockContent.content.link"
                >
                  <span>{{ blockContent.content.text }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                       fill="undefined">
                    <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>
                  </svg>
                </a>
              </div>

              <div v-if="blockContent.type === 'quote'"
                   class="v-spectacle-slug__coll__content__text__quote"
              >
                <div v-html="blockContent.content.text"></div>
                <div v-html="formatTitle(blockContent.content.citation)"></div>
              </div>

              <div v-else-if="blockContent.type === 'text'"
                   class="v-spectacle-slug__coll__content__text__text app-remove-first-last-child-margin"
                   v-html="blockContent.content.text"
              ></div>

              <iframe v-if="blockContent.type === 'video'"
                      class="v-spectacle-slug__coll__content__text__youtube"
                      :src="`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIDFromUrl(blockContent.content.url)}`"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
              ></iframe>


              <template v-else-if="blockContent.type === 'image'">
                <div class="v-spectacle-slug__coll__content__text__image"
                     v-for="image of blockContent.images"
                >
                  <img class="v-spectacle-slug__coll__content__text__image__img"
                       :src="image.resize.large"
                       :alt="image.alt || 'pas de texte alt'"
                  >
                  <div class="v-spectacle-slug__coll__content__text__image__legendary"
                  >{{ image.photographer }}
                  </div>
                </div>
              </template>


              <div v-else-if="blockContent.type === 'imageGallery'"
                   class="v-spectacle-slug__coll__content__text__gallery"
              >
                <template v-for="image of blockContent.images">
                  <div class="v-spectacle-slug__coll__content__text__gallery__item">
                    <img class="v-spectacle-slug__coll__content__text__gallery__item__img"
                         :src="image.resize.large"
                         :alt="image.alt || 'pas de texte alt'"
                    >
                    <div class="v-spectacle-slug__coll__content__text__gallery__item__legendary"
                    >{{ image.photographer }}
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </template>


        <div class="v-spectacle-slug__coll__item app-remove-first-last-child-margin">
          <div id="dates-details"></div>
          <div v-if="dateByMounth"
               style="margin-bottom: 1rem"
          >
            <div v-for="dateGroup of dateByMounth"
                 class="v-spectacle-slug__coll__text-content__details__dates"
            >
              <div class="v-spectacle-slug__coll__text-content__details__dates__mouth">{{dateGroup.mouth}}</div>
              <div class="v-spectacle-slug__coll__text-content__details__dates__days">
                <span v-for="(date, index) of dateGroup.dates">
                  {{date}}<template v-if="index < dateGroup.dates.length - 1">, </template>
                </span>
              </div>
            </div>
          </div>
          <template v-for="content of pageData?.pageContent.content.htmldetails">
            <div class="app-remove-first-last-child-margin v-spectacle-slug__detailsHtml">
              <div v-if="content.type === 'text'"
                   v-html="content.content.text"
              ></div>

              <img v-if="content.type === 'image'"
                   v-for="image of content.images"
                   :src="image.resize.large"
                   :alt="image.alt || 'pas de texte alt'"
              >
            </div>
          </template>
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
    useAppSeasons,
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useFalkIsActive,
    useParentSubPageForNavLinks,
    usePlacesInfo
} from "~/composables/cmsData";
import {getYoutubeVideoIDFromUrl} from "~/utlis/videoHelper";
import {convertMinutesToHoursAndMinutes} from "~/utlis/minuteToHHhMMString";
import {formatDate, formatDate_byDay, formatDateStartAndDateEndToString} from "~/utlis/formatDate";
import {formatTitle} from "~/utlis/formatStringCiattion";
import items from "@redocly/ajv/lib/vocabularies/applicator/items";

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
        const mouthOfDate = date.toLocaleDateString('fr-FR', { month: 'long' })

        const indexOfMouthGroup = groupedDateByMouth.findIndex(value => value.mouth === mouthOfDate)

        if (indexOfMouthGroup === -1) {
            groupedDateByMouth.push({
                mouth: mouthOfDate,
                dates: [formatDate_byDay( dateItem.list_of_dates_date )]
            })
        } else {
            groupedDateByMouth[indexOfMouthGroup].dates.push(formatDate_byDay( dateItem.list_of_dates_date ))
        }
    })

    return groupedDateByMouth
})


// todo: clean
const ticketInfo: Ref<ApiTicketInfomaniak_event[] | null | 'loaded'> = ref(null)

const placeName: ComputedRef<string | null> = computed(() => {

    if( !pageData.value ) return null

    const placesInfo = usePlacesInfo().value
    if( ! placesInfo ) return pageData.value.pageContent.content.places

    const translatedPlaceBySlug =
        placesInfo.value.find(placeItem => placeItem.slug === pageData.value?.pageContent.content.places)

    if(translatedPlaceBySlug) return translatedPlaceBySlug.title
    return null
})

const firstAndLAstDate = computed(() => {

    if( !pageData.value ) return null

    const currentDate = new Date()
    currentDate.setHours(0,0,0,0)
    const dateEnd = new Date(pageData.value.pageContent.content.dateend.replace(" ", "T"))
    dateEnd.setHours(0,0,0,0)

    if (currentDate > dateEnd) return 'passé'

    return formatDateStartAndDateEndToString(pageData.value.pageContent.content.datestart, pageData.value.pageContent.content.dateend)
})

const groupedByMonth: ComputedRef<{[month: string]: {text: string, eventID: number}[]} | null> = computed(() => {
    if (ticketInfo.value === null) return null
    if ( !Array.isArray(ticketInfo.value) ) return null

    return ticketInfo.value.reduce((acc: {[month: string]: {text: string, eventID: number}[]}, eventItem) => {
        const date = new Date(eventItem.date.replace(" ", "T"));
        const monthKey = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

        if (!acc[monthKey]) {
            acc[monthKey] = [];
        }

        acc[monthKey].push({
            text: new Date(eventItem.date.replace(" ", "T")).toLocaleDateString('fr-FR',{
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

    if( !pageData.value) return
    if(  !pageData.value.pageContent.content.eventtitle[0] ) return

    apiTicketInfomaniak_fetchEvents({
        search: pageData.value.pageContent.content.eventtitle[0]
    }).then((ticketInfomaniakEvents: ApiTicketInfomaniak_event[]) => {
        ticketInfo.value = ticketInfomaniakEvents.filter(value => {
            return pageData.value!.pageContent.content.eventtitle.includes(value.name)
        })
    })


})

</script>





<style lang="scss" scoped >
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

.v-spectacle-slug__coll__text-content__details__dates {
  display: flex;
  gap: 1rem;
}

.v-spectacle-slug__coll__text-content__details__dates__days {
  display: flex;
  flex-wrap: wrap;
  gap: 0 1rem;
}

.v-spectacle-slug__coll__text-content {
  background: var(--app-color-grey);
  box-sizing: border-box;
  padding: var(--app-gutter-xl) var(--app-gutter-xl) 1.5rem;
  overflow: hidden;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.v-spectacle-slug__coll__text-content__title {
  margin-bottom: .5rem;
  margin-top: 0;
}

.v-spectacle-slug__coll__text-content__is-cover {
  margin-bottom: .5rem;
  color: var(--app-color-orange);
}

.v-spectacle-slug__coll__text-content__company {
  text-align: center;
  margin-bottom: 1rem;
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

.v-spectacle-slug__coll__content__text__gallery {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: var(--app-gutter-xl);
  overflow-x: scroll;
  height: 50vh;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);

  /***
  scroll
  */

  /* CSS pseudos elements (firefox) */
  scrollbar-width: thin;
  scrollbar-color: var(--app-color-orange) transparent;
  scrollbar-gutter: stable both-edges;

  /* WebKit (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--app-color-orange);
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }

  /***
  / scroll
  */

  img {
    display: block;
    width: auto;
    height: 100%;
    flex-shrink: 0;
  }
}

.v-spectacle-slug__coll__content__text__gallery__item {
  position: relative;

  .v-spectacle-slug__coll__content__text__gallery__item__legendary {
    position: absolute;
    bottom: 0;
    left: 0;
    background: white;
    width: 100%;
    padding-left: var(--app-gutter);
    padding-right: var(--app-gutter);
    box-sizing: border-box;
  }
}


.v-spectacle-slug__coll__content__text__link {
  .app-button {
    margin-bottom: var(--app-gutter-xl);
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      display: block;
      height: 1rem;
      width: auto;
      flex-shrink: 0;
      fill: var(--app-color-orange);
    }
  }
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

.v-spectacle-slug__coll__content__text__quote {

  > div:first-child {
    font-style: italic;
  }

  > div:nth-child(2) {
    text-align: right;
  }

}

.v-spectacle-slug__coll__header {
  display: flex;
  background: var(--app-color-grey);
  justify-content: space-between;
}

.v-spectacle-slug__coll__header__ticket {
  display: flex;
  flex-direction: column;
  gap: var(--app-gutter-xl);
  align-items: flex-end;

  a {
    display: block;
    text-decoration: none;
    background: white;
  }

}

.v-spectacle-slug__coll__text-content__date_and_place {
  box-sizing: border-box;
  padding: 0 0 1rem;
  text-align: center;
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

:global(.v-spectacle-slug__detailsHtml > div:last-child > *:last-child) {
  margin-bottom: 0;
}
</style>

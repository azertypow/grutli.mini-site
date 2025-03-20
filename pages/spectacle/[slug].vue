<template>
    <section class="v-spectacle-slug"
    >
      <div class="v-spectacle-slug__coll">
        <img alt="image texte"
             v-if="pageData"
             class="v-spectacle-slug__img"
             :src="pageData?.cover[0].resize.xxl"
        />
      </div>
      <div class="v-spectacle-slug__coll"
      >

        <div class="v-spectacle-slug__coll__header">
          <div class="v-spectacle-slug__coll__header__saison-name">

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
        <div class="v-spectacle-slug__coll__text-content app-remove-first-last-child-margin">

          <div class="v-spectacle-slug__coll__text-content__date_and_place">
            <div v-if="firstAndLAstDate">{{firstAndLAstDate}}</div>
            <div>{{placeName}}</div>
          </div>
          <h1 class="v-spectacle-slug__coll__text-content__title app-font-align-center app-font-h3">{{ pageData?.pageContent.content.title }}</h1>
          <div class="v-spectacle-slug__coll__text-content__is-cover app-font-align-center app-font-small"
               v-if="pageData?.pageContent.content.iscover === 'true'"
          >
            Reprise
          </div>

          <div class="v-spectacle-slug__coll__text-content__company app-font-mono">
            <div v-for="companyPeople of pageData?.pageContent.content.company">
              <template v-if="companyPeople.authors_link">
                <a target="_blank" :href="companyPeople.authors_link">
                  {{companyPeople.authors_name}}
                </a>
              </template>
              <template v-else>
                <div>
                  {{companyPeople.authors_name}}
                </div>
              </template>
            </div>
          </div>

          <template v-if="useFalkIsActive().value">

            <template v-if="pageData?.pageContent.content.htmlcontent_falk.length">
              <!--FALK est activé et il y a du texte FLAK-->

              <!--            block system -->
              <template v-for="content of pageData?.pageContent.content.htmlcontent_falk">
                <div v-if="content.type === 'textWithTitle'"
                     class="v-spectacle-slug__coll__content__text__text"
                     v-html="content.content.text"
                ></div>

                <div v-if="content.type === 'link'"
                     class="v-spectacle-slug__coll__content__text__link"
                >
                  <a class="app-button"
                     target="_blank"
                     :href="content.content.link"
                  >
                    <span>{{content.content.text}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
                  </a>
                </div>

                <div v-if="content.type === 'quote'"
                     class="v-spectacle-slug__coll__content__text__quote"
                >
                  <div v-html="content.content.text"></div>
                  <div v-html="formatTitle(content.content.citation)"></div>
                </div>

                <div v-else-if="content.type === 'text'"
                     class="v-spectacle-slug__coll__content__text__text"
                     v-html="content.content.text"
                ></div>

                <iframe v-if="content.type === 'video'"
                        class="v-spectacle-slug__coll__content__text__youtube"
                        :src="`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIDFromUrl(content.content.url)}`"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                ></iframe>

                <img v-else-if="content.type === 'image'"
                     class="v-spectacle-slug__coll__content__text__image"
                     v-for="image of content.images"
                     :src="image.resize.large"
                     :alt="image.alt || 'pas de texte alt'"
                >

                <div v-else-if="content.type === 'imageGallery'"
                     class="v-spectacle-slug__coll__content__text__gallery"
                >
                  <img v-for="image of content.images"
                       :src="image.resize.large"
                       :alt="image.alt || 'pas de texte alt'"
                  >
                </div>
              </template>
              <!--            /block system -->

            </template>

            <template v-else>
              <!--FALK est activé mais PAS de FALK, on prend le texte normal et on ajoute une phrase-->

              <h4 class="app-font-align-center"
                  style="color: var(--app-color-orange)"
              >(La version FALC n'est pas encore mise en ligne)</h4>

              <!--            block system -->
              <template v-for="content of pageData?.pageContent.content.htmlcontent">
                <div v-if="content.type === 'textWithTitle'"
                     class="v-spectacle-slug__coll__content__text__text"
                     v-html="content.content.text"
                ></div>

                <div v-if="content.type === 'link'"
                     class="v-spectacle-slug__coll__content__text__link"
                >
                  <a class="app-button"
                     target="_blank"
                     :href="content.content.link"
                  >
                    <span>{{content.content.text}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
                  </a>
                </div>

                <div v-if="content.type === 'quote'"
                     class="v-spectacle-slug__coll__content__text__quote"
                >
                  <div v-html="content.content.text"></div>
                  <div v-html="formatTitle(content.content.citation)"></div>
                </div>

                <div v-else-if="content.type === 'text'"
                     class="v-spectacle-slug__coll__content__text__text"
                     v-html="content.content.text"
                ></div>

                <iframe v-if="content.type === 'video'"
                        class="v-spectacle-slug__coll__content__text__youtube"
                        :src="`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIDFromUrl(content.content.url)}`"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                ></iframe>

                <img v-else-if="content.type === 'image'"
                     class="v-spectacle-slug__coll__content__text__image"
                     v-for="image of content.images"
                     :src="image.resize.large"
                     :alt="image.alt || 'pas de texte alt'"
                >

                <div v-else-if="content.type === 'imageGallery'"
                     class="v-spectacle-slug__coll__content__text__gallery"
                >
                  <img v-for="image of content.images"
                       :src="image.resize.large"
                       :alt="image.alt || 'pas de texte alt'"
                  >
                </div>
              </template>
              <!--            /block system -->
            </template>
          </template>

          <template v-else>
            <!--texte original-->
            <!--            block system -->
            <template v-for="content of pageData?.pageContent.content.htmlcontent">
              <div v-if="content.type === 'textWithTitle'"
                   class="v-spectacle-slug__coll__content__text__text"
                   v-html="content.content.text"
              ></div>

              <div v-if="content.type === 'link'"
                   class="v-spectacle-slug__coll__content__text__link"
              >
                <a class="app-button"
                   target="_blank"
                   :href="content.content.link"
                >
                  <span>{{content.content.text}}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
                </a>
              </div>

              <div v-if="content.type === 'quote'"
                   class="v-spectacle-slug__coll__content__text__quote"
              >
                <div v-html="content.content.text"></div>
                <div v-html="formatTitle(content.content.citation)"></div>
              </div>

              <div v-else-if="content.type === 'text'"
                   class="v-spectacle-slug__coll__content__text__text"
                   v-html="content.content.text"
              ></div>

              <iframe v-if="content.type === 'video'"
                      class="v-spectacle-slug__coll__content__text__youtube"
                      :src="`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIDFromUrl(content.content.url)}`"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
              ></iframe>

              <img v-else-if="content.type === 'image'"
                   class="v-spectacle-slug__coll__content__text__image"
                   v-for="image of content.images"
                   :src="image.resize.large"
                   :alt="image.alt || 'pas de texte alt'"
              >

              <div v-else-if="content.type === 'imageGallery'"
                   class="v-spectacle-slug__coll__content__text__gallery"
              >
                <img v-for="image of content.images"
                     :src="image.resize.large"
                     :alt="image.alt || 'pas de texte alt'"
                >
              </div>
            </template>
            <!--            /block system -->
          </template>

          <div id="dates-details"></div>
          <template v-if="ticketInfo">
            <div class="v-spectacle-slug__dates">
              <div class="v-spectacle-slug__dates__item"
                   v-for="(mounthItem, mounthName) of groupedByMonth"
              >
                <div class="v-spectacle-slug__dates__item__mouth">
                  {{ mounthName }}
                </div>
                <div class="v-spectacle-slug__dates__item__days">
                  <div class="v-spectacle-slug__dates__item__days__day"
                       v-for="dayDate of mounthItem.map(wrapNumbersInSpan)"
                  >
                    <div v-html="dayDate"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="v-spectacle-slug__time-info">
              <div v-if="Array.isArray(ticketInfo) && ticketInfo[0]?.duration_in_minutes">
                Durée {{convertMinutesToHoursAndMinutes(ticketInfo[0].duration_in_minutes)}}
              </div>
            </div>
          </template>

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


          <div class="v-spectacle-slug__coll__text-content__details">

            <div class="v-spectacle-slug__coll__text-content__details__peoples"
                 v-html="pageData?.pageContent.content.peoples.replaceAll(':', '<br>')"
            />
            <div class="v-spectacle-slug__coll__text-content__details__details"
                 v-html="pageData?.pageContent.content.details.replaceAll(':', '<br>')"
            />

          </div>

        </div>
      </div>
    </section>
</template>





<script setup lang="ts">
import {fetchPageSpectacle} from "~/utlis/apiCmsFetch";
import type {ApiCmsPageSpectacle} from "~/utlis/ApiCmsTypes";
import {type ApiTicketInfomaniak_event, apiTicketInfomaniak_fetchEvents} from "~/utlis/apiTicketInfomaniak";
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useFalkIsActive,
    useParentSubPageForNavLinks,
    usePlacesInfo
} from "~/composables/cmsData";
import {getYoutubeVideoIDFromUrl} from "~/utlis/videoHelper";
import {convertMinutesToHoursAndMinutes} from "~/utlis/minuteToHHhMMString";
import {formatDateStartAndDateEndToString} from "~/utlis/formatDate";
import {formatTitle} from "~/utlis/formatStringCiattion";

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

const pageData: Ref<ApiCmsPageSpectacle | null> = ref(null)
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

  @media (min-width: 1200px) {
    width: calc(50% - (var(--app-gutter-xl) / 2));
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
  display: block;
  width: 100%;
  height: auto;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
}

.v-spectacle-slug__coll__content__text__gallery {
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
  padding: var(--app-gutter-xl) var(--app-gutter-xl) 2rem;
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

.v-spectacle-slug__dates {
  display: flex;
  flex-direction: column;
  gap: var(--app-gutter-xl);
  margin-top: 1rem;
  margin-bottom: .5rem;
}

.v-spectacle-slug__dates__item {
  display: flex;
  gap: var(--app-gutter-xl);
  flex-direction: row;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: var(--app-gutter);
  }
}

.v-spectacle-slug__dates__item__mouth {
  width: 5rem;
  flex-shrink: 0;
}

.v-spectacle-slug__dates__item__days {
  display: flex;
  flex-direction: column;
  gap: var(--app-gutter) 1rem;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    padding-left: var(--app-gutter-xl);
  }
}

.v-spectacle-slug__dates__item__days__day {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--app-gutter);

  svg {
    height: 1rem;
    display: block;
    transform: rotate(0);
    transition: transform ease-out .15s;
    fill: rgba(0, 0, 0, .1);
  }

  &:hover {
    color: var(--app-color-orange);
  }
}

:global(.v-spectacle-slug__dates__item__days__day span) {
  color: var(--app-color-orange);
  //font-variation-settings: "slnt" 0, "wght" 800;
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

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
          <div class="v-spectacle-slug__coll__header__content"
               v-if="firstAndLAstDate">
            <div>{{firstAndLAstDate}}</div>
            <div>{{pageData?.pageContent.content.places}}</div>
          </div>
        </div>
        <div class="v-spectacle-slug__coll__text-content app-remove-first-last-child-margin">

          <h1 class="v-spectacle-slug__coll__text-content__title app-font-align-center app-font-h3">{{ pageData?.pageContent.content.title }}</h1>

          <div class="v-spectacle-slug__coll__text-content__company">
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

                <div v-if="content.type === 'quote'"
                     class="v-spectacle-slug__coll__content__text__quote"
                >
                  <div v-html="content.content.text"></div>
                  <div v-html="content.content.citation"></div>
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
              >(La version FALK n'est pas encore mise en ligne)</h4>

              <!--            block system -->
              <template v-for="content of pageData?.pageContent.content.htmlcontent">
                <div v-if="content.type === 'textWithTitle'"
                     class="v-spectacle-slug__coll__content__text__text"
                     v-html="content.content.text"
                ></div>

                <div v-if="content.type === 'quote'"
                     class="v-spectacle-slug__coll__content__text__quote"
                >
                  <div v-html="content.content.text"></div>
                  <div v-html="content.content.citation"></div>
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

              <div v-if="content.type === 'quote'"
                   class="v-spectacle-slug__coll__content__text__quote"
              >
                <div v-html="content.content.text"></div>
                <div v-html="content.content.citation"></div>
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

          <div class="v-spectacle-slug__coll__text-content__peoples"
               v-if="showDetails"
               v-html="pageData?.pageContent.content.peoples.replaceAll(':', '<br>')"
          />

          <div class="v-spectacle-slug__coll__text-content__details"
               v-if="showDetails"
               v-html="pageData?.pageContent.content.details.replaceAll(':', '<br>')"
          />

          <div class="v-spectacle-slug__toggle-details"
          >
            <div class="v-spectacle-slug__toggle-details__button"
                 @click="showDetails = !showDetails"
            >
              <template v-if="showDetails">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg>
              </template>
              <template v-else><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg></template>
              <div>détails</div>
            </div>
          </div>

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
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z"/></svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="v-spectacle-slug__time-info">
              <div v-if="ticketInfo[0]?.duration_in_minutes">
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


        </div>


        <div class="v-spectacle-slug__ticket app-font-h3">

          <a v-if="pageData?.pageContent.content.externalticketservicelink"
             :href="pageData.pageContent.content.externalticketservicelink"
             target="_blank"
          >
            <template v-if="pageData.pageContent.content.externalticketservicename">
              {{pageData.pageContent.content.externalticketservicename}}
            </template>
            <template v-else="pageData.pageContent.content.externalticketservicename">
              prendre un billet
            </template>
          </a>

          <a v-else-if="ticketInfo && ticketInfo.length > 0"
             :href="`https://infomaniak.events/shop/UwCaGkGB7O/events/${ticketInfo[0].event_id}`"
          >prendre un billet</a>

          <div v-else-if="ticketInfo && ticketInfo.length === 0"
          >plus de dates</div>

          <div v-else
          >billetterie à venir</div>
        </div>
      </div>
    </section>
</template>





<script setup lang="ts">
import {fetchPageSpectacle} from "~/utlis/apiCmsFetch";
import type {ApiCmsPageSpectacle} from "~/utlis/ApiCmsTypes";
import {type ApiTicketInfomaniak_event, apiTicketInfomaniak_fetchEvents} from "~/utlis/apiTicketInfomaniak";
import {useFalkIsActive} from "~/composables/cmsData";
import {getYoutubeVideoIDFromUrl} from "~/utlis/videoHelper";
import {convertMinutesToHoursAndMinutes} from "~/utlis/minuteToHHhMMString";

const pageData: Ref<ApiCmsPageSpectacle | null> = ref(null)
const ticketInfo: Ref<ApiTicketInfomaniak_event[] | null> = ref(null)

const showDetails = ref(false)

const color = '#ff6c2f'
const textColor = 'white'

const firstAndLAstDate = computed(() => {
    if(!ticketInfo.value) return null

    if(ticketInfo.value.length < 1) return null

    return `${new Date(ticketInfo.value[0].date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
    })} - ${new Date(ticketInfo.value.at(-1)?.date || ticketInfo.value[0].date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
    })}`
})

const groupedByMonth: ComputedRef<{[month: string]: {text: string, eventID: number}[]} | null> = computed(() => {
    if (ticketInfo.value === null) return null

    return ticketInfo.value.reduce((acc: {[month: string]: {text: string, eventID: number}[]}, eventItem) => {
        const date = new Date(eventItem.date);
        const monthKey = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

        if (!acc[monthKey]) {
            acc[monthKey] = [];
        }

        acc[monthKey].push({
            text: new Date(eventItem.date).toLocaleDateString('fr-FR',{
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
    return `<a href="https://infomaniak.events/shop/UwCaGkGB7O/event/${value.eventID}">${wrappedText}</a>`;
};

onMounted(async () => {


    pageData.value = await fetchPageSpectacle(useRoute().params.slug as string)

    if( !pageData.value) return

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
  background-color: v-bind(color);
  flex-direction: column-reverse;
  flex-wrap: wrap;

  @media (min-width: 1200px) {
    flex-direction: row;
    flex-wrap: nowrap;
  }
}

.v-spectacle-slug__coll {
  flex-shrink: 0;
  width: 100%;

  @media (min-width: 1200px) {
    width: 50%;
  }
}

.v-spectacle-slug__coll__text-content {
  background: white;
  box-sizing: border-box;
  padding: var(--app-gutter-xl) var(--app-gutter-xl) 1.5rem;
  overflow: hidden;
}

.v-spectacle-slug__coll__text-content__title {
  margin-bottom: .5rem;
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

.v-spectacle-slug__coll__content__text__youtube {
  display: block;
  border: none;
  overflow: hidden;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  margin-top: var(--app-gutter-xl);
  margin-bottom: var(--app-gutter-xl);
}

.v-spectacle-slug__coll__content__text__quote {
  > div:first-child {
    color: var(--app-color-orange);
  }

  > div:nth-child(2) {
    text-align: right;
  }

}
:global(.v-spectacle-slug__coll__content__text__quote > div:nth-child(2) em) {
  color: var(--app-color-orange);
}


.v-spectacle-slug__coll__header {
  --top-position: 1.5rem;
  box-sizing: border-box;
  padding-top: var(--top-position);
  background-color: white;
  position: sticky;
  top: calc(var(--app-header-height) - var(--top-position) );
}

.v-spectacle-slug__coll__header__content {
  box-sizing: border-box;
  background-color: v-bind(color);
  color: v-bind(textColor);
  padding: 0 var(--app-gutter-xl);
  display: flex;
  justify-content: space-between;
}

:global( .v-spectacle-slug__coll__text-content__peoples > *) {
  @extend .app-font-small;
}

:global( .v-spectacle-slug__coll__text-content__details > *) {
  @extend .app-font-small;
}

.v-spectacle-slug__img {
  display: block;
  width: 100%;
  user-select: none;
  pointer-events: none;
  position: sticky;
  top: 0;
}

.v-spectacle-slug__toggle-details {
  display: flex;
  justify-content: center;
}

.v-spectacle-slug__toggle-details__button {
  background: white;
  color: black;
  border: solid 2px;
  padding: .5rem 1.5rem;
  border-radius: .5rem;
  text-align: center;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--app-gutter);
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
    svg {
      fill: var(--app-color-orange);
      transform: rotate(15deg) translate(25%, -10%);
    }
  }
}

:global(.v-spectacle-slug__dates__item__days__day span) {
  color: v-bind(color);
  //font-variation-settings: "slnt" 0, "wght" 800;
}

.v-spectacle-slug__time-info {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-top: solid 2px;
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

.v-spectacle-slug__ticket {
  position: sticky;
  bottom: var(--v-audio-player-header-height);
  top: var(--app-header-height);
  left: 0;
  text-align: center;
  background-color: v-bind(color);
  color: v-bind(textColor);
  margin: 0;

  a {
    display: block;
    text-decoration: none;
  }
}
</style>

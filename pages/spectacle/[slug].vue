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

              <template v-for="content of pageData?.pageContent.content.htmlcontent_falk">
                <div v-if="content.type === 'text'"
                     v-html="content.content.text"
                ></div>

                <img v-if="content.type === 'image'"
                     v-for="image of content.images"
                     :src="image.resize.large"
                     :alt="image.alt || 'pas de texte alt'"
                >
              </template>

            </template>

            <template v-else>
              <!--FALK est activé mais PAS de FALK, on prend le texte normal et on ajoute une phrase-->

              <h4 class="app-font-align-center"
                  style="color: var(--app-color-orange)"
              >(La version FALK n'est pas encore mise en ligne)</h4>

              <template v-for="content of pageData?.pageContent.content.htmlcontent">
                <div v-if="content.type === 'text'"
                     v-html="content.content.text"
                ></div>

                <img v-if="content.type === 'image'"
                     v-for="image of content.images"
                     :src="image.resize.large"
                     :alt="image.alt || 'pas de texte alt'"
                >

              </template>
            </template>
          </template>

          <template v-else>
            <!--texte original-->
            <template v-for="content of pageData?.pageContent.content.htmlcontent">
              <div v-if="content.type === 'text'"
                   v-html="content.content.text"
              ></div>

              <img v-if="content.type === 'image'"
                   v-for="image of content.images"
                   :src="image.resize.large"
                   :alt="image.alt || 'pas de texte alt'"
              >

            </template>
          </template>

          <div class="v-spectacle-slug__coll__text-content__peoples app-font-align-center"
               v-html="pageData?.pageContent.content.peoples.replaceAll(':', '<br>')"
          />

          <div class="v-spectacle-slug__coll__text-content__details app-font-align-center"
               v-html="pageData?.pageContent.content.details.replaceAll(':', '<br>')"
          />

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
                       v-html="dayDate"
                  />
                </div>
              </div>
            </div>
            <div class="v-spectacle-slug__duration"
                 v-if="ticketInfo[0].duration_in_minutes"
            >
              Durée {{ticketInfo[0].duration_in_minutes}} minutes
            </div>
          </template>
<!--          <template v-else>-->
<!--            <div>Récupération des informaitons de la billeterie…</div>-->
<!--          </template>-->


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
          <a style="display: block; text-decoration: none"
             v-if="ticketInfo"
             :href="ticketInfo[0].portal_link_preview"
             target="_blank"
          >prendre un billet</a>
          <div style="display: block"
             v-else
          >billeterie à venir</div>
        </div>
      </div>
    </section>
</template>





<script setup lang="ts">
import {fetchPageSpectacle} from "~/utlis/apiCmsFetch";
import type {ApiCmsPageSpectacle} from "~/utlis/ApiCmsTypes";
import {type ApiTicketInfomaniak_event, apiTicketInfomaniak_fetchEvents} from "~/utlis/apiTicketInfomaniak";
import {useFalkIsActive} from "~/composables/cmsData";

const pageData: Ref<ApiCmsPageSpectacle | null> = ref(null)
const ticketInfo: Ref<ApiTicketInfomaniak_event[] | null> = ref(null)

const color = '#ff6c2f'
const textColor = 'white'

const firstAndLAstDate = computed(() => {
    if(!ticketInfo.value) return null

    return `${new Date(ticketInfo.value[0].date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
    })} - ${new Date(ticketInfo.value.at(-1)?.date || ticketInfo.value[0].date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
    })}`
})

const groupedByMonth: ComputedRef<{[month: string]: string[]} | null> = computed(() => {
    if (ticketInfo.value === null) return null

    return ticketInfo.value.reduce((acc: {[month: string]: string[]}, eventItem) => {
        const date = new Date(eventItem.date);
        const monthKey = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

        if (!acc[monthKey]) {
            acc[monthKey] = [];
        }

        acc[monthKey].push(new Date(eventItem.date).toLocaleDateString('fr-FR',{
            weekday: 'long',
            day: 'numeric',
        }));
        return acc;
    }, {})
});

const wrapNumbersInSpan = (text: string): string => {
    return text.replace(/\b(\d+)\b/g, "<span>$1</span>");
};

onMounted(async () => {


    pageData.value = await fetchPageSpectacle(useRoute().params.slug as string)

    if( !pageData.value) return
    ticketInfo.value = await apiTicketInfomaniak_fetchEvents({
        search: pageData.value.pageContent.content.eventtitle[0]
    })
    console.log( ticketInfo.value )
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
  width: 100%;
}

.v-spectacle-slug__coll__text-content {
  background: white;
  box-sizing: border-box;
  padding: var(--app-gutter-xl) var(--app-gutter-xl) 1.5rem;
}

.v-spectacle-slug__coll__text-content__title {
  margin-bottom: .5rem;
}
.v-spectacle-slug__coll__text-content__company {
  text-align: center;
  margin-bottom: 1rem;
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
}

.v-spectacle-slug__dates__item__mouth {
  width: 5rem;
  flex-shrink: 0;
}

.v-spectacle-slug__dates__item__days {
  display: flex;
  gap: var(--app-gutter) 1rem;
  flex-wrap: wrap;
}

:global(.v-spectacle-slug__dates__item__days__day span) {
  color: v-bind(color);
  //font-variation-settings: "slnt" 0, "wght" 800;
}

.v-spectacle-slug__duration {
  border-top: solid 2px;
  text-align: right;
  padding-top: var(--app-gutter);
  padding-bottom: var(--app-gutter);
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
}
</style>

<template>
    <section class="v-app-spectacle-slug-info"
    >
      <div class="v-app-spectacle-slug-info__coll__header">
        <div class="v-app-spectacle-slug-info__coll__header__season-name">
          {{
            useAppSeasons().value?.value.find(item => item.slug === page_data?.pageContent.content.season)?.content.title
          }}
        </div>
        <div class="v-app-spectacle-slug-info__coll__header__ticket">

          <a class="app-button-grey app-font-small"
             v-if="page_data?.pageContent.content.externalticketservicelink"
             :href="page_data.pageContent.content.externalticketservicelink"
             target="_blank"
          >
            <template v-if="page_data.pageContent.content.externalticketservicename">
              {{ page_data.pageContent.content.externalticketservicename }}
            </template>
            <template v-else>
              Prendre un billet
            </template>
          </a>
          <a class="app-button-grey app-font-small"
             href="#dates-details"
             v-if="page_data && page_data.pageContent.content.list_of_dates.length !== 0"
          >
            <template v-if="page_data.pageContent.content.list_of_dates.length > 1">
              Dates & horaires
            </template>
            <template v-else>
              Date & horaire
            </template>
            </a>
        </div>
      </div>

      <div class="v-app-spectacle-slug-info__coll__text-content__date_and_place">
        <div v-if="first_and_last_date"
             style="text-transform: capitalize;"
        >{{ first_and_last_date }}</div>
        <div>{{ place_name }}</div>
        <div class="v-app-spectacle-slug-info__item__info app-font-small"
             v-if="event_info"
        >
          <div class="v-app-spectacle-slug-info__item__info__text">{{ event_info }}</div>
        </div>
      </div>
      <h1 class="v-app-spectacle-slug-info__coll__text-content__title app-font-align-center app-font-h1">
        {{ page_data?.pageContent.content.title }}</h1>
      <h2 class="v-app-spectacle-slug-info__coll__text-content__subtitle app-font-align-center app-font-small app-font-mono--force"
          v-if="page_data?.pageContent.content.subtitle"
      >{{page_data?.pageContent.content.subtitle}}</h2>
      <div class="v-app-spectacle-slug-info__coll__text-content__is-cover app-font-align-center app-font-small"
           v-if="page_data?.pageContent.content.iscover === 'true'"
      >
        Reprise
      </div>

      <div class="v-app-spectacle-slug-info__coll__text-content__company app-font-mono">
        <h5 v-for="companyPeople of page_data?.pageContent.content.company">
          <template v-if="companyPeople.authors_link">
            <a target="_blank" :href="companyPeople.authors_link">
              {{ companyPeople.authors_name }}
            </a>
          </template>
          <template v-else>
              {{ companyPeople.authors_name }}
          </template>
        </h5>
      </div>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import {useAppSeasons} from "~/composables/cmsData";
import type {ApiCmsPageSpectacle} from "~/utlis/ApiCmsTypes";

const props = defineProps<{
    page_data: ApiCmsPageSpectacle | null
    first_and_last_date: null | string
    place_name: null | string
    event_info?: string
}>()
</script>





<style lang="scss" scoped >
.v-app-spectacle-slug-info {
  width: 100%;
}

.v-app-spectacle-slug-info__coll__header {
  display: flex;
  background: transparent;
  justify-content: space-between;
}

.v-app-spectacle-slug-info__item__info {
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0;
  padding: .25rem var(--app-gutter-xl);
  margin-left: calc( -1 * var(--app-gutter-xl) );

  .nuxt-watch-falk-is-active & {
    background: white;
    border-top: solid 1px black;
    border-bottom: solid 1px black;
  }
}

.v-app-spectacle-slug-info__item__info__text {
  background-color: var(--app-color-primary);
  padding: .15rem .5rem;
  border-radius: 1rem;
  font-variation-settings: "slnt" 0, "wght" 600;
  margin-top: -.75em;
}

.v-app-spectacle-slug-info__coll__header__ticket {
  display: flex;
  flex-direction: column;
  gap: var(--app-gutter);
  align-items: flex-end;

  a {
    display: block;
    text-decoration: none;
    background: white;
  }

}

.v-app-spectacle-slug-info__coll__text-content__title {
  margin-bottom: .5rem;
  margin-top: 0;
}

.v-app-spectacle-slug-info__coll__text-content__subtitle {
  margin-bottom: .5rem;
  font-style: italic;
}

.v-app-spectacle-slug-info__coll__text-content__date_and_place {
  box-sizing: border-box;
  padding: 1rem 0 .5rem;
  text-align: center;
}

.v-app-spectacle-slug-info__coll__text-content__is-cover {
  margin-bottom: .5rem;
  color: var(--app-color-secondary);
}

.v-app-spectacle-slug-info__coll__text-content__company {
  text-align: center;

  > * {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: normal;
    font-variation-settings: "slnt" 0, "wght" 400;
  }
}
</style>

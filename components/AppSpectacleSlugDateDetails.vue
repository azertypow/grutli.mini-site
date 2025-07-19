<template>
    <section class="v-app-spectacle-slug-date-details">
      <div id="dates-details"></div>
      <div v-if="date_by_mounth"
           style="margin-bottom: 1rem"
      >
        <div v-for="dateGroup of date_by_mounth.toReversed()"
             class="v-app-spectacle-slug-date-details__coll__text-content__details__dates"
        >
          <div class="v-app-spectacle-slug-date-details__coll__text-content__details__dates__mouth">{{ dateGroup.mouth }}</div>
          <div class="v-app-spectacle-slug-date-details__coll__text-content__details__dates__days">
                <component
                        :is="date.url ? 'a' : 'div'"
                        target="_blank"
                        v-for="date of dateGroup.dates"
                        :href="date.url || undefined"
                        class="v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item"
                >
                  <span class="v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item__day" >{{ date.day }}</span>
                  <span class="v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item__time" >{{ date.time }}</span>
                  <span class="v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item__relax"
                        v-if="date.isRelax === 'true'"
                  >
                    relax
                  </span>
                </component>
          </div>
        </div>
      </div>
      <template v-for="content of content_html_details">
        <div class="app-remove-first-last-child-margin v-app-spectacle-slug-date-details__detailsHtml">
          <div v-if="content.type === 'text'"
               v-html="content.content.text"
               class="app-remove-first-last-child-margin"
          ></div>

          <img v-if="content.type === 'image'"
               v-for="image of content.images"
               :src="image.resize.large"
               :alt="image.alt || 'pas de texte alt'"
          >
        </div>
      </template>

    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {ApiHTMLContent_Blocks} from "~/utlis/ApiCmsTypes";

const props = defineProps<{
    date_by_mounth: null | { mouth: string; dates: {day: string, time: string, url?: string, isRelax?: 'true' | 'false'}[] }[]
    content_html_details?: ApiHTMLContent_Blocks[]
}>()
</script>





<style lang="scss" scoped >
.v-app-spectacle-slug-date-details {
  display: block;
  width: 100%;
}

.v-app-spectacle-slug-date-details__coll__text-content__details__dates {
  display: flex;
  gap: 1rem;

  & + & {
    margin-top: 1rem;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    gap: .5rem;
  }
}

.v-app-spectacle-slug-date-details__coll__text-content__details__dates__mouth {
  width: 5.5em;
  flex-shrink: 0;
  text-transform: capitalize;
  font-family: 'ABCOracleWebSite triple', monospace;
  font-size: 1.1em;
}

.v-app-spectacle-slug-date-details__coll__text-content__details__dates__days {
  display: flex;
  flex-wrap: wrap;
  gap: .25rem 2rem;

  > span {
    flex-shrink: 0;
    width: 10em;
  }
}

.v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item {
  display: block;
}
a.v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item {
  border-bottom: 2px solid currentColor;
  position: relative;
}

.v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item__day {
  display: inline-block;
  width: 3em;
  font-family: 'ABCOracleWebSite triple', monospace;
  font-size: 1.1em;
}

.v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item__time {
  display: inline-block;
  width: 3.25em;
  text-align: right;
  font-family: 'ABCOracleWebSite triple', monospace;
  font-size: 1.1em;
}

.v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item__relax {
  position: absolute;
  padding: .15em .5em .25em;
  border-radius: 1em;
  font-size: .5rem;
  transform: translate(-15%, 0%) rotate(10deg);
  line-height: 1em;

  background: black;
  color: white;
}
</style>

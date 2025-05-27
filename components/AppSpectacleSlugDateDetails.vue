<template>
    <section class="v-app-spectacle-slug-date-details">
      <div id="dates-details"></div>
      <div v-if="date_by_mounth"
           style="margin-bottom: 1rem"
      >
        <div v-for="dateGroup of date_by_mounth"
             class="v-app-spectacle-slug-date-details__coll__text-content__details__dates"
        >
          <div class="v-app-spectacle-slug-date-details__coll__text-content__details__dates__mouth">{{ dateGroup.mouth }}</div>
          <div class="v-app-spectacle-slug-date-details__coll__text-content__details__dates__days">
                <span v-for="date of dateGroup.dates"
                      class="v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item"
                >
                  <span class="v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item__day" >{{ date.day }}</span>
                  <span class="v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item__time" >{{ date.time }}</span>
                </span>
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
    date_by_mounth: null | { mouth: string; dates: {day: string, time: string}[] }[]
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
}

.v-app-spectacle-slug-date-details__coll__text-content__details__dates__mouth {
  width: 5.5em;
  flex-shrink: 0;
}

.v-app-spectacle-slug-date-details__coll__text-content__details__dates__days {
  display: flex;
  flex-wrap: wrap;
  gap: 0 2rem;

  > span {
    flex-shrink: 0;
    width: 10em;
  }
}

.v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item__day {
  display: inline-block;
  width: 6.5em;
}

.v-app-spectacle-slug-date-details__coll__text-content__details__dates__days__item__time {

}
</style>

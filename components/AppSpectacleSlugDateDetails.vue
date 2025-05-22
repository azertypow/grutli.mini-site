<template>
    <section class="v-app-spectacle-slug-date-details">
      <div id="dates-details"></div>
      <div v-if="date_by_mounth"
           style="margin-bottom: 1rem"
      >
        <div v-for="dateGroup of date_by_mounth"
             class="v-spectacle-slug__coll__text-content__details__dates"
        >
          <div class="v-spectacle-slug__coll__text-content__details__dates__mouth">{{ dateGroup.mouth }}</div>
          <div class="v-spectacle-slug__coll__text-content__details__dates__days">
                <span v-for="(date, index) of dateGroup.dates">
                  {{ date }}<template v-if="index < dateGroup.dates.length - 1">, </template>
                </span>
          </div>
        </div>
      </div>
      <template v-for="content of content_html_details">
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

    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {ApiHTMLContent_Blocks} from "~/utlis/ApiCmsTypes";

const props = defineProps<{
    date_by_mounth: null | { mouth: string; dates: string[] }[]
    content_html_details?: ApiHTMLContent_Blocks[]
}>()
</script>





<style lang="scss" scoped >
.v-app-spectacle-slug-date-details {
  display: block;
  width: 100%;
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
</style>

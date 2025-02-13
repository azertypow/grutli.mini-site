<template>
  <nuxt-link class="v-app-event-item"
             :to="'/spectacle/' + event.pageContent.slug"
  >
    <h4 class="v-app-event-item__item__title">{{ event.pageContent.content.title }}</h4>
    <div class="v-app-event-item__item__date">
        {{dateString}}
    </div>
  </nuxt-link>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {Spectacle} from "~/utlis/ApiCmsTypes";
import {formatDateStartAndDateEndToString} from "../utlis/formatDate";

const props = defineProps<{
    event: Spectacle
}>()


const dateString: ComputedRef<string> = computed(() => {

    const currentDate = new Date()
    currentDate.setHours(0,0,0,0)
    const dateEnd = new Date(props.event.pageContent.content.dateend.replace(" ", "T"))
    dateEnd.setHours(0,0,0,0)

    if (currentDate > dateEnd) return 'passé'

    return formatDateStartAndDateEndToString(props.event.pageContent.content.datestart, props.event.pageContent.content.dateend)
})
</script>





<style lang="scss" scoped >

.v-app-event-item {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: solid 1px currentColor;
  padding: 1rem 0;

  @media (max-width: 1100px) {
    flex-direction: column;
  }

  .nuxt-watch-falk-is-active & {
    color: black;
  }
}

.v-app-event-item__item__title {
  margin: 0;
  text-transform: none;
}
</style>

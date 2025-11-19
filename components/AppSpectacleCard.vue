<template>
  <nuxt-link class="v-app-spectacle-card"
             :to="to"
             :class="{
                 'flex-center': !peoples && !eventTitle && !dates && !event_info
             }"
  >
    <div class="v-app-spectacle-card__item__date app-font-small app-font-mono"
         v-if="dateFromTicketService"
    >
        {{dateFromTicketService}}
    </div>
    <div>
      <div class="v-app-spectacle-card__item__info"
           v-if="event_info"
      >
        <div class="v-app-spectacle-card__item__info__wrap app-font-small app-font-mono">
          {{event_info}}
        </div>
      </div>
      <h2 class="v-app-spectacle-card__item__title app-font-without-max-width app-font-align-center">{{ title }}</h2>
      <h3 class="v-app-spectacle-card__item__subtitle app-font-align-center"
          v-if="subtitle"
      >{{subtitle}}</h3>
    </div>
    <div class="v-app-spectacle-card__item__peoples app-font-base app-font-small app-font-align-center"
         v-if="peoples"
    >
      <div v-for="people of peoples">
        {{ people.authors_name }}
      </div>
    </div>
  </nuxt-link>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {ApiCmsCompany} from "~/utlis/ApiCmsTypes";
import {formatDateStartAndDateEndToString, normalizeDate} from "~/utlis/formatDate";

interface Props {
    to: string
    title: string
    subtitle?: string
    peoples?: ApiCmsCompany[]
    eventTitle?: string[]
    dates?: {start: string, end: string}
    event_info?: string,
}
const props = withDefaults(defineProps<Props>(), {
})

const dateFromTicketService = computed(() => {

    if( !props.dates ) return null

    const currentDate = new Date()
    currentDate.setHours(0,0,0,0)
    const dateEnd = new Date(normalizeDate( props.dates.end ))
    dateEnd.setHours(0,0,0,0)

    // console.log(props.eventTitle)
    // console.log(currentDate.toISOString())
    // console.log(dateEnd.toISOString())

    if (currentDate > dateEnd) return 'passé'

    return formatDateStartAndDateEndToString(props.dates.start, props.dates.end)
})
</script>





<style lang="scss" scoped >
.v-app-spectacle-card {
  color: black;
  display: flex;
  align-items: center;
  aspect-ratio: initial;
  background: var(--app-bg-glow-color);
  backdrop-filter: var(--app-bg-glow-filter);
  background-size: 80rem auto;
  box-sizing: border-box;
  padding: var(--app-gutter);
  border-radius: 1rem;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  position: relative;
  height: 100%;
  text-decoration: none;
  overflow: hidden;
  min-height: 8rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  &.flex-center {
    justify-content: center;
  }

  > * {
    width: 100%;
  }

  .nuxt-watch-falk-is-active & {
    background: white;
    color: black;
    border: solid 1px;
  }

  @media (max-width: 1100px) {
    height: auto;
  }
}

.v-app-spectacle-card__item__date {
  width: calc(100% - var(--app-gutter-xl));
  text-align: center;
  margin-bottom: 1rem;
}

.v-app-spectacle-card__item__peoples {
  margin-top: 1.5rem;
  display: block;
  margin-bottom: 0;
}

.v-app-spectacle-card__item__title {
  margin: 0;
}

.v-app-spectacle-card__item__subtitle {
  margin: 0;
 }

.v-app-spectacle-card__item__info {
  text-align: center;
  margin-bottom: 0;
  position: relative;
  display: flex;
  justify-content: center;
  transform: translateY(-50%);
}

.v-app-spectacle-card__item__info__wrap {
  margin: 0;
  background: var(--app-color-primary);
  padding: .15rem .5rem;
  border-radius: 1rem;
  font-variation-settings: "slnt" 0, "wght" 600;

  .nuxt-watch-falk-is-active & {
    background: white;
    border: solid 1px;
  }
}
</style>

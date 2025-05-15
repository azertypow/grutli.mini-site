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
    <h2 class="v-app-spectacle-card__item__title app-font-h5 app-font-align-center">{{ title }}</h2>
    <div class="v-app-spectacle-card__item__info app-font-small"
         v-if="event_info"
    >
      <div class="v-app-spectacle-card__item__info__wrap">
        <div class="v-app-spectacle-card__item__info__wrap__text">{{event_info}}</div>
        <div class="v-app-spectacle-card__item__info__wrap__text">{{event_info}}</div>
        <div class="v-app-spectacle-card__item__info__wrap__text">{{event_info}}</div>
        <div class="v-app-spectacle-card__item__info__wrap__text">{{event_info}}</div>
      </div>
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
import {formatDateStartAndDateEndToString} from "~/utlis/formatDate";

interface Props {
    to: string
    title: string
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
    const dateEnd = new Date(props.dates.end.replace(" ", "T"))
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
  background: var(--app-color-grey);
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
  font-size: 1rem;
  line-height: 1.2;
}

.v-app-spectacle-card__item__info {
  text-align: center;
  font-style: italic;
  margin-bottom: 0;
  background: var(--app-color-purple);
  overflow: hidden;
  position: relative;
  height: 1rem;
  padding-left: var(--app-gutter);
  padding-right: var(--app-gutter);
  transform: translate3d(0, 50%, 1rem);
}

.v-app-spectacle-card__item__info__wrap {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  animation: app-app__news__wrap--animation--variante ease-in-out 15s infinite alternate-reverse;
  width: auto;
  position: absolute;
  top: 0;
  left: 0;
}

.v-app-spectacle-card__item__info__wrap__text {
  white-space: nowrap;
  padding-right: 2rem;
  line-height: 1rem;
}

</style>

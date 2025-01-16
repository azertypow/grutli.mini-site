<template>
  <nuxt-link class="v-app-spectacle-card"
             :to="to"
  >
    <h2 class="v-app-spectacle-card__item__title app-font-h4 app-font-align-center">{{ title }}</h2>
    <div class="v-app-spectacle-card__item__date app-font-small">
      <template v-if="getDateFromTicketService">
        <template v-if="dateFromTicketService">{{dateFromTicketService}}</template>
        <template v-else>chargement…</template>
      </template>
    </div>
    <div class="v-app-spectacle-card__item__peoples app-font-align-center"
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
import {apiTicketInfomaniak_fetchEvents} from "~/utlis/apiTicketInfomaniak";
import type {ApiCmsCompany} from "~/utlis/ApiCmsTypes";

interface Props {
    to: string
    title: string
    peoples?: ApiCmsCompany[]
    date?:string
    getDateFromTicketService?: boolean
    eventTitle?: string[]
}
const props = withDefaults(defineProps<Props>(), {
    getDateFromTicketService: false
})

const dateFromTicketService: Ref<string | null> = ref(null)

onMounted(() => {
    setDateToShow().then(value => {
        dateFromTicketService.value = value
    })
})

async function setDateToShow() {
    if(! props.getDateFromTicketService) return null
    if(! props.eventTitle) {
        console.error('props.eventTitle is necessary if you set props.getDateFromTicketService to TRUE')
        return null
    }

    if(props.getDateFromTicketService && props.date) {
        console.error('if you give "date" prop value and set "getDateFromTicketService" prop value tu "true", "getDateFromTicketService" erase "date" prop value. Don_t use "getDateFromTicketService" to true with a value in "date" property.')
    }

    const eventsFromTicketService = await apiTicketInfomaniak_fetchEvents({
        search: props.eventTitle[0]
    })

    const firstDate = new Date(eventsFromTicketService[0].date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
    })

    const lastDateString = eventsFromTicketService.at(-1)?.date

    const lastDate = lastDateString ? new Date(lastDateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
        })
        : ''

    return `${firstDate} - ${lastDate}`

}
</script>





<style lang="scss" scoped >
.v-app-spectacle-card {
  display: flex;
  align-items: center;
  border: solid 1px white;
  aspect-ratio: initial;
  background-image: url('/s.jpg');
  background-size: 80rem auto;
  box-sizing: border-box;
  padding: var(--app-gutter);
  border-radius: 1rem;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  position: relative;
  height: calc( (100vh - var(--app-header-height) - var(--v-audio-player-header-height)) / 2 - var(--app-gutter-xl) * 2);
  text-decoration: none;

  > * {
    width: 100%;
  }

  .nuxt-watch-falk-is-active & {
    background: white;
    color: black;
    border: solid 1px;
  }

  @media (max-width: 900px) {
    height: auto;
    padding: 0.5rem;
  }
}

.v-app-spectacle-card__item__date {
  position: absolute;
  top: var(--app-gutter-xl);
  left: var(--app-gutter-xl);
  width: calc(100% - var(--app-gutter-xl));
}

.v-app-spectacle-card__item__peoples {
  display: block;
}

.v-app-spectacle-card__item__title {
  text-transform: none;
}

</style>

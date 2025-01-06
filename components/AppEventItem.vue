<template>
  <nuxt-link class="v-app-event-item"
             :to="'/spectacle/' + event.pageContent.slug"
  >
    <h4 class="v-app-event-item__item__title">{{ event.pageContent.content.title }}</h4>
    <div class="v-app-event-item__item__date">
      <template v-if="dateFromTicketService">
        {{ dateFromTicketService }}
      </template>
      <template v-else>
        billetterie à venir
      </template>
    </div>
<!--    <div class="v-app-event-item__item__peoples">-->
<!--      <div v-for="people of event.pageContent.content.company">-->
<!--        {{ people }}-->
<!--      </div>-->
<!--    </div>-->
  </nuxt-link>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {Spectacle} from "~/utlis/ApiCmsTypes";
import {apiTicketInfomaniak_fetchEvents} from "~/utlis/apiTicketInfomaniak";

const props = defineProps<{
    event: Spectacle
}>()



const dateFromTicketService: Ref<string | null> = ref(null)

onMounted(() => {
    setDateToShow().then(value => {
        dateFromTicketService.value = value
    })
})

async function setDateToShow() {
    const eventsFromTicketService = await apiTicketInfomaniak_fetchEvents({
        search: props.event.pageContent.content.eventtitle[0]
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

.v-app-event-item {
  text-decoration: none;
  color: white;
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
}
</style>

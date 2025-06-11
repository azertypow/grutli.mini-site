<template>
  <nuxt-link class="v-app-event-item"
             :to="app_event_data.slug"
  >
    <h4 class="v-app-event-item__item__title">{{ app_event_data.title }}</h4>
    <div class="v-app-event-item__item__date">
        {{dateString}}
    </div>
  </nuxt-link>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import {formatDateStartAndDateEndToString} from "~/utlis/formatDate";

export interface IAppEventPropsData {
    dateend: string,
    datestart: string,
    slug: string,
    title: string,
}

const props = defineProps<{
    app_event_data: IAppEventPropsData
}>()


const dateString: ComputedRef<string> = computed(() => {

    const currentDate = new Date()
    currentDate.setHours(0,0,0,0)
    const dateEnd = new Date(props.app_event_data.dateend.replace(" ", "T"))
    dateEnd.setHours(0,0,0,0)

    if (currentDate > dateEnd) return 'passé'

    return formatDateStartAndDateEndToString(props.app_event_data.datestart, props.app_event_data.dateend)
})
</script>





<style lang="scss" scoped >

.v-app-event-item {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-radius: 2rem;
  background: var(--app-bg-glow-color);
  backdrop-filter: var(--app-bg-glow-filter);
  transition: transform .25s ease-in-out;

  &:hover {
    transform: scale(1.005);
  }

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

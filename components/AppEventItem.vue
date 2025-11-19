<template>
  <nuxt-link class="v-app-event-item"
             :to="app_event_data.slug"
  >
    <div class="v-app-event-item__item__title-container">
      <h2 class="v-app-event-item__item__title-container__title">{{ app_event_data.title }}</h2>
      <h3 class="v-app-event-item__item__title-container__subtitle"
          v-if="app_event_data.subtitle"
      >{{ app_event_data.subtitle }}</h3>
    </div>
    <div class="v-app-event-item__item__date">
        {{dateString}}
    </div>
  </nuxt-link>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import {formatDateStartAndDateEndToString, normalizeDate} from "~/utlis/formatDate";

export interface IAppEventPropsData {
    dateend: string,
    datestart: string,
    slug: string,
    title: string,
    subtitle: string | null,
}

const props = defineProps<{
    app_event_data: IAppEventPropsData
}>()


const dateString: ComputedRef<string> = computed(() => {

    console.log( 'props.app_event_data.dateend: ', props.app_event_data.dateend )

    const currentDate = new Date()
    currentDate.setHours(0,0,0,0)
    const dateEnd = new Date(normalizeDate( props.app_event_data.dateend ))
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

  .nuxt-watch-falk-is-active & {
    border: solid 1px currentColor;
  }
}

.v-app-event-item__item__title-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1100px) {
    align-items: center;
  }
}

.v-app-event-item__item__title-container__title {
  margin: 0;
  text-transform: none;
  text-align: left;

  @media (max-width: 1100px) {
    text-align: center;
  }
}
.v-app-event-item__item__title-container__subtitle {
  margin: 0;
  text-align: left;

  @media (max-width: 1100px) {
    text-align: center;
  }
}
</style>

<template>
    <section class="v-programmation"
    >
      <div class="v-programmation__list">
        <template v-if="siteInfo === null">
          chargement…
        </template>
        <template v-else>
          <template
                  v-for="event of elementsToShowNotEnded"
          >
            <div class="v-programmation__item">
              <AppEventItem
                      :app_event_data="event"
              />
            </div>
          </template>

          <h2>Évènements passés</h2>

          <template
                  v-for="event of elementPast"
          >
            <div class="v-programmation__item">
              <AppEventItem
                      :app_event_data="event"
              />
            </div>
          </template>

        </template>
      </div>
    </section>
</template>





<script setup lang="ts">

import type {ApiSeasons_value, SiteInfo, SiteInfoPageSimple, Spectacle} from "~/utlis/ApiCmsTypes";
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks
} from "~/composables/cmsData";
import type {IAppEventPropsData} from "~/components/AppEventItem.vue";

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

useHead({
    title: 'Programmation'
})

const siteInfo: Ref<SiteInfo | null> = useSiteInfo()




const elementPast: ComputedRef<IAppEventPropsData[]> = computed(() => {
    const pageSimpleToShowInCalendarAndPast: IAppEventPropsData[] = siteInfo.value?.["page-simple"].filter(value => {

        if (!value.pageContent.content.showincalendar) return false
        if (value.pageContent.content.showincalendar !== 'true') return false
        if (!value.pageContent.content.datestart) return false
        if (!value.pageContent.content.dateend) return false

        const eventDateEnd = new Date(value.pageContent.content.dateend)
        const currentDate = new Date()

        eventDateEnd.setHours(0, 0, 0, 0)
        currentDate.setHours(0, 0, 0, 0)

        return currentDate > eventDateEnd

    }).map(pageSimple => {
        return {
            slug: pageSimple.pageContent.slug,
            dateend: pageSimple.pageContent.content.dateend!,
            datestart: pageSimple.pageContent.content.datestart!,
            title: pageSimple.pageContent.content.title,
        } satisfies IAppEventPropsData
    }) || []



    const spectaclesPast = curentSeasonSpectacle.value.filter(event => {
        const eventDateEnd = new Date(event.pageContent.content.dateend)
        const currentDate = new Date()

        eventDateEnd.setHours(0, 0, 0, 0)
        currentDate.setHours(0, 0, 0, 0)

        return currentDate > eventDateEnd
    }).map(item => {
        return {
            slug: '/spectacle/' + item.pageContent.slug,
            title: item.pageContent.content.title,
            datestart: item.pageContent.content.datestart,
            dateend: item.pageContent.content.dateend,
        } satisfies IAppEventPropsData
    }) || []




    return [...pageSimpleToShowInCalendarAndPast, ...spectaclesPast]
})






const elementsToShowNotEnded: ComputedRef<IAppEventPropsData[]> = computed(() => {


    const pageSimpleToShowInCalendarNotPast: IAppEventPropsData[] = siteInfo.value?.["page-simple"].filter(value => {

        if (!value.pageContent.content.showincalendar) return false
        if (value.pageContent.content.showincalendar !== 'true') return false
        if (!value.pageContent.content.datestart) return false
        if (!value.pageContent.content.dateend) return false

        const eventDateEnd = new Date(value.pageContent.content.dateend)
        const currentDate = new Date()

        eventDateEnd.setHours(0, 0, 0, 0)
        currentDate.setHours(0, 0, 0, 0)

        return eventDateEnd >= currentDate

    }).map(pageSimple => {
        return {
            slug: pageSimple.pageContent.slug,
            dateend: pageSimple.pageContent.content.dateend!,
            datestart: pageSimple.pageContent.content.datestart!,
            title: pageSimple.pageContent.content.title,
        } satisfies IAppEventPropsData
    }) || []


    const spectaclesNotEnded: IAppEventPropsData[] = curentSeasonSpectacle.value.filter(event => {
        const eventDateEnd = new Date(event.pageContent.content.dateend)
        const currentDate = new Date()

        eventDateEnd.setHours(0, 0, 0, 0)
        currentDate.setHours(0, 0, 0, 0)

        return eventDateEnd >= currentDate
    }).map(item => {
        return {
            slug: '/spectacle/' + item.pageContent.slug,
            title: item.pageContent.content.title,
            datestart: item.pageContent.content.datestart,
            dateend: item.pageContent.content.dateend,
        } satisfies IAppEventPropsData
    }) || []

    return [...pageSimpleToShowInCalendarNotPast, ...spectaclesNotEnded].sort((a, b) => {
        const dateStart_a = new Date(a.datestart)
        const dateStart_b = new Date(b.datestart)

        return dateStart_a.getTime() - dateStart_b.getTime()
    })
})

const activeSeason: Ref<ApiSeasons_value[] | null> = useAppSeasons_active()

const curentSeasonSpectacle: ComputedRef<Spectacle[]> = computed(() => {
    const siteInfo_value      = siteInfo.value
    const activeSeason_value  = activeSeason.value

    if (!siteInfo_value)      return []
    if (!activeSeason_value)  return []

    const activeSaisonsSlug = activeSeason_value.map(season => season.slug)

    console.log( activeSaisonsSlug )

    return siteInfo_value.spectacles.filter( (spectacle: Spectacle) => {
        return activeSaisonsSlug.includes( spectacle.pageContent.content.season )
    })
})

</script>





<style lang="scss" scoped >
.v-programmation__list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 var(--app-gutter) 25vh;
  justify-content: center;
}

.v-programmation__item {
  width: 100%;
  margin-top: 1rem;
}
</style>

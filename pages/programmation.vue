<template>
    <section class="v-programmation"
    >
      <div class="v-programmation__list">
        <template v-if="siteInfo === null">
          chargement…
        </template>
        <template v-else>
          <template
                  v-for="event of spectaclesNotEnded"
          >
            <div class="v-programmation__item">
              <AppEventItem
                      :event="event"
              />
            </div>
          </template>

          <h2>Évènements passés</h2>

          <template
                  v-for="event of spectaclesPast"
          >
            <div class="v-programmation__item">
              <AppEventItem
                      :event="event"
              />
            </div>
          </template>

        </template>
      </div>
    </section>
</template>





<script setup lang="ts">

import type {SiteInfo} from "~/utlis/ApiCmsTypes";
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks
} from "~/composables/cmsData";

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

const siteInfo: Ref<SiteInfo | null> = useSiteInfo()

const spectaclesPast = computed(() =>
    siteInfo.value?.spectacles.filter(event => {
      const eventDateEnd = new Date(event.pageContent.content.dateend)
      const currentDate = new Date()

        return eventDateEnd < currentDate
    }
    )
)

const spectaclesNotEnded = computed(() =>
    siteInfo.value?.spectacles.filter(event => {
            const eventDateEnd = new Date(event.pageContent.content.dateend)
            const currentDate = new Date()

            return eventDateEnd > currentDate
        }
    )
)

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

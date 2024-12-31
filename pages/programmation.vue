<template>
    <section class="v-programmation"
    >
      <div class="v-programmation__list">
        <template v-if="siteInfo === null">
          chargement…
        </template>
        <template v-else
                  v-for="event of siteInfo.spectacles"
        >
          <div class="v-programmation__item">
            <AppEventItem
                    :event="event"
            />
          </div>
        </template>
      </div>
    </section>
</template>





<script setup lang="ts">

import type {SiteInfo} from "~/utlis/ApiCmsTypes";

const siteInfo: Ref<SiteInfo | null> = useSiteInfo()

</script>





<style lang="scss" scoped >
.v-programmation__list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 5rem var(--app-gutter) 25vh;
  justify-content: center;
}

.v-programmation__item {
  width: 100%;
}
</style>

<template>
    <section class="v-erreur">
      <div class="v-erreur__item">
          <h3>Erreur</h3>
          <div>
            <p v-if="!customMsg.msg" >La page que vous cherchez n'existe plus.</p>
            <p v-else >{{customMsg.msg}}</p>
            <nuxt-link href="/">Revenir à l'accueil</nuxt-link>
          </div>
      </div>
    </section>
</template>





<script setup lang="ts">

import type {SiteInfo, SiteInfoPageSimple, Spectacle} from "~/utlis/ApiCmsTypes";
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks
} from "~/composables/cmsData";
import type {IAppEventPropsData} from "~/components/AppEventItem.vue";
import {useUrlSearchParams} from "@vueuse/core";

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

useHead({
    title: 'Oups'
})

const customMsg = useUrlSearchParams()


</script>





<style lang="scss" scoped >
.v-erreur {
  box-sizing: border-box;
  padding-left: var(--app-gutter-xl);
  padding-right: var(--app-gutter-xl);
}

.v-erreur__list {
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}

.v-erreur__item {
  background: var(--app-bg-glow-color);
  backdrop-filter: var(--app-bg-glow-filter);
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
}
</style>

<template>
    <section class="v-erreur">
      <div class="v-erreur__item">
          <h3>Erreur</h3>
          <div>
            <p>La page que vous cherchez n'existe plus.</p>
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

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

useHead({
    title: 'Oups'
})

</script>





<style lang="scss" scoped >
.v-erreur__list {
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}

.v-erreur__item {
  background: white;
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

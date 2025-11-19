<template>
    <section class="v-erreur">
      <div class="v-erreur__item">
          <h3>Erreur</h3>
          <div>
            <p v-if="!customMsg" >La page que vous cherchez n'existe plus.</p>
            <p v-else >{{customMsg}}</p>
            <nuxt-link href="/">Revenir à l'accueil</nuxt-link>
          </div>
      </div>
    </section>
</template>





<script setup lang="ts">

import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks
} from "~/composables/cmsData";

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

useHead({
    title: 'Oups'
})

const customMsg = useRouter().currentRoute.value.query.msg


</script>





<style lang="scss" scoped >
.v-erreur {
  box-sizing: border-box;
  padding-left: var(--app-gutter);
  padding-right: var(--app-gutter);
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

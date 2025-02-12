<template>
  <section class="v-app-fixed-nav"
  >
    <nuxt-link class="app-button-grey"
               href="/programmation"
    >
      programmation
    </nuxt-link>
    <template v-if="useSiteInfo().value">
      <template v-for="page of useSiteInfo().value?.['page-simple']">
        <template v-if="page.pageContent.content.showinnavigation === 'true'"
        >
          <nuxt-link class="app-button-grey"
                  :href="'/' + page.pageContent.slug">
            {{ page.pageContent.content.title.toLocaleLowerCase() }}
          </nuxt-link>
        </template>
      </template>
    </template>
  </section>
</template>





<script setup lang="ts">
import {useSiteInfo} from "~/composables/cmsData";

</script>





<style lang="scss" scoped >
.v-app-fixed-nav {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-size: cover;
  width: 100%;
  box-sizing: border-box;
  color: inherit;
  padding-top: var(--app-gutter);
  gap: var(--app-gutter);


  .nuxt-watch-falk-is-active & {
    color: black;
  }

  > * {
    margin: 0;
  }
}
</style>

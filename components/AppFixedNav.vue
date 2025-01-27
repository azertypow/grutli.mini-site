<template>
  <section class="v-app-fixed-nav"
  >
    <template v-if="useSiteInfo().value">
      <template v-for="page of useSiteInfo().value?.['page-simple']">
        <div class="app-font-small"
             v-if="page.pageContent.content.showinnavigation === 'true'"
             style="white-space: nowrap"
        >
          <nuxt-link :href="'/' + page.pageContent.slug">
            {{ page.pageContent.content.title.toLocaleLowerCase() }}
          </nuxt-link>
        </div>
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
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-size: cover;
  width: 100%;
  box-sizing: border-box;
  color: inherit;
  padding-top: var(--app-gutter);
  gap: var(--app-gutter);

  @media (max-width: 900px) {
    //flex-direction: column;
    gap: 1rem;
  }

  .nuxt-watch-falk-is-active & {
    color: black;
  }

  a {
    text-decoration: none;

    display: block;
    color: black;
    background: var(--app-color-grey);
    padding: .25rem .5rem;
    border-radius: 1rem;
    font-size: .65rem;
  }

  > * {
    margin: 0;
  }
}
</style>

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
  justify-content: flex-end;
  //background: url('/s.jpg');
  //background: var(--app-color-purple);
  background-size: cover;
  width: 100%;
  box-sizing: border-box;
  color: inherit;
  gap: var(--app-gutter-xl);

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1rem;
  }

  .nuxt-watch-falk-is-active & {
    color: black;
  }

  a {
    text-decoration: none;
  }

  > * {
    margin: 0;
  }
}
</style>

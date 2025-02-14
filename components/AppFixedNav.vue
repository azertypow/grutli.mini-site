<template>
  <section class="v-app-fixed-nav"
  >
    <div class="v-slug__listed-pages">
      <nuxt-link class="app-button-grey app-font-small"
                 href="/programmation"
      >
        Programmation
      </nuxt-link>
      <template v-if="useSiteInfo().value">
        <template v-for="page of useSiteInfo().value?.['page-simple']">
          <template v-if="page.pageContent.content.showinnavigation === 'true'"
          >
            <nuxt-link class="app-button-grey app-font-small app-button-grey--with-shadow"
                    :href="'/' + page.pageContent.slug">
              {{ page.pageContent.content.title }}
            </nuxt-link>
          </template>
        </template>
      </template>
    </div>



    <div class="v-slug__children-link">
      <template v-if="currentPageForNavLinks">
        <nuxt-link class="v-slug__children-link__item app-font-small app-button-grey app-button-grey--inverse app-button-grey--with-shadow"
                   :href=" '/' + currentPageForNavLinks.slug"
        >{{currentPageForNavLinks.title}}</nuxt-link>
      </template>
      <template v-if="childrenDetailsForNavLinks">
        <nuxt-link class="v-slug__children-link__item app-font-small app-button-grey app-button-grey--with-shadow"
                   v-for="childLink of childrenDetailsForNavLinks"
                   :href=" '/' + childLink.pageContent.uri"
        >{{childLink.pageContent.content.title}}</nuxt-link>
      </template>
      <template v-if="parentSubPageForNavLinks">
        <nuxt-link class="v-slug__children-link__item app-font-small app-button-grey app-button-grey--with-shadow"
                   v-for="subPage of parentSubPageForNavLinks"
                   :href=" '/' + subPage.pageContent.uri"
        >{{subPage.pageContent.content.title}}</nuxt-link>
      </template>
    </div>


  </section>
</template>





<script setup lang="ts">
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks,
    useSiteInfo
} from "~/composables/cmsData";

const { slug } = useRoute().params;

const currentPageForNavLinks      = useCurrentPageForNavLinks()
const parentSubPageForNavLinks    = useParentSubPageForNavLinks()
const childrenDetailsForNavLinks  = useChildrenDetailsForNavLinks()

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
  gap: var(--app-gutter);


  .nuxt-watch-falk-is-active & {
    color: black;
  }

  > * {
    margin: 0;
  }
}

.v-slug__listed-pages {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  gap: var(--app-gutter);

  //> .router-link-exact-active {
  //  opacity: 0;
  //  pointer-events: none;
  //  user-select: none;
  //}
}

.v-slug__children-link {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  gap: var(--app-gutter);
}
</style>

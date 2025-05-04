<template>
  <section class="v-app-fixed-nav"
  >
    <div class="v-slug__listed-pages">
      <nuxt-link class="app-button-grey app-font-small app-button-grey--with-shadow"
                 href="/programmation"
      >
        Programmation
      </nuxt-link>
      <template v-for="page of listOfPageToShowInNavigation">
        <nuxt-link class="app-button-grey app-font-small app-button-grey--with-shadow"
                   :href="'/' + page.uri"
                   v-if="getFirstPath(useRoute().path) !== page.uri"
                   :class="{
                      'dont-show': getFirstPath(useRoute().path) === page.uri,
                   }"
        >
          {{ page.title }}
        </nuxt-link>
      </template>

      <button class="app-button-grey app-font-small app-button-grey--with-shadow"
              @click="useAppNewsletterIsOpen().value = true"
      >newsletter</button>

      <a href="https://infomaniak.events/fr-ch/shop/scenes-du-grutli-l-arbre-monde-CFFW7GX6FS"
         target="_blank"
         class="app-button-grey app-font-small app-button-grey--with-shadow"
      >Billetterie</a>
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
import type {PageChildren, PageContent, SiteInfoPageSimple} from "~/utlis/ApiCmsTypes";
import {getFirstPath} from "../utlis/getFirstPathUrl";
import {useRoute} from "nuxt/app";

const currentPageForNavLinks      = useCurrentPageForNavLinks()
const parentSubPageForNavLinks    = useParentSubPageForNavLinks()
const childrenDetailsForNavLinks  = useChildrenDetailsForNavLinks()

const listOfPageToShowInNavigation: ComputedRef<{title: string, uri: string, showInNavigation:  "true" | "false"}[]> = computed(() => {

    const siteInfo = useSiteInfo().value

    if( !siteInfo ) return []

    const pages: (PageContent | PageChildren)[] = [
        ...siteInfo['page-simple'].map(simplePage => simplePage.pageContent),
        ...siteInfo['page-simple'].flatMap(simplePage => {
            return simplePage.children
        })
    ]




    return pages.map((value: PageContent | PageChildren) => {

        if('children' in value) return {
            title: value.content.title,
            uri: value.uri,
            showInNavigation: value.content.showinnavigation,
        }


        return {
            title: value.title,
            uri: value.uri,
            showInNavigation: value.showinnavigation,
        }
    }).filter(value => value.showInNavigation === 'true')
})

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

.dont-show {
  opacity: 0;
  pointer-events: none;
  user-select: none;
}
</style>

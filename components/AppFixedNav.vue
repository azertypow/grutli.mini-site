<template>
  <section class="v-app-fixed-nav"
  >
    <div class="v-slug__listed-pages">
      <nuxt-link class="app-button-grey app-font-small app-button-grey--with-glow-effect"
                 href="/programmation"
      >
        Programmation
      </nuxt-link>
      <template v-for="page of listOfPageToShowInNavigation">
        <nuxt-link class="app-button-grey app-font-small app-button-grey--with-glow-effect"
                   :href="'/' + page.uri"
                   :class="{
                      'dont-show': getFirstPath(useRoute().path) === page.uri,
                   }"
        >
          {{ page.title }}
        </nuxt-link>
      </template>

      <nuxt-link class="app-button-grey app-font-small app-button-grey--with-glow-effect"
                 href="/diffusion"
      >
        Diffusion
      </nuxt-link>

      <nuxt-link class="app-button-grey app-font-small app-button-grey--with-glow-effect"
                 href="/archive"
      >
        Archive
      </nuxt-link>

      <a :href="ticketInfos.page_content.shop"
         v-if="ticketInfos"
         target="_blank"
         class="app-button-grey app-font-small app-button-grey--with-glow-effect"
      >Billetterie</a>

      <a :href="ticketInfos.page_content.shop"
         v-if="ticketInfos"
         target="_blank"
         class="app-button-grey app-font-small app-button-grey--with-glow-effect"
         style="background: var(--app-color-secondary)"
      >Espace Abonné.es</a>
    </div>
  </section>
</template>





<script setup lang="ts">
import {
    useChildrenDetailsForNavLinks,
    useCurrentPageForNavLinks,
    useParentSubPageForNavLinks,
    useSiteInfo, useTicketServiceInfo
} from "~/composables/cmsData";
import type {PageChildren, PageContent, SiteInfoPageSimple} from "~/utlis/ApiCmsTypes";
import {getFirstPath} from "../utlis/getFirstPathUrl";
import {useRoute} from "nuxt/app";

const currentPageForNavLinks      = useCurrentPageForNavLinks()
const parentSubPageForNavLinks    = useParentSubPageForNavLinks()
const childrenDetailsForNavLinks  = useChildrenDetailsForNavLinks()

const ticketInfos = useTicketServiceInfo()

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

.dont-show {
  pointer-events: none;
  user-select: none;
  background: black;
  color: var(--app-color-grey);
}
</style>

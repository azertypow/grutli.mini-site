<template>
  <main class="v-plan-du-site">
    <h1 class="v-plan-du-site__title">Plan du site</h1>

    <nav class="v-plan-du-site__nav" aria-label="Plan du site">
      <ul class="v-plan-du-site__list v-plan-du-site__list--level-1">
        <li class="v-plan-du-site__item">
          <nuxt-link to="/" class="v-plan-du-site__link">Accueil</nuxt-link>
        </li>

        <li class="v-plan-du-site__item">
          <nuxt-link to="/programmation" class="v-plan-du-site__link">Programmation</nuxt-link>
        </li>

        <li class="v-plan-du-site__item" v-if="siteInfo && siteInfo.spectacles.length > 0">
          <span class="v-plan-du-site__section">Spectacles</span>
          <ul class="v-plan-du-site__list v-plan-du-site__list--level-2">
            <li class="v-plan-du-site__item" v-for="spectacle in sortedSpectacles" :key="spectacle.pageContent.slug">
              <nuxt-link :to="'/spectacle/' + spectacle.pageContent.slug" class="v-plan-du-site__link">
                {{ spectacle.pageContent.content.title }}
              </nuxt-link>
            </li>
          </ul>
        </li>

        <li class="v-plan-du-site__item">
          <nuxt-link to="/diffusion" class="v-plan-du-site__link">Diffusion</nuxt-link>
        </li>

        <li class="v-plan-du-site__item">
          <nuxt-link to="/archive" class="v-plan-du-site__link">Archive</nuxt-link>
          <ul class="v-plan-du-site__list v-plan-du-site__list--level-2">
            <li class="v-plan-du-site__item">
              <nuxt-link to="/archive/directions-passes" class="v-plan-du-site__link">Directions passées</nuxt-link>
            </li>
            <li class="v-plan-du-site__item">
              <nuxt-link to="/archive/saisons-passes" class="v-plan-du-site__link">Saisons passées</nuxt-link>
            </li>
          </ul>
        </li>

        <template v-if="siteInfo && siteInfo['page-simple'].length > 0">
          <li class="v-plan-du-site__item" v-for="page in sortedPages" :key="page.pageContent.uri">
            <nuxt-link :to="'/' + page.pageContent.uri" class="v-plan-du-site__link">
              {{ page.pageContent.content.title }}
            </nuxt-link>
            <ul class="v-plan-du-site__list v-plan-du-site__list--level-2" v-if="page.children && page.children.length > 0">
              <li class="v-plan-du-site__item" v-for="child in page.children" :key="child.uri">
                <nuxt-link :to="'/' + child.uri" class="v-plan-du-site__link">
                  {{ child.title }}
                </nuxt-link>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </nav>
  </main>
</template>


<script setup lang="ts">
import type { SiteInfo, Spectacle, SiteInfoPageSimple } from "~/utlis/ApiCmsTypes";
import { useSiteInfo, useCurrentPageForNavLinks, useParentSubPageForNavLinks, useChildrenDetailsForNavLinks } from "~/composables/cmsData";

useCurrentPageForNavLinks().value = null
useParentSubPageForNavLinks().value = null
useChildrenDetailsForNavLinks().value = null

useHead({
  title: 'Plan du site - Scènes du Grutli'
})

const siteInfo: Ref<SiteInfo | null> = useSiteInfo()

const sortedSpectacles = computed(() => {
  if (!siteInfo.value) return []
  return [...siteInfo.value.spectacles].sort((a, b) =>
    a.pageContent.content.title.localeCompare(b.pageContent.content.title)
  )
})

const sortedPages = computed(() => {
  if (!siteInfo.value) return []
  return [...siteInfo.value['page-simple']].sort((a, b) =>
    a.pageContent.content.title.localeCompare(b.pageContent.content.title)
  )
})
</script>


<style lang="scss" scoped>
.v-plan-du-site {
  padding: var(--app-gutter) var(--app-gutter) 25vh;
  max-width: 1200px;
  margin: 0 auto;
}

.v-plan-du-site__title {
  text-align: center;
  margin-bottom: 2rem;
}

.v-plan-du-site__nav {
  margin-top: 2rem;
}

.v-plan-du-site__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.v-plan-du-site__list--level-1 {
  > .v-plan-du-site__item {
    margin-bottom: 1.5rem;
  }
}

.v-plan-du-site__list--level-2 {
  margin-top: 0.75rem;
  margin-left: 2rem;

  > .v-plan-du-site__item {
    margin-bottom: 0.5rem;
  }
}

.v-plan-du-site__item {
  line-height: 1.6;
}

.v-plan-du-site__link {
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
}
</style>

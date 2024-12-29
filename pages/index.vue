<template>
    <section class="v-index"
    >
      <div class="v-index__list">
        <template v-for="value of Object.entries(pages).slice(0, 3)">
          <div class="v-index__item">
            <nuxt-link :to="'/spectacle/' + value[0]">
              <h2 class="v-index__item__title app-font-h4 app-font-align-center">{{value[1].title}}</h2>
              <div class="v-index__item__date app-font-small">
                {{value[1].headerDate}}
              </div>
              <div class="v-index__item__peoples app-font-align-center">
                <div v-for="people of value[1].peoples">
                  {{people}}
                </div>
              </div>
            </nuxt-link>
          </div>
        </template>

        <template v-for="value of pageToShowInHome">
          <div class="v-index__item">
            <nuxt-link :to="'/' + value.pageContent.slug">
              <h2 class="v-index__item__title app-font-align-center app-font-h4">{{value.pageContent.content.title}}</h2>
              <div class="v-index__item__date app-font-small">
                16 DÉCEMBRE 2024
              </div>
            </nuxt-link>
          </div>
        </template>
      </div>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import {_routes} from "~/utlis/spectacle/_routes";
import type {PageSimple, SiteInfo} from "~/utlis/ApiCmsTypes";

const pages = _routes

const siteInfo: Ref<SiteInfo | null> = useSiteInfo()

const pageToShowInHome: ComputedRef<PageSimple[]> = computed(() => {

    console.log(siteInfo.value?.['page-simple'])

    return siteInfo.value?.['page-simple'].filter(page => page.pageContent.content.showinhome === 'true') || []
})


</script>





<style lang="scss" scoped >
.v-index__list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: var(--app-gutter-xl) var(--app-gutter) calc( var(--v-audio-player-header-height) + var(--app-gutter));
  justify-content: center;
}

.v-index__item__peoples {
  display: none;
}

.v-index__item {
  color: white;
  box-sizing: border-box;
  padding-left: var(--app-gutter);
  padding-right: var(--app-gutter);
  margin-bottom: var(--app-gutter-xl);
  width: 50%;

  @media (max-width: 1100px) {
    width: 100%;
  }

  a {
    display: flex;
    align-items: center;
    border: none;
    aspect-ratio: initial;
    background-image: url('/s.jpg');
    background-size: 80rem auto;
    box-sizing: border-box;
    padding: var(--app-gutter);
    border-radius: 1rem;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    position: relative;
    height: calc( (100vh - var(--app-header-height) - var(--v-audio-player-header-height)) / 2 - var(--app-gutter-xl) * 2);

    > * {
      width: 100%;
    }

    .nuxt-watch-falk-is-active & {
      background: white;
      color: black;
      border: solid 1px;
    }
  }

  &:nth-child(-n+3) {
    max-width: 30rem;
    width: calc(100% / 3);

    @media (max-width: 1100px) {
      width: 100%;
    }
  }

  &:nth-child(1n) {
    a {
      background-position: 24rem 0;
    }
  }

  &:nth-child(2n) {
    a {
      background-position: 35rem 23rem;
    }
  }

  &:nth-child(3n) {
    a {
      background-position: -7rem 60rem;
    }
  }
}

.v-index__item__date {
  position: absolute;
  top: var(--app-gutter-xl);
  left: var(--app-gutter-xl);
  width: calc(100% - var(--app-gutter-xl));
}

.v-index__item__peoples {
  display: block;
}
</style>

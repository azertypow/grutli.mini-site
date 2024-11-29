<template>
    <section class="v-index"
    >
      <div class="v-index__list">
        <template v-for="(value, key) of pages">
          <div class="v-index__item">
            <nuxt-link :to="'/spectacle/' + key">
              <h2 class="v-index__item__title">{{value.title}}</h2>
              <div class="v-index__item__date">
                {{value.headerDate}}
              </div>
              <div class="v-index__item__peoples">
                <div v-for="people of value.peoples">
                  {{people}}
                </div>
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

const pages = _routes
</script>





<style lang="scss" scoped >
.v-index__list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-left: var(--app-gutter);
  padding-right: var(--app-gutter);
  padding-top: 5rem;
  padding-bottom: 25vh;
  justify-content: center;
}

.v-index__item__peoples {
  display: none;
}

.v-index__item {
  width: 100%;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top: solid 1px black;
  }

  &:nth-child(-n+3) {
    box-sizing: border-box;
    width: calc(100% / 3);
    padding-left: var(--app-gutter);
    padding-right: var(--app-gutter);
    max-width: 30rem;
    color: white;

    @media (max-width: 1100px) {
      width: 100%;
    }

    a {
      border: none;
      aspect-ratio: 1/1;
      background-image: url('/s.jpg');
      background-size: 200% auto;
      box-sizing: border-box;
      padding: var(--app-gutter);
      border-radius: 2rem;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      position: relative;
    }

    .v-index__item__date {
      position: absolute;
      top:  1rem;
      left: 1rem;
      width: calc(100% - 2rem);
    }

    .v-index__item__peoples {
      display: block;
      font-size: 1rem;
    }
  }

  &:nth-child(1) {
    a {
      background-position: 0 0;
    }
  }

  &:nth-child(2) {
    a {
      background-position: 730px 120px;
    }
  }
  &:nth-child(3) {
    margin-bottom: 5rem;
    a {
      background-position: 0 220px;
    }
  }
}

.v-index__item__title {
  line-height: 1em;
}
</style>

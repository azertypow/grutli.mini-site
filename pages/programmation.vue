<template>
    <section class="v-programmation"
    >
      <div class="v-programmation__list">
        <template v-for="(value, key) of pages">
          <div class="v-programmation__item">
            <nuxt-link :to="'/spectacle/' + key">
              <h2 class="v-programmation__item__title">{{value.title}}</h2>
              <div class="v-programmation__item__date">
                {{value.headerDate}}
              </div>
              <div class="v-programmation__item__peoples">
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
.v-programmation__list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-left: var(--app-gutter);
  padding-right: var(--app-gutter);
  padding-top: 5rem;
  padding-bottom: 25vh;
  justify-content: center;
}

.v-programmation__item__peoples {
  display: none;
}

.v-programmation__item {
  width: 100%;
  color: white;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top: solid 1px currentColor;
  }
}

.v-programmation__item__title {
  line-height: 1em;
}
</style>

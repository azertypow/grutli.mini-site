<template>
    <section class="v-programmation"
    >
      <div class="v-programmation__list">
        <template v-for="(value, key) of pages">
          <div class="v-programmation__item">
            <nuxt-link :to="'/spectacle/' + key">
              <h4 class="v-programmation__item__title">{{value.title}}</h4>
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
.v-programmation {


  a {
    text-decoration: none;
  }
}

.v-programmation__list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 5rem var(--app-gutter) 25vh;
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

  .nuxt-watch-falk-is-active & {
    color: black;
  }
}

.v-programmation__item__title {
  //line-height: 1em;
  margin: 1rem 0;
}
</style>

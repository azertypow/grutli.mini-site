<template>
    <section class="v-app-tile-default">
      <div class="app-remove-first-last-child-margin">
        <slot name="header" />
      </div>

      <div class="app-remove-first-last-child-margin">
        <slot name="content" />
      </div>

      <div class="v-app-tile-default__item__info app-font-small"
           v-if="event_info"
      >
        <div class="v-app-tile-default__item__info__wrap">
          <div class="v-app-tile-default__item__info__wrap__text">{{event_info}}</div>
          <div class="v-app-tile-default__item__info__wrap__text">{{event_info}}</div>
          <div class="v-app-tile-default__item__info__wrap__text">{{event_info}}</div>
          <div class="v-app-tile-default__item__info__wrap__text">{{event_info}}</div>
        </div>
      </div>

      <div class="app-remove-first-last-child-margin">
        <slot name="footer" />
      </div>

    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    event_info?: string
}>()
</script>





<style lang="scss" scoped >
.v-app-tile-default {
  width: 100%;
  background: var(--app-color-grey);
  transition: transform .25s ease-in-out;
  color: black;
  display: flex;
  align-items: center;
  aspect-ratio: initial;
  background: var(--app-color-grey);
  background-size: 80rem auto;
  box-sizing: border-box;
  padding: var(--app-gutter);
  border-radius: 1rem;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  position: relative;
  height: 100%;
  text-decoration: none;
  overflow: hidden;
  min-height: 8rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  &:hover {
    transform: scale(1.015);
  }
}

.v-app-tile-default__item__info {
  width: calc(100% - var(--app-gutter-xl));
  text-align: center;
  font-style: italic;
  margin-bottom: 0;
  background: var(--app-color-purple);
  overflow: hidden;
  position: relative;
  height: 1rem;
  padding-left: calc( 2 * var(--app-gutter));
  padding-right: calc( 2 * var(--app-gutter));
}

.v-app-tile-default__item__info__wrap {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  animation: app-app__news__wrap--animation--variante ease-in-out 15s infinite alternate-reverse;
  width: auto;
  position: absolute;
  top: 0;
  left: 0;
}

.v-app-tile-default__item__info__wrap__text {
  white-space: nowrap;
  padding-right: 2rem;
  line-height: 1rem;
}
</style>

<template>
    <section class="v-archive-index"
    >
      <h1 class="v-archive-index__title">Archive</h1>
      <div class="v-archive-index__wrap">

        <nuxt-link  class="v-archive-index__wrap__item"
                    href="/archive/directions-passes"
        >
          <h2>Directions passées</h2>
        </nuxt-link>

        <nuxt-link class="v-archive-index__wrap__item"
                   href="/archive/saisons-passes"
        >
          <h2>Saisons passées</h2>
        </nuxt-link>

      </div>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    message?: string
}>()

useHead({
  title: 'Archive des Scènes du Grutli',
})

</script>





<style lang="scss" scoped >
.v-archive-index__title {
  text-align: center;
}

.v-archive-index__wrap {
  display: flex;
  gap: var(--app-gutter-xl);
}

.v-archive-index__wrap__item {
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  background: var(--app-color-grey);
  box-sizing: border-box;
  padding: var(--app-gutter);
  border-radius: 1rem;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  position: relative;
  height: 50vh;
  text-decoration: none;
  overflow: hidden;
  min-height: 8rem;

  .nuxt-watch-falk-is-active & {
    background: white;
    color: black;
    border: solid 1px;
  }

  @media (max-width: 1100px) {
    height: auto;
  }
}
</style>

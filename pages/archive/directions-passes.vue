<template>
  <section class="v-archive-directions-passes"
  >
    <h1 class="v-archive-directions-passes__title">Archive</h1>
    <div class="v-archive-directions-passes__wrap">

      <a class="v-archive-directions-passes__wrap__item"
         href="https://2024.grutli.ch/"
      >
        <h2 class="v-archive-directions-passes__wrap__item__title">Titre ou date ?</h2>
        <h5 class="v-archive-directions-passes__wrap__item__peoples">direction de …</h5>
        <p  class="v-archive-directions-passes__wrap__item__info">info</p>
      </a>

      <a class="v-archive-directions-passes__wrap__item"
         href="https://2024.grutli.ch/"
      >
        <h2 class="v-archive-directions-passes__wrap__item__title">Titre ou date ?</h2>
        <h5 class="v-archive-directions-passes__wrap__item__peoples">direction de …</h5>
        <p  class="v-archive-directions-passes__wrap__item__info">info</p>
      </a>

      <a class="v-archive-directions-passes__wrap__item"
         href="https://2024.grutli.ch/"
      >
        <h2 class="v-archive-directions-passes__wrap__item__title">Titre ou date ?</h2>
        <h5 class="v-archive-directions-passes__wrap__item__peoples">direction de …</h5>
        <p  class="v-archive-directions-passes__wrap__item__info">info</p>
      </a>

      <a class="v-archive-directions-passes__wrap__item"
         href="https://2024.grutli.ch/"
      >
        <h2 class="v-archive-directions-passes__wrap__item__title">Titre ou date ?</h2>
        <h5 class="v-archive-directions-passes__wrap__item__peoples">direction de …</h5>
        <p  class="v-archive-directions-passes__wrap__item__info">info</p>
      </a>

      <a class="v-archive-directions-passes__wrap__item"
         href="https://2024.grutli.ch/"
      >
        <h2 class="v-archive-directions-passes__wrap__item__title">Titre ou date ?</h2>
        <h5 class="v-archive-directions-passes__wrap__item__peoples">direction de …</h5>
        <p  class="v-archive-directions-passes__wrap__item__info">info</p>
      </a>

    </div>
  </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  message?: string
}>()

useHead({
  title: 'Directions passées des Scènes du Grutli',
})

</script>





<style lang="scss" scoped >
.v-archive-directions-passes__title {
  text-align: center;
}

.v-archive-directions-passes__wrap {
  display: flex;
  gap: var(--app-gutter-xl);
  flex-wrap: wrap;
}

.v-archive-directions-passes__wrap__item {
  width: 100%;
  max-width: calc( ( (100% + var(--app-gutter-xl) ) / 3) - var(--app-gutter-xl));
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
  height: auto;
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

.v-archive-directions-passes__wrap__item__title {
  font-size: 1rem;
  margin: 0;
}

.v-archive-directions-passes__wrap__item__peoples {
  margin: 0;
}

.v-archive-directions-passes__wrap__item__info {
  margin: 0;
}


</style>

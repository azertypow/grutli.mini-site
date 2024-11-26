<template>
    <section
        class="v-spectacle-slug"
    >
      <img alt="image texte"
           class="v-spectacle-slug__img"
           :src="pageData.headerImageLeft"
      />
      <div class="v-spectacle-slug__content">
        <h1>{{pageData.headerTitle}}</h1>
        <ContentDoc/>
      </div>
    </section>
</template>





<script setup lang="ts">
import {queryContent} from "../../.nuxt/imports";
import type {PageHeaderAPI} from "~/utlis/PageHeaderAPI";

const pageData = await queryContent().findOne() as PageHeaderAPI

</script>





<style lang="scss" scoped >
.v-spectacle-slug {
}

.v-spectacle-slug__img {
  display: block;
  width: 100%;
}
</style>

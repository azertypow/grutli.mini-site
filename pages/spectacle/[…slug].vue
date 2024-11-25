<template>
    <section
        class="v-spectacle-slug"
    >
      <img alt="image texte"
           class="v-spectacle-slug__img-text"
           :src="pageData.headerImageLeft"
      />
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

.v-spectacle-slug__img-text {
  display: block;
  width: 100%;
}
</style>

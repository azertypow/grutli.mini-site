<template>
    <section class="v-spectacle-slug"
    >
      <div class="v-spectacle-slug__coll">
        <img alt="image texte"
             class="v-spectacle-slug__img"
             :src="pageData.headerImageLeft"
        />
      </div>
      <div class="v-spectacle-slug__coll">
        <img alt="image texte"
             class="v-spectacle-slug__img"
             :src="pageData.headerImageRight"
        />
        <div class="v-spectacle-slug__ticket">
          <a style="display: block"
             v-if="pageData.ticketUrl"
             :href="pageData.ticketUrl"
             target="_blank"
          >prendre un billet</a>
          <div style="display: block"
             v-else
          >billeterie à venir</div>
        </div>
      </div>
    </section>
</template>





<script setup lang="ts">
import {_routes} from "~/utlis/spectacle/_routes";
import type {PageHeaderAPI} from "~/utlis/PageHeaderAPI";

const pageData: PageHeaderAPI = _routes[useRoute().params.slug as string]

const color = computed(() => pageData.headerColor)
const textColor = computed(() => pageData.textColor)

</script>





<style lang="scss" scoped >
.v-spectacle-slug {
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  background-color: v-bind(color);
  flex-direction: column-reverse;
  flex-wrap: wrap;

  @media (min-width: 1200px) {
    flex-direction: row;
    flex-wrap: nowrap;
  }
}

.v-spectacle-slug__coll {
  width: 100%;
}

.v-spectacle-slug__img {
  display: block;
  width: 100%;
  user-select: none;
  pointer-events: none;
}

.v-spectacle-slug__ticket {
  position: sticky;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: v-bind(color);
  color: v-bind(textColor);
  font-size: 2rem;
  line-height: 1.25em;
}
</style>

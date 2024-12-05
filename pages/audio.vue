<template>
    <section
        class="v-audio"
    >

    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    message?: string
}>()
</script>





<style lang="scss" scoped >
.v-audio {
  position: fixed;
  top: var(--app-header-height);
  left: 0;
  width: 100%;
  height: calc(100% - var(--app-header-height));
}

iframe {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

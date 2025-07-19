<template>
    <section
        class="v-app-coll"
    >
      <div class="v-app-coll__coll">
        <slot name="left" />
      </div>

      <div class="v-app-coll__coll" >
        <slot name="right"/>
      </div>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    message?: string
}>()
</script>





<style lang="scss" scoped >
.v-app-coll {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  gap: var(--app-gutter-xl);
}

.v-app-coll__coll {
  width: 50%;
  display: flex;
  flex-wrap: nowrap;
  gap: var(--app-gutter-xl);
  flex-direction: column;
  flex-shrink: 1;
}
</style>

<template>
  <section class="v-app-spectacle-card-loader"
  >
    <AppSpectacleCard
            v-if="data"
            :to="'/spectacle/' + data.pageContent.slug"
            :title="data.pageContent.content.title"
            :peoples="data.pageContent.content.company"
            :event-title="data.pageContent.content.eventtitle"
            :dates="{start: data.pageContent.content.datestart, end: data.pageContent.content.dateend}"
            :event_info="data.pageContent.content.eventinfo"
    />
  </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import {fetchPageSpectacle} from "~/utlis/apiCmsFetch";
import type {ApiCmsPageSpectacle} from "~/utlis/ApiCmsTypes";

const props = defineProps<{
    slug: string
}>()

const data: Ref<ApiCmsPageSpectacle | null> = ref(null)

onMounted(async () => {
    data.value = await fetchPageSpectacle(props.slug)
})
</script>

<style lang="scss">
.v-app-spectacle-card-loader {
  width: 100%;
}
</style>

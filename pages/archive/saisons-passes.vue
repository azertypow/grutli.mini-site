<template>
    <section
        class="v-saisons-passes"
    >
      <template v-for="value of saisonFiltred">
        <div class="v-index__list-wrap"
        >
          <h2>{{value.season.content.title}}</h2>
          <h3>{{value.season.content.dateinformation}}</h3>
          <div class="v-index__list"
          >
            <template v-for="spectacle of  value.spectacles">
              <div class="v-index__item">
                <AppSpectacleCard
                        :event_info="spectacle.pageContent.content.eventinfo"
                        :to="'/spectacle/' + spectacle.pageContent.slug"
                        :title='spectacle.pageContent.content.title'
                        :peoples="[{authors_link: 'authors_link', authors_name: 'compagnie', id: 'id'}]"
                />
              </div>
            </template>
          </div>
        </div>
      </template>



    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import AppSpectacleCard from "~/components/AppSpectacleCard.vue";
import {getSpectaclesBySeasons, loadSeasons} from "~/utlis/apiCmsKQLFetch";
import {fetchSeasons, fetchSpectaclesBySeason} from "~/utlis/apiCmsFetch";

const props = defineProps<{
    message?: string
}>()

const saisonFiltred = ref([])

useHead({
  title: 'Saisons passées des Scènes du Grutli',
})

onMounted(async () => {
    const seasons = await fetchSeasons()

    const arrayToReturn = []

    const pastSeason = seasons.value.filter(value => value.content.statut === 'passe')

    for (const saison of pastSeason) {
        const seasonSlug = saison.slug
        // console.log('seasonSlug', seasonSlug)
        const spectacles = await fetchSpectaclesBySeason(seasonSlug)
        arrayToReturn.push({
            season: saison,
            spectacles: spectacles,
        })
    }

    console.log('arrayToReturn', arrayToReturn)
    saisonFiltred.value = arrayToReturn

})

</script>





<style lang="scss" scoped >
h2 {
  font-size: 1rem;
  margin-bottom: 0;
}

h3 {
  margin-top: 0;
  text-align: center;
}

.v-index__list-wrap {
  padding: var(--app-gutter-xl) 0 calc( var(--v-audio-player-header-height) + var(--app-gutter));
  //background: red;

  @media (max-width: 1600px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }


  @media (max-width: 1500px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media (max-width: 1200px) {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  @media (max-width: 700px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media (max-width: 550px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media (max-width: 400px) {
    padding-left:   1rem;
    padding-right:  1rem;
  }
}

.v-index__list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
  gap: var(--app-gutter-xl);
}

.v-index__item {
  box-sizing: border-box;
  width: calc( (100% / 3) - var(--app-gutter-xl) );
  flex-grow: 1;
  transition: transform .25s ease-in-out;

  &:hover {
    transform: scale(1.015);
  }

  @media (max-width: 1100px) {
    width: 100%;
  }
}
</style>

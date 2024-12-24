<template>
    <section class="v-app-header"
    >
      <a class="v-app-header__left app-font-small"
         href="https://maps.app.goo.gl/vfnYHQpAnQWwTXxHA"
         target="_blank"
      >
        Scènes
        <br>du Grütli
        <br>16, rue du Général-Dufour
        <br>1204 Genève
      </a>

      <nuxt-link class="v-app-header__center"
                 to="/"
      >
        <div class="v-app-header__center__top app-font-small">saison 2025</div>
        <div class="v-app-header__center__center app-font-h3">L’Arbre-Monde</div>
        <div class="v-app-header__center__bottom app-font-small">janvier - juin</div>
      </nuxt-link>


      <div class="v-app-header__right app-font-small">

        <div class="v-app-header__falk-ui" @click="useFalkIsActive().value = !useFalkIsActive().value">
          FALC
          <img v-if="useFalkIsActive().value" src="../assets/icons/toggle_on_24dp_5985E1_FILL0_wght400_GRAD0_opsz24.svg"/>
          <img v-else src="../assets/icons/toggle_off_24dp_5985E1_FILL0_wght400_GRAD0_opsz24.svg"/>
        </div>

        <div class="v-app-header__right__tickets" >
          <div>
            <nuxt-link href="/programmation">
              programmation
            </nuxt-link>
          </div>
          <a href="https://infomaniak.events/shop/tsyU0nZLR0/"
             target="_blank"
             class="v-app-header__link-abonnement"
          >abonnements</a>

          <a href="https://infomaniak.events/shop/UwCaGkGB7O/"
             target="_blank"
             class="v-app-header__link-billeterie"
          >
            <div>
              billeterie
              <span><br>et abonnements</span>
            </div>
            <svg style="display: block; height: 1.5rem"
                 xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            >
              <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z"/>
            </svg>
          </a>
        </div>
        <AppFixedNav/>
      </div>
    </section>
</template>

<style lang="scss" scoped >
.v-app-header {
  width: 100%;
  height: var(--app-header-height);
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: var(--app-gutter);
  align-items: flex-start;
  user-select: none;
  color: white;
  background-image: url('/s.jpg');
  background-size: cover;

  .nuxt-watch-falk-is-active & {
    background-image: none;
    background: white;
    color: black;
    border-bottom: solid 1px;
  }
}

.v-app-header__center {
  text-align: center;

  @media (max-width: 800px) {
    text-align: left  ;
  }
}

.v-app-header__center__top {
  @media (max-width: 800px) {
    display: none;
  }
}

.v-app-header__center__center {
  line-height: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.v-app-header__center__bottom {
  @media (max-width: 800px) {
    display: none;
  }
}

.v-app-header__left {
  width: calc(100%/3);

  @media (max-width: 800px) {
    display: none;
  }
}

.v-app-header__right {
  display: flex;
  align-items: flex-end;
  flex-wrap: nowrap;
  gap: 0;
  width: calc(100%/3);
  flex-direction: column;

  @media (max-width: 800px) {
    width: auto;
  }
}

.v-app-header__falk-ui {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5rem;
  user-select: none;
  cursor: pointer;

  img {
    display: block;
  }
}

.v-app-header__link-abonnement {
  @media (max-width: 1000px) {
    display: none;
  }
}

.v-app-header__link-billeterie {
  display: flex;
  gap: var(--app-gutter);
  align-items: center;
  text-align: right;

  span {
    display: none;
    @media (max-width: 1000px) {
      display: inline;
    }
  }

  svg {
    display: block;
    fill: white;

    .nuxt-watch-falk-is-active & {
      fill: black;
    }
  }

}

.v-app-header__right__tickets {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: var(--app-gutter-xl);
  flex-direction: row;
}


</style>
<script setup lang="ts">
import {useFalkIsActive} from "~/composables/cmsData";
</script>

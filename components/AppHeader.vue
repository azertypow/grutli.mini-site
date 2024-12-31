<template>
    <section class="v-app-header"
             :class="{
              'is-open': useMenuIsOpen().value
             }"
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

      <div class="v-app-header__menu-toggle" @click="useMenuIsOpen().value = !useMenuIsOpen().value">
        <svg v-if="useMenuIsOpen().value" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
      </div>

      <div class="v-app-header__right app-font-small">

        <div class="v-app-header__falk-ui" @click="useFalkIsActive().value = !useFalkIsActive().value">
          <div>FALC</div>
          <svg v-if="useFalkIsActive().value" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
            <path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z"/>
          </svg>
          <svg v-else
                  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
            <path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm200-120Z"/>
          </svg>
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
            billeterie
            <svg style="display: block; height: .75rem; width: auto"
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

  a {
    text-decoration: none;
  }
}

.v-app-header__center {
  text-align: center;

  @media (max-width: 1300px) {
    text-align: left;
  }
}

.v-app-header__menu-toggle {
  cursor: pointer;

  display: none;

  > svg {
    display: block;
    height: 1.5rem;
    width: auto;
    fill: white;

    .nuxt-watch-falk-is-active & {
      fill: black !important;
    }
  }

  @media (max-width: 900px) {
    display: block;
  }
}

.v-app-header__center__top {
  margin: 0;

  @media (max-width: 900px) {
    display: none;
  }
}

.v-app-header__center__center {
  margin: 0;
}

.v-app-header__center__bottom {
  margin: 0;

  @media (max-width: 900px) {
    display: none;
  }
}

.v-app-header__left {
  width: calc(100%/3);

  @media (max-width: 1300px) {
    display: none;
  }
}

.v-app-header__right {
  display: flex;
  align-items: flex-end;
  flex-wrap: nowrap;
  gap: var(--app-gutter-xl);
  width: calc(100%/3);
  flex-direction: column;

  @media (max-width: 1300px) {
    width: auto;
  }

  @media (max-width: 900px) {
    position: fixed;
    top: var(--app-header-height);
    left: 0;
    box-sizing: border-box;
    width: 100%;
    color: black;
    background: white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc( 100% - var(--app-header-height) );
    gap: 1rem;

    display: none;

    .is-open & {
      display: flex;
    }
  }
}

.v-app-header__falk-ui {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5rem;
  user-select: none;
  cursor: pointer;

  svg {
    display: block;

    @media (max-width: 900px) {
      fill: black;
    }
  }

  @media (max-width: 900px) {
    justify-content: center;
  }
}


.v-app-header__link-billeterie {
  display: flex;
  gap: var(--app-gutter);
  align-items: center;
  text-align: right;

  svg {
    display: block;
    fill: white;

    .nuxt-watch-falk-is-active & {
      fill: black;
    }

    @media (max-width: 900px) {
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

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1rem;
  }
}


</style>
<script setup lang="ts">
import {useFalkIsActive, useMenuIsOpen} from "~/composables/cmsData";
</script>

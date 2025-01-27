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
      </div>

      <div class="v-app-header__footer">
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
  flex-wrap: wrap;
  justify-content: space-between;
  padding: var(--app-gutter);
  align-items: flex-start;
  user-select: none;
  color: black;
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
    fill: black;

    @media (max-width: 900px) {
      fill: black;
    }
  }

  @media (max-width: 900px) {
    justify-content: center;
  }
}

.v-app-header__footer {
  width: 100%;
}

</style>

<script setup lang="ts">
import {useFalkIsActive, useMenuIsOpen} from "~/composables/cmsData";
</script>

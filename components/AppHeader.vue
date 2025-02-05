<template>
    <section class="v-app-header"
             :class="{
              'window-is-scrolled': windowIsScrolled,
              }"
    >
      <nuxt-link class="v-app-header__left app-font-small"
         to="/"
      >
        Scènes
        <br>du Grütli
      </nuxt-link>

      <nuxt-link class="v-app-header__center"
                 to="/"
      >
        <div class="v-app-header__center__top app-font-small">saison 2025</div>
        <div class="v-app-header__center__center app-font-h3">L’Arbre-Monde</div>
        <div class="v-app-header__center__bottom app-font-small">janvier - juin</div>
      </nuxt-link>

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

      <div class="v-app-header__footer"
           ref="app-footer"
      >
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
  align-items: center;
  user-select: none;
  color: black;
  //transition: background-color .25s ease-out;

  &.window-is-scrolled {
    background: white;
  }

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

  @media (max-width: 800px) {
    display: none;
  }
}

.v-app-header__center__top {
  margin: 0;

  @media (max-width: 1100px) {
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
  margin-bottom: 0;

  @media (max-width: 800px) {
    width: auto;
  }
}

.v-app-header__right {
  display: flex;
  align-items: flex-end;
  flex-wrap: nowrap;
  gap: var(--app-gutter-xl);
  width: calc(100%/3);
  flex-direction: column;
  margin-bottom: 0;

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
import {useFalkIsActive} from "~/composables/cmsData";


const windowIsScrolled = ref(false)

onMounted(() => {
    setWindowScrollStatus()
    window.addEventListener('scroll', setWindowScrollStatus)
})

function setWindowScrollStatus() {
    windowIsScrolled.value = window.scrollY > 50
}

</script>

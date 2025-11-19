<template>
    <nav class="v-app-header" aria-label="Navigation principale">
      <div class="v-app-header__left">
        <nuxt-link class="app-font-small app-font-mono app-font-mono--force app-button-grey app-button-grey--with-glow-effect"
                   to="/"
                   style="padding-left: .75rem; padding-right: .75rem"
                   aria-label="Retour à l'accueil - Scènes du Grütli"
        >
          Scènes
          <br>du Grütli
        </nuxt-link>
      </div>

      <div class="v-app-header__navigation"
           ref="app-footer"
           v-if="useMenuIsOpen().value"
           role="navigation"
           aria-label="Menu de navigation"
      >
        <AppFixedNav/>
      </div>

      <div class="v-app-header__right">

        <div class="v-app-header__right__top">

          <button class="app-button-grey app-font-small app-button-grey--with-glow-effect v-app-header__social"
                  style="font-size: 0.5rem; text-transform: uppercase;"
                  @click="useAppNewsletterIsOpen().value = true"
                  type="button"
                  aria-label="S'inscrire à la newsletter"
          >
            <svg id="Layer_1"
                 xmlns="http://www.w3.org/2000/svg"
                 version="1.1"
                 viewBox="0 0 20 15"
                 style="height: .4rem;"
                 aria-hidden="true"
            >
              <path class="st0" d="M.53,0h18.94c.51,0,.72.66.31.96l-8.15,5.98c-.97.71-2.29.71-3.25,0L.22.95C-.19.65.02,0,.53,0ZM2.11,15h15.77c1.17,0,2.11-.94,2.11-2.11V3.48c0-.35-.39-.54-.67-.34l-6.81,5c-.75.55-1.63.83-2.51.83s-1.76-.28-2.51-.83L.67,3.13C.39,2.93,0,3.13,0,3.47v9.42C0,14.06.95,15,2.11,15Z"/>
            </svg>
          </button>

          <a class="v-app-header__social app-button-grey app-button-grey--with-glow-effect"
             href="https://www.facebook.com/legrutli/friends_likes/?locale=fr_FR"
             target="_blank"
             aria-label="Suivez-nous sur Facebook (ouvre dans un nouvel onglet)"
             rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
            </svg>
          </a>

          <a class="v-app-header__social app-button-grey app-button-grey--with-glow-effect"
             href="https://www.instagram.com/legrutli_artsvivants/"
             target="_blank"
             aria-label="Suivez-nous sur Instagram (ouvre dans un nouvel onglet)"
             rel="noopener noreferrer"
          >
            <svg style="height: .65rem"
                    fill="#000000" width="800px" height="800px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M160,128a32,32,0,1,1-32-32A32.03667,32.03667,0,0,1,160,128Zm68-44v88a56.06353,56.06353,0,0,1-56,56H84a56.06353,56.06353,0,0,1-56-56V84A56.06353,56.06353,0,0,1,84,28h88A56.06353,56.06353,0,0,1,228,84Zm-52,44a48,48,0,1,0-48,48A48.05436,48.05436,0,0,0,176,128Zm16-52a12,12,0,1,0-12,12A12,12,0,0,0,192,76Z"/>
            </svg>
          </a>

          <button class="v-app-header__falk-ui app-button-grey app-button-grey--with-glow-effect"
                  @click="useFalkIsActive().value = !useFalkIsActive().value"
                  type="button"
                  :aria-label="useFalkIsActive().value ? 'Désactiver le mode Facile à Lire et à Comprendre' : 'Activer le mode Facile à Lire et à Comprendre'"
                  :aria-pressed="useFalkIsActive().value.toString()"
                  role="switch"
                  :class="{
                    'is-active': useFalkIsActive().value
                  }"
          >
            <div aria-hidden="true">Vue simplifiée</div>
          </button>
        </div>

        <template v-if="useWindowsWidthIsSmallerThan1200pxCSSBreakpoint().value">
          <button class="v-app-header__toggle-menu app-button-grey app-button-grey--with-glow-effect"
                  @click="useMenuIsOpen().value = !useMenuIsOpen().value"
                  type="button"
                  :aria-label="useMenuIsOpen().value ? 'Fermer le menu' : 'Ouvrir le menu'"
                  :aria-expanded="useMenuIsOpen().value.toString()"
          >
            <svg v-if="useMenuIsOpen().value" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" aria-hidden="true"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" aria-hidden="true"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          </button>
        </template>

      </div>
    </nav>
</template>

<style lang="scss" scoped >
.v-app-header {
  width: 100%;
  height: auto;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: var(--app-gutter);
  align-items: flex-start;
  user-select: none;
  color: black;
  gap: var(--app-gutter-xl);

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
  display: flex;
  width: auto;
  margin-bottom: 0;
  flex-shrink: 0;
}

.v-app-header__right {
  display: flex;
  align-items: flex-end;
  flex-wrap: nowrap;
  gap: var(--app-gutter);
  width: auto;
  flex-direction: column;
  margin-bottom: 0;
  flex-shrink: 0;
}

.v-app-header__right__top {
  display: flex;
  gap: var(--app-gutter);
}

.v-app-header__social {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 1rem;
  height: 1rem;

  svg {
    display: block;
    height: .5rem;
    width: auto;
  }

  &:hover {
    svg {
      fill: white;
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
  font-size: .5rem;
  line-height: 1em;

  &.is-active {
    background-color: black;
    color: white;
  }
}

.v-app-header__toggle-menu {
  font-size: .5rem;
  line-height: 1em;
  padding: .15rem;
  user-select: none;
  cursor: pointer;

  svg {
    display: block;
    fill: black;

    &:hover {
      fill: white;
    }
  }
}

.v-app-header__navigation {
  width: 100%;
  flex-shrink: 1;
  box-sizing: border-box;
  position: fixed;
  top: var(--app-header-height);
  padding-right: 2rem;

  @media (min-width: 1200px) {
    position: relative;
    padding-right: 0;
    top: 0;
  }
}

</style>

<script setup lang="ts">
import {
    useFalkIsActive,
    useMenuIsOpen,
    useWindowIsScrollToBottom,
    useWindowsWidthIsSmallerThan1200pxCSSBreakpoint
} from "~/composables/cmsData";


const windowIsScrollToBottom = useWindowIsScrollToBottom()
const beforeScrollPosition = ref(window.scrollY)

onMounted(() => {
    setWindowScrollStatus()
    window.addEventListener('scroll', setWindowScrollStatus)
    window.addEventListener('resize', () => {
        useMenuIsOpen().value = !useWindowsWidthIsSmallerThan1200pxCSSBreakpoint().value
    })
})

function setWindowScrollStatus() {
    windowIsScrollToBottom.value = window.scrollY > beforeScrollPosition.value && window.scrollY > 50
    beforeScrollPosition.value = window.scrollY
}

</script>

<template>
    <section class="v-app-header">
      <div class="v-app-header__left">
        <nuxt-link class="app-font-small app-font-mono app-font-mono--force app-button-grey app-button-grey--with-shadow"
                   to="/"
                   style="padding-left: .75rem; padding-right: .75rem"
        >
          Scènes
          <br>du Grütli
        </nuxt-link>
      </div>

      <div class="v-app-header__navigation"
           ref="app-footer"
           v-if="useMenuIsOpen().value"
      >
        <AppFixedNav/>
      </div>

      <div class="v-app-header__right">

        <div class="v-app-header__right__top">

          <button class="app-button-grey app-font-small app-button-grey--with-shadow v-app-header__social"
                  style="font-size: 0.5rem; text-transform: uppercase;"
                  @click="useAppNewsletterIsOpen().value = true"
          ><svg xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px" fill="#000"
                style="height: .75rem;"
          ><path d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm80-80h480v-80H240v80Zm0-160h160v-240H240v240Zm240 0h240v-80H480v80Zm0-160h240v-80H480v80ZM160-200v-560 560Z"/></svg></button>

          <a class="v-app-header__social app-button-grey app-button-grey--with-shadow"
             href="https://www.facebook.com/legrutli/friends_likes/?locale=fr_FR"
             target="_blank"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
            </svg>
          </a>

          <a class="v-app-header__social app-button-grey app-button-grey--with-shadow"
             href="https://www.instagram.com/legrutli_artsvivants/"
             target="_blank"
          >
            <svg style="height: .65rem"
                    fill="#000000" width="800px" height="800px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
              <path d="M160,128a32,32,0,1,1-32-32A32.03667,32.03667,0,0,1,160,128Zm68-44v88a56.06353,56.06353,0,0,1-56,56H84a56.06353,56.06353,0,0,1-56-56V84A56.06353,56.06353,0,0,1,84,28h88A56.06353,56.06353,0,0,1,228,84Zm-52,44a48,48,0,1,0-48,48A48.05436,48.05436,0,0,0,176,128Zm16-52a12,12,0,1,0-12,12A12,12,0,0,0,192,76Z"/>
            </svg>
          </a>

          <div class="v-app-header__falk-ui app-button-grey app-button-grey--with-shadow" @click="useFalkIsActive().value = !useFalkIsActive().value">
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

        <template v-if="useWindowsWidthIsSmallerThan1200pxCSSBreakpoint().value">
          <div class="v-app-header__toggle-menu app-button-grey app-button-grey--with-shadow"
               @click="useMenuIsOpen().value = !useMenuIsOpen().value"
          >
            <svg v-if="useMenuIsOpen().value" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          </div>
        </template>

      </div>
    </section>
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

  &:hover {
    svg {
      fill: white;
    }
  }

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

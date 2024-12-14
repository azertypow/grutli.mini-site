<template>
    <section class="v-app-header"
    >
      <a class="v-app-header__left"
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
        <div class="v-app-header__center__top">saison 2025</div>
        <div class="v-app-header__center__center">L’Arbre-Monde</div>
        <div class="v-app-header__center__bottom">janvier - juin</div>
      </nuxt-link>


      <div class="v-app-header__right">

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
               xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z"/>
          </svg>
        </a>
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
  align-items: center;
  user-select: none;
  color: white;
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
  font-size: 2rem;
  line-height: 1em;
  @media (max-width: 800px) {

    font-size: 1.5rem;
  }
}

.v-app-header__center__bottom {
  @media (max-width: 800px) {
    display: none;
  }
}

.v-app-header__left {
  font-size: 1rem;
  width: calc(100%/3);

  @media (max-width: 800px) {
    display: none;
  }
}

.v-app-header__right {
  font-size: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 3rem;
  width: calc(100%/3);
  justify-content: flex-end;

  @media (max-width: 800px) {
    width: auto;
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
}


</style>
<script setup lang="ts">
</script>

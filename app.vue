<template>
  <div class="app-app">
    <div class="app-app__header">
      <AppHeader/>
    </div>
    <div class="app-app__content">
      <NuxtPage/>
    </div>

    <AudioPlayer/>
  </div>
</template>

<style lang="scss" scoped>
.app-app {
  padding-top: var(--app-header-height);
  width: 100%;
}

.app-app__header {
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
}

.app-app__content {
  max-width: 75rem;
  margin: auto;
}
</style>

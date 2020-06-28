<template>
  <header class="modal-header">
    <slot />
  </header>
</template>

<style scoped lang="scss">
.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 0 30px;
  border-bottom: 1px solid $border;
  box-shadow: 0 3px 6px $shadow;
}
</style>

<template>
  <div class="modal-item">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.modal-item {
  padding: 0 30px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 1px $border solid;
  height: 73px;
  input {
    width: 100%;
    height: 100%;
    display: flex;
    border: 0;
    background: none;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0;
    &::placeholder {
      color: $placeholder;
    }
  }
  label {
    min-width: 110px;
    justify-content: center;
    color: $text;
    flex-shrink: 0;
  }
}
</style>

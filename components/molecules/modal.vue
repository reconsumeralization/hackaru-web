<template>
  <transition name="modal">
    <div v-if="showed" class="modal" @click="hide">
      <div class="container" @click.stop>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showed: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    hide() {
      this.$emit('update:showed', false);
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  width: 100vw;
  height: 100vh;
  background-color: $backdrop-color;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  z-index: index($z, modal);
}
.container {
  position: absolute;
  min-width: 500px;
  border-radius: 3px;
  background-color: $white;
  box-shadow: 0 15px 15px $shadow-dark;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.1s;
  .container {
    transition: transform 0.1s;
    transform: scale(1, 1);
  }
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
  .container {
    transform: scale(0.95, 0.95);
  }
}
</style>

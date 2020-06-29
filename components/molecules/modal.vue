<template>
  <transition name="zoom-fade">
    <div v-if="shown" class="modal" @click="hide">
      <div class="container" @click.stop>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    shown: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    hide() {
      this.$emit('hide');
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
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: opacity 0.15s;
  .container {
    transition: transform 0.15s;
    transform: scale(1, 1);
  }
}
.zoom-fade-enter,
.zoom-fade-leave-to {
  opacity: 0;
  .container {
    transform: scale(0.95, 0.95);
  }
}
</style>

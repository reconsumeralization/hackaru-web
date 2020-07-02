<template>
  <div class="toast">
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div v-if="opened" :class="['content', type]">
        {{ message }}
      </div>
    </transition>
  </div>
</template>

<script>
const durations = {
  error: 5000,
  success: 3000,
};

export default {
  data() {
    return {
      message: '',
      type: '',
      opened: false,
      hideTimer: undefined,
    };
  },
  mounted() {
    this.$nuxt.$on('toast', this.show);
  },
  methods: {
    show({ message, type }) {
      this.type = type;
      this.message = message;
      this.opened = true;
      clearInterval(this.hideTimer);
      this.hideTimer = setTimeout(
        () => (this.opened = false),
        durations[this.type]
      );
    },
  },
};
</script>

<style scoped lang="scss">
.toast {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  width: calc(100vw - #{$side-bar-min-width});
  bottom: 0;
  pointer-events: none;
  left: $side-bar-min-width;
  z-index: index($z, toast);
}
.content {
  padding: 9px 20px;
  margin-bottom: 50px;
  color: $white;
  border-radius: 99px;
  text-align: center;
}
.success {
  background-color: $cyan;
}
.error {
  background-color: $red;
}
@include mq(small) {
  .toast {
    left: 0;
    width: 100vw;
  }
  .content {
    padding: 25px 30px;
    padding-bottom: calc(25px + env(safe-area-inset-bottom) * 0.6);
    flex-direction: column;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    margin: 0;
    width: 100%;
    border-radius: 0;
  }
}
</style>

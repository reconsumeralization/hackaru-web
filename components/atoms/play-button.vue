<i18n src="@/assets/locales/components/atoms/play-button.json"></i18n>

<template>
  <div>
    <base-button
      v-tooltip="$t('stop')"
      v-if="working"
      type="submit"
      class="is-danger is-circle button stop"
    >
      <icon name="square-icon" class="icon" />
    </base-button>
    <base-button
      v-tooltip="$t('start')"
      v-else
      type="submit"
      class="is-primary is-circle button start"
    >
      <icon name="play-icon" class="icon" />
    </base-button>
  </div>
</template>

<script>
import Icon from '@/components/atoms/icon';
import BaseButton from '@/components/atoms/base-button';

export default {
  components: {
    Icon,
    BaseButton,
  },
  props: {
    working: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  display: flex;
  align-self: center;
  flex-shrink: 0;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  pointer-events: auto;
  border-radius: 50%;
  transition: opacity 0.3s, transform 0.1s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    transform: scale(0.95);
  }
}
.icon {
  width: 22px;
  height: 22px;
}
.start .icon {
  padding-left: 3px;
}
</style>

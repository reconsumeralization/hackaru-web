<i18n
  src="@/assets/locales/components/organisms/activity-group-heading.json"
></i18n>

<template>
  <h1 class="activity-group-heading">
    {{ title }}<span>・{{ week }}</span>
  </h1>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    day: {
      type: String,
      required: true,
    },
  },
  computed: {
    title() {
      const diff = dayjs().diff(this.day, 'd');
      if (diff === 0) return this.$t('today');
      if (diff === 1) return this.$t('yesterday');
      if (diff < 0) return `${Math.abs(diff)}${this.$t('later')}`;
      if (diff > 0) return `${diff}${this.$t('ago')}`;
    },
    week() {
      return this.$t(`weeks[${dayjs(this.day).format('d')}]`);
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 18px;
  font-weight: normal;
  margin-left: 40px;
  padding-bottom: 10px;
}
span {
  font-size: 16px;
  color: $text-light;
}
@include mq(small) {
  h1 {
    margin-left: 30px;
  }
}
</style>

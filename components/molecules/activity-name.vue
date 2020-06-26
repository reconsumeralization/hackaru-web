<i18n src="@/assets/locales/components/molecules/activity-name.json"></i18n>

<template>
  <dot-text :color="color" :text="text" />
</template>

<script>
import DotText from '@/components/molecules/dot-text';

export default {
  components: {
    DotText,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  computed: {
    color() {
      return (this.project || {}).color || '#cccfd9'
    },
    text() {
      if (this.description) return this.description;
      if (this.project) return this.project.name;
      return this.$t('noProject')
    }
  }
};
</script>

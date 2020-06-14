<template>
  <dot-text :color="color" :text="name" />
</template>

<script>
import DotText from '@/components/molecules/dot-text';

export default {
  components: {
    DotText,
  },
  props: {
    name: {
      type: String,
      default: '未設定',
    },
    color: {
      type: String,
      default: '#cccfd9',
    },
  },
};
</script>

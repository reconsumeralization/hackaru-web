<template>
  <time>{{ fromS(duration, 'hh:mm:ss') }}</time>
</template>

<script>
import { fromS } from 'hh-mm-ss';
import dayjs from 'dayjs';

export default {
  timers: {
    updateDuration: {
      time: 500,
      autostart: true,
      repeat: true,
    },
  },
  props: {
    startedAt: {
      type: String,
      default: undefined,
    },
    stoppedAt: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      fromS,
      started: dayjs(this.startedAt),
      stopped: dayjs(this.stoppedAt),
    };
  },
  computed: {
    duration() {
      return this.stopped.diff(this.started, 's');
    },
  },
  watch: {
    startedAt(value) {
      this.started = dayjs(value);
    },
    stoppedAt(value) {
      this.stopped = dayjs(value);
    },
  },
  methods: {
    updateDuration() {
      if (this.stoppedAt) this.$timer.stop('updateDuration');
      this.started = dayjs(this.startedAt);
      this.stopped = dayjs(this.stoppedAt);
    },
  },
};
</script>

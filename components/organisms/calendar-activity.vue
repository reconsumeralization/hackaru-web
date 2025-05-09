<i18n src="~/assets/locales/components/organisms/calendar-activity.json"></i18n>

<template>
  <dragger
    ref="dragger"
    :top.sync="top"
    :left.sync="left"
    :enabled="!resized"
    :class="['calendar-activity', { dragging: dragged }]"
    :style="{ height: `${height}px` }"
    @start="moveStart"
    @moving="moving"
    @end="moveEnd"
    @cancel="moveCancel"
  >
    <div
      data-test-id="click-handler"
      class="click-handler"
      @mousedown="mousedown"
      @mouseup="mouseup"
    >
      <calendar-event
        :style="{ height: `${height}px` }"
        :title="title"
        :color="color"
        :started-at="startedAt"
        :stopped-at="stoppedAt"
        class="event"
      />
      <resizer
        :height.sync="height"
        :enabled="!dragged"
        :min-height="minHeight"
        :handle-color="color"
        data-test-id="resizer"
        class="resizer"
        @resizing="resizing"
        @end="resizeEnd"
        @cancel="resizeCancel"
      >
        <span class="handler" />
      </resizer>
    </div>
  </dragger>
</template>

<script>
import Dragger from '~/components/atoms/dragger';
import Resizer from '~/components/atoms/resizer';
import CalendarEvent from '~/components/atoms/calendar-event';
import ActivityEditor from '~/components/organisms/activity-editor';

import {
  startOfDay,
  addSeconds,
  differenceInMinutes,
  addMinutes,
  parseISO,
} from 'date-fns';

export default {
  components: {
    CalendarEvent,
    Dragger,
    Resizer,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startedAt: {
      type: String,
      required: true,
    },
    stoppedAt: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    overlappedDay: {
      type: String,
      default: undefined,
    },
    duration: {
      type: Number,
      required: true,
    },
    minHeight: {
      type: Number,
      default: 30,
    },
    project: {
      type: Object,
      default: () => undefined,
    },
    guideTop: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      dragged: false,
      resized: false,
      top: this.getInitialTop(),
      height: this.getInitialHeight(),
      left: 0,
    };
  },
  computed: {
    title() {
      return (
        this.description || (this.project ? this.project.name : 'No Project')
      );
    },
    color() {
      return this.project ? this.project.color : '#cccfd9';
    },
  },
  watch: {
    startedAt: function () {
      this.resetPosition();
    },
    duration: function () {
      this.resetPosition();
    },
  },
  methods: {
    getInitialTop() {
      return this.$toPx(
        differenceInMinutes(
          parseISO(this.startedAt),
          startOfDay(parseISO(this.day))
        )
      );
    },
    getInitialHeight() {
      return Math.max(this.$toPx(this.duration / 60), this.minHeight);
    },
    resetPosition() {
      this.top = this.getInitialTop();
      this.height = this.getInitialHeight();
      this.left = 0;
    },
    moveStart() {
      this.dragged = true;
      this.$emit('dragging', {
        el: this.$el,
        guideRulerTop: this.top,
      });
    },
    moving() {
      this.$emit('dragging', {
        el: this.$el,
        guideRulerTop: this.top,
      });
    },
    moveEnd() {
      this.$emit('drop');
      if (!this.overlappedDay) {
        return this.resetPosition();
      }
      const date = addMinutes(
        startOfDay(parseISO(this.overlappedDay)),
        this.$toMin(this.top)
      );
      this.update({
        startedAt: date,
        stoppedAt: addSeconds(date, this.duration),
      });
    },
    moveCancel() {
      this.$emit('drop');
    },
    resizing() {
      this.resized = true;
      this.$emit('dragging', {
        el: this.$el,
        guideRulerTop: this.top + this.height,
      });
    },
    resizeEnd() {
      this.$emit('drop');
      const stoppedAt = addMinutes(
        parseISO(this.startedAt),
        this.$toMin(this.height)
      );
      this.update({ stoppedAt });
    },
    resizeCancel() {
      this.$emit('drop');
    },
    mousedown() {
      this.resized = false;
      this.dragged = false;
    },
    mouseup() {
      const clickOnly = !this.resized && !this.dragged;
      if (clickOnly) this.showModal();
      this.resized = false;
      this.dragged = false;
    },
    showModal() {
      this.$nuxt.$emit('show-modal', {
        component: ActivityEditor,
        params: {
          id: this.id,
          description: this.description,
          startedAt: this.startedAt,
          stoppedAt: this.stoppedAt,
          duration: this.duration,
          project: this.project,
        },
      });
    },
    async update(payload) {
      await this.$store.dispatch('activities/update', {
        id: this.id,
        ...payload,
      });
      this.$ga.event({
        eventCategory: 'Activities',
        eventAction: 'update',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-activity {
  flex: 1;
  position: relative;
  box-sizing: border-box;
  display: flex;
  padding: 0;
  align-items: center;
  overflow: hidden;
  pointer-events: auto;
  transition: box-shadow 0.2s, opacity 0.2s;
  box-shadow: 0 3px 2px $shadow-dark;
  border: 1px $background solid;
  border-left: 0;
  border-bottom: 0;
  &:hover,
  &:active {
    cursor: pointer;
  }
}
.calendar-activity.dragging {
  cursor: grabbing;
  opacity: 1;
  box-shadow: 0 7px 10px $shadow-dark;
  z-index: index($z, calendar-dragging-activity);
}
.event {
  height: 100%;
}
.handler {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 5px;
  padding-top: 15px;
  right: 0;
  bottom: 0;
  width: 100%;
  cursor: s-resize;
}
.resizer {
  align-items: center;
}
.click-handler {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  align-items: center;
}
@include mq(small) {
  .handler {
    left: auto;
    right: 0;
    width: 100%;
  }
}
</style>

<i18n src="@/assets/locales/components/organisms/activity-item.json"></i18n>

<template>
  <div>
    <activity-modal
      :shown.sync="shownModal"
      :activity="{
        id,
        project,
        description,
        startedAt,
        stoppedAt,
      }"
    />
    <swipe-menu
      ref="swipeMenu"
      @swipe-left="deleteActivity"
      @swipe-right="repeatActivity"
    >
      <template slot="left">
        <div class="swipe-menu-item is-danger">
          <icon name="trash-icon" />
        </div>
      </template>
      <section class="activity" @click="showModal">
        <div class="content">
          <activity-name :project="project" :description="description" />
        </div>
        <ticker
          :started-at="startedAt"
          :stopped-at="stoppedAt"
          class="duration"
        />
        <base-button
          v-tooltip="$t('repeat')"
          class="repeat-button"
          @click.stop="repeatActivity"
        >
          <icon name="repeat-icon" class="is-midium" />
        </base-button>
      </section>
      <template slot="right">
        <div class="swipe-menu-item is-repeat">
          <icon name="repeat-icon" />
        </div>
      </template>
    </swipe-menu>
  </div>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import ActivityName from '@/components/molecules/activity-name';
import Ticker from '@/components/atoms/ticker';
import SwipeMenu from '@/components/molecules/swipe-menu';
import StartActivity from '~/graphql/mutations/start-activity';
import { setWorkingActivity } from '@/apollo/caches/working-activity';
import ActivityModal from '@/components/organisms/activity-modal';

export default {
  components: {
    ActivityModal,
    BaseButton,
    SwipeMenu,
    Icon,
    ActivityName,
    Ticker,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
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
    project: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      shownModal: false,
    };
  },
  methods: {
    showModal() {
      this.shownModal = true;
    },
    deleteActivity() {
      if (!window.confirm(this.$t('confirms.delete'))) {
        this.$refs.swipeMenu.reset();
        return;
      }
      // TODO
    },
    repeatActivity() {
      this.$refs.swipeMenu.reset();
      this.$apollo.mutate({
        mutation: StartActivity,
        variables: {
          description: this.description,
          projectId: (this.project || {}).id,
          startedAt: new Date().toISOString(),
        },
        update(store, { data }) {
          setWorkingActivity(store, data.createActivity.activity);
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.activity {
  border-top: 1px $border solid;
  height: 68px;
  display: flex;
  align-items: center;
  padding: 0 45px;
  padding-right: 40px;
  cursor: pointer;
  transition: background-color 0.1s ease;
  &:hover {
    background-color: $background-hover;
  }
}
.duration {
  font-family: $font-family-duration;
}
.content {
  align-items: center;
  min-width: 1px;
  justify-content: space-between;
  display: flex;
  flex: 1;
  padding-right: 20px;
  height: 100%;
}
.repeat-button {
  height: 100%;
  border-radius: 0;
  margin-left: 10px;
}
.is-repeat {
  background-color: $green;
  color: $white;
}
@include mq(small) {
  .activity {
    padding: 0 30px;
    padding-left: 35px;
    height: 75px;
  }
  .repeat-button {
    display: none;
  }
}
</style>

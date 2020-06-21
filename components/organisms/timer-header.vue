<i18n src="@/assets/locales/components/organisms/timer-header.json"></i18n>

<template>
  <section class="timer-header">
    <form class="form">
      <div v-tooltip="$t('selectProject')" class="project-button">
        <project-name v-bind="project" class="project-name" />
        <dot :color="project.color" class="dot-only is-medium" />
      </div>
      <input
        :value="description"
        :placeholder="$t('description')"
        type="text"
        class="description"
        @focus="focus"
        @blur="blur"
      />
      <ticker
        :started-at="startedAt"
        :class="['duration', { hide: focused }]"
      />
      <play-button :working="working" class="play-button" @stop="stop" />
    </form>
    <suggestion-list v-if="focused" />
  </section>
</template>

<script>
import Dot from '@/components/atoms/dot';
import NavModal from '@/components/organisms/nav-modal';
import ProjectName from '@/components/molecules/project-name';
import SuggestionList from '@/components/organisms/suggestion-list';
import Ticker from '@/components/atoms/ticker';
import PlayButton from '@/components/atoms/play-button';
import StopActivity from '~/graphql/queries/stop-activity';
import WorkingActivity from '~/graphql/queries/working-activity';

export default {
  components: {
    Dot,
    NavModal,
    Ticker,
    ProjectName,
    SuggestionList,
    PlayButton,
  },
  data() {
    return {
      id: undefined,
      description: '',
      project: {},
      focused: false,
      startedAt: undefined,
    };
  },
  computed: {
    working() {
      return !!this.id;
    },
  },
  apollo: {
    workingActivity: {
      query: WorkingActivity,
      manual: true,
      result({ data }) {
        const activity = data.viewer.workingActivity;
        if (activity) {
          this.id = activity.id;
          this.description = activity.description;
          this.project = activity.project || {};
          this.startedAt = activity.startedAt;
        } else {
          this.id = undefined;
          this.description = '';
          this.project = {};
          this.startedAt = undefined;
        }
      },
    },
  },
  methods: {
    focus() {
      this.focused = true;
    },
    blur() {
      this.focused = false;
    },
    start() {
      console.log('START');
    },
    stop() {
      this.$apollo.mutate({
        mutation: StopActivity,
        variables: {
          id: this.id,
          stoppedAt: new Date().toISOString(),
        },
        update(store) {
          const data = store.readQuery({ query: WorkingActivity });
          data.viewer.workingActivity = null;
          store.writeQuery({
            query: WorkingActivity,
            data,
          });
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.timer-header {
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: calc(100vw - #{$side-bar-min-width});
  z-index: index($z, timer-form);
  width: 100%;
  left: $side-bar-min-width;
}
.form {
  width: 100%;
  height: 91px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 1px $border-dark solid;
  box-shadow: 0 3px 3px $shadow;
  background-color: $background-translucent;
  z-index: 1;
}
.project-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  transition: transform 0.1s ease;
  max-width: 200px;
  &:hover {
    opacity: 0.85;
  }
  &:active {
    transform: scale(0.95);
  }
}
.dot-only {
  display: none;
}
.project-name {
  opacity: 1;
  padding: 0 45px;
}
.description {
  line-height: 1;
  border: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 40px;
  display: flex;
  background: none;
  text-overflow: ellipsis;
  overflow: hidden;
  border-left: 1px $border-dark solid;
}
.duration {
  font-size: 18px;
  align-self: center;
  line-height: 1;
  margin-right: 30px;
  font-family: $font-family-duration;
}
.play-button {
  margin-right: 40px;
}
@include mq(small) {
  .timer-header {
    left: 0;
    max-width: 100vw;
  }
  .form {
    height: 80px;
    width: 100vw;
  }
  .project-name {
    display: none;
  }
  .dot-only {
    display: block;
    margin: 0 34px;
  }
  .play-button {
    margin-right: 16px;
  }
  .duration.hide {
    display: none;
  }
}
</style>

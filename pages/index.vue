<i18n src="@/assets/locales/pages/index.json"></i18n>

<template>
  <section class="index">
    <timer-header :activity="workingActivity" />
    <div class="content">
      <p v-if="empty" class="empty-message">
        {{ $t('empty') }}
      </p>
      <activity-day-group
        v-for="(activities, day) in activities"
        :key="day"
        :day="day"
        :activities="activities"
        class="day"
      />
    </div>
  </section>
</template>

<script>
import TimerHeader from '@/components/organisms/timer-header';
import ActivityDayGroup from '@/components/organisms/activity-day-group';
import StoppedActivities from '~/graphql/queries/stopped-activities';
import WorkingActivity from '~/graphql/queries/working-activity';
import groupBy from 'lodash.groupby';
import dayjs from 'dayjs';

function groupByStartedAt(activities) {
  return groupBy(activities, ({ startedAt }) =>
    dayjs(startedAt).format('YYYY-MM-DD')
  );
}

export default {
  components: {
    TimerHeader,
    ActivityDayGroup,
  },
  apollo: {
    activities: {
      query: StoppedActivities,
      prefetch: false,
      variables: {
        from: dayjs().startOf('d').subtract(7, 'd'),
        to: dayjs().endOf('d'),
      },
      update(data) {
        return groupByStartedAt(
          data.viewer.stoppedActivities
        );
      },
    },
    workingActivity: {
      query: WorkingActivity,
      update(data) {
        return data.viewer.workingActivity;
      },
    },
  },
  data() {
    return {
      activities: {},
      workingActivity: null,
    };
  },
  computed: {
    empty() {
      return Object.keys(this.activities).length <= 0;
    },
  },
  head: {
    title: 'Timer',
  },
};
</script>

<style scoped lang="scss">
.index {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.timer-form {
  width: 100%;
}
.content {
  width: 100%;
  margin-top: 90px;
}
.empty-message {
  display: flex;
  justify-content: center;
  margin: 60px 30px;
  text-align: center;
  color: $text-lighter;
}
@include mq(small) {
  .empty-message {
    height: calc(100vh - #{$side-bar-min-height});
  }
}
</style>

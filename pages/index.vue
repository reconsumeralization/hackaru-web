<i18n src="@/assets/locales/pages/index.json"></i18n>

<template>
  <section class="index">
    <timer-header />
    <div class="content">
      <p v-if="empty" class="empty-message">
        {{ $t('empty') }}
      </p>
      <section
        v-for="(activities, day, index) in activities"
        :key="day"
        class="activity-group"
      >
        <activity-group-heading :day="day" />
        <activity-item
          v-for="activity in activities"
          :class="{ tutorial: index === 0 && activities[0] == activity }"
          :key="activity.id"
          v-bind="activity"
        />
      </section>
    </div>
  </section>
</template>

<script>
import TimerHeader from '@/components/organisms/timer-header';
import ActivityGroupHeading from '@/components/organisms/activity-group-heading';
import ActivityItem from '@/components/organisms/activity-item';
import StoppedActivities from '~/graphql/queries/stopped-activities';
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
    ActivityItem,
    ActivityGroupHeading,
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
        return groupByStartedAt(data.viewer.stoppedActivities);
      },
    },
  },
  data() {
    return {
      activities: {},
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
.activity-group {
  padding: 0 0;
  margin: 50px 0;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px $border solid;
}
@include mq(small) {
  .empty-message {
    height: calc(100vh - #{$side-bar-min-height});
  }
  .activity-group {
    margin-top: 30px;
    margin-bottom: 50px;
  }
}
</style>

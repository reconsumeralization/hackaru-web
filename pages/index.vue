<i18n src="@/assets/locales/pages/index.json"></i18n>

<template>
  <section class="index">
    <timer-form class="timer-form" />
    <div class="content">
      <p v-if="empty" class="empty-message">
        {{ $t('empty') }}
      </p>
      <activity-day-group
        v-for="(activities, day) in pastWeek"
        v-else
        :key="day"
        :day="day"
        :activities="activities"
        class="day"
      />
    </div>
  </section>
</template>

<script>
import TimerForm from '@/components/organisms/timer-form';
import ActivityDayGroup from '@/components/organisms/activity-day-group';
import PastWeek from '~/graphql/queries/past-week.gql'
import groupBy from 'lodash.groupby';
import dayjs from 'dayjs';

function groupByStartedAt(activities) {
  return groupBy(activities, ({ startedAt }) =>
    dayjs(startedAt).format('YYYY-MM-DD')
  );
}

export default {
  components: {
    TimerForm,
    ActivityDayGroup,
  },
  data() {
    return {
      pastWeek: {},
    };
  },
  async asyncData({ app }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: PastWeek,
      variables: {
        from: dayjs().subtract(7, 'd'),
        to: dayjs(),
      },
    });
    return {
      pastWeek: groupByStartedAt(
        data.viewer.activities
      )
    };
  },
  computed: {
    empty() {
      return Object.keys(this.pastWeek).length <= 0;
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

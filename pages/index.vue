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
import groupBy from 'lodash.groupby';
import gql from 'graphql-tag';
import dayjs from 'dayjs';

const pastWeek = gql`
  query($from: ISO8601DateTime!, $to: ISO8601DateTime!) {
    viewer {
      activities(from: $from, to: $to) {
        id
        description
        startedAt
        stoppedAt
        project {
          id
          name
          color
        }
      }
    }
  }
`;

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
      query: pastWeek,
      variables: {
        from: dayjs().subtract(7, 'd'),
        to: dayjs(),
      },
    });
    const format = ({ startedAt }) => dayjs(startedAt).format('YYYY-MM-DD');
    return { pastWeek: groupBy(data.viewer.activities, format) };
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

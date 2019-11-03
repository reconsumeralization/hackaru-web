export const SET_REPORTS = 'SET_REPORTS';

export const state = () => ({
  projects: [],
  totals: {},
  labels: [],
  data: {},
  start: undefined,
  end: undefined
});

export const actions = {
  async fetch({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/report',
          params: {
            start: payload.start,
            end: payload.end,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          }
        },
        { root: true }
      );
      commit(SET_REPORTS, {
        projects: res.data.projects,
        totals: res.data.totals,
        labels: res.data.labels,
        data: res.data.data,
        start: payload.start,
        end: payload.end
      });
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  }
};

export const mutations = {
  [SET_REPORTS](state, payload) {
    state.projects = payload.projects;
    state.totals = payload.totals;
    state.labels = payload.labels;
    state.data = payload.data;
    state.start = payload.start;
    state.end = payload.end;
  }
};

export const getters = {
  projects: state => {
    return state.projects;
  },
  totals: state => {
    return state.totals;
  },
  empty: state => {
    return Object.values(state.totals).reduce((acc, cur) => acc + cur, 0) <= 0;
  },
  barChartData: state => {
    return {
      labels: state.labels,
      datasets: state.projects.map(project => ({
        label: project.name,
        backgroundColor: project.color,
        data: state.data[project.id]
      }))
    };
  },
  doughnutChartData: state => {
    const projects = state.projects;
    return {
      labels: projects.map(({ name }) => name),
      datasets: [
        {
          data: Object.values(state.totals),
          backgroundColor: projects.map(({ color }) => color)
        }
      ]
    };
  }
};

import Vue from 'vue';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

export default ({ app, isServer }) => {
  Vue.use(VueApollo);

  app.apolloProvider = new VueApollo({
    defaultClient: new ApolloClient({
      uri: `${app.$env.HACKARU_API_URL}/graphql`,
      ssrMode: isServer,
    }),
  });
};

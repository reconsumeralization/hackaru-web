import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default ({ app, isServer }) => {
  Vue.use(VueApollo);

  const httpLink = createHttpLink({
    uri: `${app.$env.HACKARU_API_URL}/graphql`,
  });

  app.apolloProvider = new VueApollo({
    defaultClient: new ApolloClient({
      link: httpLink,
      ssrMode: isServer,
      cache: new InMemoryCache(),
    }),
  });
};

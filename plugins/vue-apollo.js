import Vue from 'vue';
import VueApollo from 'vue-apollo';
import fetch from 'cross-fetch';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default ({ app, isServer }) => {
  Vue.use(VueApollo);

  const authLink = setContext((_, context) => {
    const csrfToken =
      'mCcuj+rqxw7hdPEYYsCbK822+8GgbsIE6Fhn0ZlkkeiYgwdJLhGHyV/z0lsF3iOBdVbzftAFv2OnIoSrKMKldQ==';
    return {
      headers: {
        'X-CSRF-Token': csrfToken,
        ...context.headers,
      },
      ...context,
    };
  });

  const httpLink = createHttpLink({
    uri: `${app.$env.HACKARU_API_URL}/graphql`,
    fetch,
  });

  app.apolloProvider = new VueApollo({
    defaultClient: new ApolloClient({
      link: ApolloLink.from([authLink, httpLink]),
      ssrMode: isServer,
      cache: new InMemoryCache(),
    }),
  });
};

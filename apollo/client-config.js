import Vue from 'vue';
import axios from 'axios';
import fetch from 'cross-fetch';
import VueApollo from 'vue-apollo';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import Cookies from 'universal-cookie';

export default ({ app, req }) => {
  Vue.use(VueApollo);

  const cookieHeader = process.server ? req.headers.cookie : undefined;
  const cookies = new Cookies(cookieHeader);

  const baseURL = process.server
    ? app.$env.HACKARU_SSR_API_URL
    : app.$env.HACKARU_SPA_API_URL;

  async function createAccessToken({ email, password }) {
    if (process.server) return;
    if (cookies.get('csrfToken')) return;

    const { data } = await axios.request({
      url: '/auth/access_token',
      method: 'post',
      baseURL,
      timeout: app.$env.HACKARU_API_TIMEOUT || 0,
      withCredentials: true,
      data: {
        user: {
          email,
          password,
        },
      },
    });
    cookies.set('csrfToken', data.csrf_token);
  }

  const authLink = setContext(async (_, context) => {
    await createAccessToken({
      email: 'test@example.com',
      password: 'password',
    });

    const headers = {
      'X-CSRF-Token': cookies.get('csrfToken'),
      ...context.headers,
    };

    if (process.server) {
      headers['Cookie'] = cookieHeader;
    }

    return { ...context, headers };
  });

  const httpLink = createHttpLink({
    uri: `${baseURL}/graphql`,
    credentials: 'include',
    fetch,
  });

  return {
    link: ApolloLink.from([authLink, httpLink]),
    defaultHttpLink: false,
  };
};

import merge from 'lodash.merge';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

function isJsonType(responseType) {
  return !responseType || responseType === 'json';
}

export const actions = {
  async request(state, config) {
    const res = await axios.request(
      merge(
        {
          ...config,
          data: snakecaseKeys(config.data || {}),
          params: snakecaseKeys(config.params || {})
        },
        {
          baseURL: this.$env.HACKARU_API_URL,
          timeout: this.$env.HACKARU_API_TIMEOUT || 0,
          headers: { 'Accept-Language': this.app.i18n.locale }
        }
      )
    );
    if (isJsonType(config.responseType)) {
      return {
        data: camelcaseKeys(res.data || {}, { deep: true }),
        headers: res.headers
      };
    }
    return res;
  }
};

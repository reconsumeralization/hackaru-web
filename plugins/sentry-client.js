import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

export default async ({ app }) => {
  Sentry.init({
    dsn: app.$env.SENTRY_DSN,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  });
};

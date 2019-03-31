import i18nCacher from '@/plugins/customs/i18n-cacher';

describe('I18nCacher', () => {
  let app;
  let onReady;

  beforeEach(() => {
    localStorage.clear();
    app = {
      i18n: {},
      router: {
        onReady: fn => {
          onReady = fn;
        }
      }
    };
    i18nCacher({ app });
  });

  describe('when call onReady and local storage does not have locale', () => {
    beforeEach(() => {
      onReady();
    });

    it('does not set locale', () => {
      expect(app.i18n.locale).toBeUndefined();
    });
  });

  describe('when call onReady and local storage has locale', () => {
    beforeEach(() => {
      localStorage.setItem('locale', 'ja');
      onReady();
    });

    it('set locale', () => {
      expect(app.i18n.locale).toBe('ja');
    });
  });

  describe('when switch language', () => {
    beforeEach(() => {
      app.i18n.onLanguageSwitched('en', 'ja');
    });

    it('cache locale', () => {
      expect(localStorage.setItem).toHaveBeenCalledWith('locale', 'ja');
    });
  });
});
const hasIntl = typeof(Intl) !== 'undefined';

function en(cb) {
  if(!hasIntl) {
    require.ensure(['./en', 'intl/locale-data/jsonp/en.js'], function(require) {
      require('intl/locale-data/jsonp/en.js');
      const messages = require('./en');
      cb({
        locale: 'en',
        messages: messages.default
      });
    }, 'en-intl');
  } else {
    require.ensure(['./en'], function(require) {
      const messages = require('./en');
      cb({
        locale: 'en',
        messages: messages.default
      });
    }, 'en');
  }
}

function fr(cb) {
  if(!hasIntl) {
    require.ensure(['./fr', 'intl/locale-data/jsonp/fr.js', 'react-intl/locale-data/fr'], function(require) {
      const messages = require('./fr');
      require('intl/locale-data/jsonp/fr.js');
      const formats = require('react-intl/locale-data/fr');
      cb({
        locale: 'fr',
        messages: messages.default,
        formats: formats
      });
    }, 'fr-intl');
  } else {
    require.ensure(['./fr', 'react-intl/locale-data/fr'], function(require) {
      const messages = require('./fr');
      const formats = require('react-intl/locale-data/fr');
      cb({
        locale: 'fr',
        messages: messages.default,
        formats: formats
      });
    }, 'fr');
  }
}

function es(cb) {
  if(!hasIntl) {
    require.ensure(['./es', 'intl/locale-data/jsonp/es.js', 'react-intl/locale-data/es'], function(require) {
      const messages = require('./es');
      require('intl/locale-data/jsonp/es.js');
      const formats = require('react-intl/locale-data/es');
      cb({
        locale: 'es',
        messages: messages.default,
        formats: formats
      });
    }, 'es-intl');
  } else {
    require.ensure(['./es', 'react-intl/locale-data/es'], function(require) {
      const messages = require('./es');
      const formats = require('react-intl/locale-data/es');
      cb({
        locale: 'es',
        messages: messages.default,
        formats: formats
      });
    }, 'es');
  }
}

const locales = {
  en: en,
  fr: fr,
  es: es
};

export default function(language, cb) {
  let fn;
  const lowercaseLanguage = language.toLowerCase();

  if(locales[lowercaseLanguage]) {
    fn = locales[lowercaseLanguage];
  } else {
    const shortLanguage = language.substring(0, 2);
    fn = locales[shortLanguage] || locales.en;
  }

  if(!hasIntl) {
    require.ensure(['intl'], function(require) {
      require('intl');
      fn(cb);
    });
  } else {
    fn(cb);
  }
};

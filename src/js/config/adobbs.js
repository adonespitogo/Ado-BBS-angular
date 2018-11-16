angular.module('AdoBBS')
  .config(['adoAuthConfigProvider', 'envServiceProvider', function (adoAuthConfigProvider, envServiceProvider) {

    adoAuthConfigProvider.set({
      cors: <% cors %>, // if rails api is in diferrent domain, defaults to true
      loginSuccessRedirectState: 'dashboard.index',
      accountCreatedRedirect: '/login'
    });

    envServiceProvider.config({
      domains: {
        development: ['<% domain %>', '127.0.0.1'],
        production: ['<% production.domain %>'],
      },
      vars: {
        development: {
          prod: false,
          apiBaseUrl: '<% development.api_base_url %>',
          apiForumUri: '<% development.api_forum_uri %>',
          recaptcha_public_key: '<% development.recaptcha_public_key %>'
        },
        production: {
          prod: true,
          apiBaseUrl: '<% production.api_base_url %>',
          apiForumUri: '<% production.api_forum_uri %>',
          recaptcha_public_key: '<% production.recaptcha_public_key %>'
        },
        defaults: {
          prod: false,
          apiBaseUrl: '<% api_base_url %>',
          apiForumUri: '<% api_forum_uri %>',
          recaptcha_public_key: '<% recaptcha_public_key %>'
        }
      }
    });

    envServiceProvider.check();

  }]);



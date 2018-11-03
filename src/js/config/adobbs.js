angular.module('AdoBBS')
  .config(['adoAuthConfigProvider', 'envServiceProvider', function (adoAuthConfigProvider, envServiceProvider) {

    adoAuthConfigProvider.set({
      cors: true, // if rails api is in diferrent domain, defaults to true
      loginSuccessRedirectState: 'dashboard.index',
    });

    envServiceProvider.config({
      domains: {
        development: ['localhost', '127.0.0.1'],
        production: ['forum.adopisowifi.com'], // set to your domain, can be ignored if you don't use cors
      },
      vars: {
        development: {
          prod: false,
          apiBaseUrl: 'http://localhost:8000', // your local Ado-BBS rails engine url
          recaptcha_public_key: '6LcjW28UAAAAADaLbROztkzHAqPTzmFhtwVwNiVu' // your local recaptcha public key
        },
        production: {
          prod: true,
          apiBaseUrl: 'https://adopisowifi.herokuapp.com', // your production server
          recaptcha_public_key: '6LchBGYUAAAAANWc6a-Xp6hkptv9alGEQNVY1vPQ' // your production recaptcha public key
        },
        defaults: {
          prod: false,
          apiBaseUrl: 'https://localhost:8000',
          recaptcha_public_key: '6LcjW28UAAAAADaLbROztkzHAqPTzmFhtwVwNiVu'
        }
      }
    });

  }]);



window.adopisowifi.provider('$env', [
  function Environment () {
    var loc = window.location;
    var prod = loc.hostname !== 'localhost';
    var server = prod ? 'https://adopisowifi.herokuapp.com' : 'http://localhost:8000';
    var socketServer = prod? 'https://adopisowifi-io.herokuapp.com' : 'http://localhost:8888';
    var recaptcha_public_key = prod? '6LchBGYUAAAAANWc6a-Xp6hkptv9alGEQNVY1vPQ' : '6LcjW28UAAAAADaLbROztkzHAqPTzmFhtwVwNiVu';

    var provide = {
      production: prod,
      server: server,
      socketServer: socketServer,
      recaptcha_public_key: recaptcha_public_key
    };

    provide.$get = function () {
      return provide;
    };

    return provide;

  }
]);

var crypto = require('crypto');

var password = 'monkey1';

crypto.randomBytes(256, function(err, salt) {
  // https://ru.wikipedia.org/wiki/PBKDF2
  crypto.pbkdf2(
    password,
    salt,
    100000,
    512,
    'sha256',
    function (err, hash) {
      console.log(`The result of hashing ${password} is:`);
      console.log(hash.toString('hax'))
    }
  )
});

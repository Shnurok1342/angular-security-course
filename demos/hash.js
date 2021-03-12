var crypto = require('crypto');

var password = 'monkey1';

var aliceSalt = 1;
var bobSalt = 2;

var hash = crypto
  .createHash('sha256')
  .update(password + aliceSalt)
  .digest('hex');

console.log(`The result of hashing ${password} is:`);
console.log(hash);

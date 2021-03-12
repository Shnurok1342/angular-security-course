var crypto = require('crypto');

var password = 'monkey1';

// see: Concept of Salting (https://en.wikipedia.org/wiki/Salt_(cryptography))
var aliceSalt = 1;
var bobSalt = 2;

var hash = crypto
  .createHash('sha256')
  .update(password + aliceSalt)
  .digest('hex');

console.log(`The result of hashing ${password} is:`);
console.log(hash);

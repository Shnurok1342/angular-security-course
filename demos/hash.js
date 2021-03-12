var crypto = require('crypto');

var password = 'monkey1';

var hash = crypto
  .createHash('sha256')
  .update(password)
  .digest('hex');

console.log(`The result of hashing ${password} is:`);
console.log(hash);

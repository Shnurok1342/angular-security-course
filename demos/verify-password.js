var crypto = require('crypto');

// hash for 'monkey1' string
var storedHash = 'c30b1267791ffcf2829bb86532a80cd74e71a7343149cfac5a24a8943c30ba51';

var password = 'monkey1';

var hash = crypto
  .createHash('sha256')
  .update(password)
  .digest('hex');

var isPasswordValid = (hash === storedHash);

console.log('Password is valid:', isPasswordValid);

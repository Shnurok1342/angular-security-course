var jwt = require('jsonwebtoken');

var secretKey = 'secret-key';

var payload = {
  name: 'ALICE'
};

var newToken = jwt.sign(payload, secretKey, { algorithm: 'HS256'});
console.log('JWT created:', newToken);

const util = require('util');
const cryptoP = require('crypto');

export const randomBytes = util.promisify(cryptoP.randomBytes);

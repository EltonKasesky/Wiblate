const crypto = require('crypto');

function generateAuthSecret() {
  return crypto.randomBytes(32).toString('hex');
}

const authSecret = generateAuthSecret();
console.log('Generated AUTH_SECRET:', authSecret);

const passwordHash = require('password-hash');

verifyHash = (password, hashedPassword) => {
    return passwordHash.verify(password, hashedPassword);
}

module.exports = {verifyHash};
const crypto = require("crypto");
function randomGenerator(length=9){
    return crypto.randomBytes(length).toString('hex');
}
module.exports = randomGenerator;
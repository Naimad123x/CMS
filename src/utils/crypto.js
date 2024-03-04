const crypto = require("crypto");

const generateSecurityToken = (payload) => {
  Object.keys(payload).forEach((key) => {
    payload[key] = payload[key].toString();
  });

  return crypto.createHash("md5").update(JSON.stringify(payload) + process.env.SECRET).digest("hex");
}

function encryptPassword(password) {
  const hasher = crypto.createHash('sha256');
  hasher.update(password);
  return hasher.digest('hex');
}

module.exports = {generateSecurityToken, encryptPassword}

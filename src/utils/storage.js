const pool = require("./conn.js");

module.exports = {
  getAdmins: async function() {
    return await new Promise(async function (resolve, reject) {
      pool.query("SELECT * FROM `admins`",
        function (err, rows) {
          if (err)
            return reject(err);
          const admins = [];
          rows.forEach(function (row) {
            admins.push(
              {
                email: row.email,
                username: row.username,
                password: row.password,
                name: row.name,
                verified: row.verified
              }
            )
          })
          return resolve(admins);
        });
    })
  },


  findApiKey: async function(key) {
    return await new Promise(async function (resolve, reject) {
      pool.query("SELECT * FROM `api_keys` WHERE `key` = ?",
        [key],
        function (err, rows) {
          if (err)
            return reject(err);
          return resolve(rows);
        });
    })
  },


  saveApiKey: async function(email, hashedEmail, apiKey, date) {
    logger.newApiKey(email, apiKey, date)
    return await new Promise(async function (resolve, reject) {
      pool.query("INSERT INTO `api_keys` (`email`,`key`,`date`) VALUES (?,?,?)",
        [hashedEmail,apiKey,date],
        function (err, rows) {
          if (err)
            return reject(err);
          return resolve(rows);
        });
    })
  },



}
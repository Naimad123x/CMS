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

  getSettings: async function() {
    return await new Promise(async function (resolve, reject) {
      pool.query("SELECT * FROM `settings`",
        function (err, rows) {
          if (err)
            return reject(err);
          if(rows.length > 0)
            return resolve(JSON.parse(rows[0].data));
          else
            return resolve({});
        });
    })
  },


  saveNewBlocks: async function(blocks) {
    return await new Promise(async function (resolve, reject) {
      pool.query("INSERT INTO `blocks` (`data`,`date`) VALUES (?,?)",
        [blocks, Date.now()],
        function (err, rows) {
          if (err)
            return reject(err);
          return resolve(rows);
        });
    })
  },

  saveSettings: async function(settings) {
    return await new Promise(async function (resolve, reject) {
      pool.query("SELECT * FROM `settings`",
        function(err,rows){
          if(!rows || rows.length < 1){
            pool.query("INSERT INTO `settings` (`data`) VALUES (?)",
              [settings],
              function (err, rows) {
                if (err)
                  return reject(err);
                return resolve(rows);
              });
          }else{
            pool.query("UPDATE `settings` SET `data` = ?",
              [settings],
              function (err, rows) {
                if (err)
                  return reject(err);
                return resolve(rows);
              });
          }
      })
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
const pool = require("./conn.js");
const bcrypt = require('bcrypt');

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
                name: row.name,
                verified: row.verified
              }
            )
          })
          return resolve(admins);
        });
    })
  },

  savePost: async function(post) {
    const { author, text, title, image, link, date } = post;
    return await new Promise(async function (resolve, reject) {
      pool.query('INSERT INTO `posts` (`author`, `text`, `title`, `image`, `link`, `date`) VALUES (?, ?, ?, ?, ?, ?)',
        [author, text, title, image, link, date],
        function (err, rows) {
          if (err)
            return reject(err);
          return resolve(rows);
        });
    })
  },

  getPosts: async function() {
    return await new Promise(async function (resolve, reject) {
      pool.query("SELECT * FROM `posts`",
        function (err, rows) {
          if (err)
            return reject(err);
          const posts = [];
          rows.forEach(function (row) {
            posts.push(
              {
                author: row.author,
                text: row.text,
                title: row.title,
                image: row.image,
                link: row.link,
                date: row.date,
              }
            )
          })
          return resolve(posts);
        });
    })
  },

  removeAdmin: async function(username){
    return await new Promise(async function (resolve, reject) {
      pool.query("DELETE FROM `admins` WHERE `username` = ?",
        [username],
        function (err) {
          if (err)
            return reject(err);

          return resolve(true);
        });
    })
  },

  changeAdminPassword: async function(username, password){
    return await new Promise(async function (resolve, reject) {
      pool.query("UPDATE `admins` SET `password` = ? WHERE `username` = ?",
        [password, username],
        function (err, rows) {
          if (err)
            return reject(err);

          return resolve(rows);
        });
    })
  },

  getPassword: async function(username){
    return await new Promise(async function (resolve, reject) {
      pool.query("SELECT * FROM `admins` WHERE `username` = ?",
        [username],
        function (err, rows) {
          if (err)
            return reject(err);

          if(rows.length < 1)
            return reject({message: "User not found!"});

          return resolve(rows[0].password);
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

  getNewestBuildBlocks: async function() {
    return await new Promise(async function (resolve, reject) {
      pool.query("SELECT * FROM `blocks` ORDER BY `date` DESC LIMIT 1",
        function(err,rows){
          // console.log(JSON.parse(rows[0].data))
          resolve(rows[0]?.data ? JSON.parse(rows[0].data) : [])
        })
    })
  },

  saveNewBlocks: async function(blocks) {
    return await new Promise(async function (resolve, reject) {
    //   pool.query("SELECT * FROM `blocks`",
    //     function(err,rows){
          // if(!rows || rows.length < 1){
            pool.query("INSERT INTO `blocks` (`data`,`date`) VALUES (?,?)",
              [blocks, Date.now()],
              function (err, rows) {
                if (err)
                  return reject(err);
                return resolve(rows);
              });
          // }else{
          //   pool.query("UPDATE `blocks` SET `data` = ?, `date` = ?",
          //     [blocks, Date.now()],
          //     function (err, rows) {
          //       if (err)
          //         return reject(err);
          //       return resolve(rows);
          //     });
          // }
        })
    // })
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

  createUser: async function(user) {
    const { email, username, password, name, verified } = user;
    return await new Promise(async function (resolve, reject) {
      pool.query('INSERT INTO `admins` (`email`, `username`, `password`, `name`, `verified`) VALUES (?, ?, ?, ?, ?)',
        [email, username, password, name, verified],
        function (err, rows) {
          if (err)
            return reject(err);
          return resolve(rows);
        });
    })
  },

  validateLogin: async function(username, password) {
    const [rows, fields] = await pool.execute('SELECT * FROM `admins` WHERE `username` = ?', [username]);

    if (rows.length === 0) {
      return false;
    }

    const user = rows[0];
    return await bcrypt.compare(password, user.password);
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
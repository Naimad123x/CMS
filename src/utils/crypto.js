const bcrypt = require("bcrypt");


module.exports = {

  encryptPassword: function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err)
        return callback(err);

      bcrypt.hash(password, salt, function(err, hash) {
        return callback(err, hash);
      });
    });
  },

  testPassword: async function(password) {
    let hashed;
    await bcrypt.genSalt(10, async function(err, salt) {
      if (err)
        return err;

      await bcrypt.hash(password, salt, function(err, hash) {
        return hashed = hash;
      });
    });
    return hashed;
  },

  comparePassword: function(plainPass, hashWord, callback) {
    bcrypt.compare(plainPass, hashWord, function(err, isPasswordMatch) {
      return err == null ?
        callback(null, isPasswordMatch) :
        callback(err);
    })
    }
}
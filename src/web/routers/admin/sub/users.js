const {engine} = require("../../../../../index");

const users = async function(req, res) {
  // console.log(engine.admins)
  return res.render(
    `sites/admin/users/index`,
    {
      siteName: engine.siteName,
      users: engine.admins
    })
}

module.exports = {users};
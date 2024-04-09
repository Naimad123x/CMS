const {engine} = require("../../../../../index");

const users = async function(req, res) {
  console.log(req.session.user)
  return res.render(
    `sites/admin/users/index`,
    {
      siteName: engine.siteName,
      users: engine.admins,
      reqUser: req.session.user
    })
}

module.exports = {users};
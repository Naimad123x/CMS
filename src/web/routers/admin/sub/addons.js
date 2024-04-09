const {engine} = require("../../../../../index");

const addons = async function(req, res) {
  return res.render(
    `sites/admin/addons/index`,
    {
      siteName: engine.siteName,
      addons: engine.addons,
    })
}

module.exports = {addons};
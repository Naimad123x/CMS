const {engine} = require("../../../../../index");

const builder = async function(req, res) {
  // console.log("admin.js", await engine.getBlocksData())
  return res.render(
    `sites/builder/index`,
    {
      siteName: engine.siteName,
      blocks: await engine.getBlocksData(),
    })
}
module.exports = builder;
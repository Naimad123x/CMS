const {engine} = require("../../../../../index");
const {saveNewBlocks} = require("../../../../utils/storage");

const builder = async function(req, res) {
  // console.log("admin.js", await engine.getBlocksData())
  return res.render(
    `sites/admin/builder/index`,
    {
      siteName: engine.siteName,
      blocks: await engine.getBlocksData(),
    })
}

const builderSave = async function(req, res) {
  try{
    if(!req.body)
      return res.json({error: true, message: "No body!"})
    const {body} = req;
    await saveNewBlocks(JSON.stringify(body)).then(async (result) => {
      // console.log(result)
      await engine.loadBlocksSettings()
      return res.json({message: "New look saved"})
    })
  }catch(e){

    console.log(e)
    res.json({error: true, message: "Report unhandled error!"})
  }
}
module.exports = {builder,builderSave};
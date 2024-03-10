const {engine} = require("../../../../../index");
const {saveSettings} = require("../../../../utils/storage");

const settings = async function(req, res) {
  // console.log("admin.js", await engine.getBlocksData())
  return res.render(
    `sites/admin/settings/index`,
    {
      siteName: engine.siteName,
    })
}

const settingsSave = async function(req, res) {
  try{
    if(!req.body)
      return res.json({error: true, message: "No body!"})
    const {body} = req;
    await saveSettings(JSON.stringify(body)).then((result)=>{
      // console.log(result)
      return res.json({message:"Settings saved"})
    })
    await engine.loadSettings();
  }catch(e){

    console.log(e)
    res.json({error: true, message: "Report unhandled error!"})
  }
}
module.exports = {settings, settingsSave};
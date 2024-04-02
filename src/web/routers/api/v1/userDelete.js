const {removeAdmin} = require("../../../../utils/storage");
const {engine} = require("../../../../../index");

const userDelete = async function(req, res) {
  if(!req?.body)
    return res.json({success: false});
  const data = req.body;
  if(!data?.username)
    return res.json({success: false});
  if(data.username==="admin")
    return res.json({success: false});

  let deleted = await removeAdmin(data.username);
  if(deleted === true)
    await engine.loadAdmins()
    return res.json({success: true});
}

module.exports = {userDelete}
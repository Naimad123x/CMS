const {engine} = require("../../../../../index")

const refreshUsers = async function(req, res) {

  engine.loadAdmins().then(()=>{

    res.json({success: true})
  })
}


module.exports = { refreshUsers };
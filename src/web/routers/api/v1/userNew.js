const {engine} = require("../../../../../index")
const {nanoid} = require("nanoid");
const {encryptPassword} = require("../../../../utils/crypto");
const {createUser} = require("../../../../utils/storage");

const newUsers = async function(req, res) {

  try{
    const data = req.body
    console.log(data)
    const password = nanoid(48);

    await encryptPassword(password, async (err, cb) => {
      if (err) {
        console.log(err)
        return res.json({success: false, message: "encrypting password error"})
      }
      await createUser(
        {
          email: data.email,
          username: data.username,
          password: cb,
          name: data.name,
          verified: false
        })
      engine.loadAdmins().then(()=>{

        return res.json({success: true, message: "done"})
      })
    })
  }catch(e){
    console.log(e)
    return res.json({success: false, message: "internal server error"})
  }
}


module.exports = { newUsers };
const { nanoid } = require("nanoid")
const {engine} = require("../../../../../index")
const {encryptPassword} = require("../../../../utils/crypto");
const {createUser, changeAdminPassword} = require("../../../../utils/storage");
const {sendMail, messageBuilder} = require("../../../../utils/mailer");

const userPasswordChange = async function(req, res) {
  if(!req?.body)
    return res.json({success: false});
  const data = req.body;
  if(req.session.user.user !== "admin" && data.username === "admin")
    return res.json({success: false, message: "You can't modify admin user"})

  if(!data.password)
    return res.json({success: false, message: "No password provided"})

  const password = data.password;

  const adminUser = engine.admins.find(a => a.username === data.username);

  await encryptPassword(password, async (err, cb) => {
    if (err) {
      console.log(err)
      return res.json({success: false, message: "encrypting password error"})
    }
    await changeAdminPassword(adminUser.username, cb)
    engine.loadAdmins().then(()=>{

      sendMail(
        messageBuilder(
          engine.siteName,
          adminUser.email,
          `Password changed, ${adminUser.username}!`,
          `login: ${data.username}\nnew password: ${password}`,
          `<p style="size:20px">login: <span style='color:#5d5dff'>${data.username}</span></p>`+
          `<p style=\"size:20px\">new password: <span style='color:#5d5dff'>${password}</span></p>`
        )
      )

      return res.json({success: true, message: "Password changed successfully"})
    })
  })
}

module.exports = userPasswordChange;
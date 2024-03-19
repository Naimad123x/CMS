const {engine} = require("../../../../../index");
const {sendMail, messageBuilder} = require("../../../../utils/mailer");
const {nanoid} = require("nanoid");
const {encryptPassword} = require("../../../../utils/crypto");
const {createUser} = require("../../../../utils/storage");

const firstLogin = async function(req, res) {
  if(!req?.body)
    return res.json({success: false});
  const data = req.body;
  if(!data?.email)
    return res.json({success: false});
  if(engine.admins.find(a=>a.name==="admin"))
    return res.json({success: false});

  const password = nanoid(48);

  await encryptPassword(password, async (err, cb) => {
    if (err)
      console.log(err)
    await createUser(
      {
        email: data.email,
        username: "admin",
        password: cb,
        name: "admin",
        verified: true
      })
  })

  await engine.loadAdmins().then(()=>{
    sendMail(
      messageBuilder(
        engine.siteName,
        data.email,
        "First login",
        `login: admin\npassword: ${password}`,
        `<p style="size:20px">login: <span style='color:#5d5dff'>admin</span></p><br>`+
        `<p style=\"size:20px\">password: <span style='color:#5d5dff'>${password}</span></p>`
      )
    )

    return res.json({success: true});
  })
}

module.exports = {firstLogin}
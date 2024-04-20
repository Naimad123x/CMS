const {engine} = require("../../../../../index")
const {nanoid} = require("nanoid");
const {encryptPassword} = require("../../../../utils/crypto");
const {createUser} = require("../../../../utils/storage");
const {sendMail, messageBuilder} = require("../../../../utils/mailer");

const newUsers = async function(req, res) {

  try{
    const data = req.body

    data.username = data.username.toLowerCase();
    data.email = data.email.toLowerCase();

    if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data.email))
      return res.json({success: false, message: "wrong email address format!"})

    let existUsername = engine.admins.find(a => a.username === data.username);
    let existEmail = engine.admins.find(a => a.email === data.email);

    if(existUsername)
      return res.json({success: false, message: "this username is already taken!"})
    if(existEmail)
      return res.json({success: false, message: "this email is already taken!"})


    const password = nanoid(16);

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

        sendMail(
          messageBuilder(
            engine.siteName,
            data.email,
            `Welcome, ${data.username}!`,
            `login: ${data.username}\npassword: ${password}`,
            `<p style="size:20px">login: <span style='color:#5d5dff'>${data.username}</span></p>`+
            `<p style=\"size:20px\">password: <span style='color:#5d5dff'>${password}</span></p>`
          )
        )

        return res.json({success: true, message: "User created!"})
      })
    })
  }catch(e){
    console.log(e)
    return res.json({success: false, message: "internal server error"})
  }
}


module.exports = { newUsers };
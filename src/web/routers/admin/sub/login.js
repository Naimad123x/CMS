const {engine} = require("../../../../../index");
const {getPassword} = require("../../../../utils/storage");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");

const loginPage = async function(req, res) {
  await engine.loadAdmins();
  if(engine.admins.length < 1){
    return res.render(
      `sites/admin/auth/firstlogin`,
      {
        siteName: engine.siteName,
      })
  }
  return res.render(
    `sites/admin/auth/login`,
    {
      siteName: engine.siteName,
      error: false
    })
}

const authenticate = async function(req, res){
  try{
    // console.log(0)
    if(!req.body.username || !req.body.password){
      // console.log(1)
      return res.json({ error: 'Wrong credentials'});

    } else {
      // console.log(2)
      req.body.username = req.body.username.toLowerCase();
      const usrDbPass = await getPassword(req.body.username);
      let hashFind = await engine.hashes.find(a => a.client === req.body.client);
      console.log(hashFind)
      // console.log(3)
      bcrypt.compare(req.body.password.replace(/\s/, ""), usrDbPass, (err, cb) => {
        console.log(err, cb)
        if(err || !cb) {
          return res.send({ error: 'Wrong credentials'});
        }
        // console.log("success")
        let token = engine.addToken(req.body.username)
        req.session.user = token;
        res.json({token: token.token, success: true})
      })

      // console.log(4)
    }
  }catch(e){
    console.log(e)
    res.send({ error: 'Wrong credentials'});
  }
}

module.exports = {loginPage, authenticate}
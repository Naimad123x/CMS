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
    })
}

const authenticate = async function(req, res){
  try{
    console.log(0)
    if(!req.body.username || !req.body.password){
      console.log(1)
      return res.render('sites/admin/auth/login',
        {
          siteName: engine.siteName,
        });

    } else {
      // console.log(2)
      const usrDbPass = await getPassword(req.body.username);
      let hashFind = await engine.hashes.find(a => a.client === req.body.client);
      // console.log(hashFind)
      let bytes = CryptoJS.AES.decrypt(req.body.password, hashFind.hash);
      let originalText = bytes.toString();
      // console.log(originalText)
      // console.log(3)
      bcrypt.compare(originalText, usrDbPass, (err, cb) => {
        // console.log(err, cb)
        if(err) {
          return res.render('sites/admin/auth/login',
            {
              siteName: engine.siteName,
            });
        }
        // console.log("success")
        req.session.user = req.body.username
        res.redirect('/admin');
      })

      // console.log(4)
    }
  }catch(e){
    console.log(e)
    return res.render('sites/admin/auth/login',
      {
        siteName: engine.siteName,
      });
  }
}

module.exports = {loginPage, authenticate}
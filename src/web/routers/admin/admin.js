const express = require("express");
const admin = express.Router();
const {engine} = require("../../../../index")
const {builder, builderSave} = require("./sub/builder");
const {settings, settingsSave} = require("./sub/settings");
const {loginPage, authenticate} = require("./sub/login");

admin.get(`/`,checkAuth, (req, res) =>{
  return res.render(`sites/admin/main`, {siteName: engine.siteName})
})

admin.get(`/builder`,
  checkAuth,
  builder)
admin.post(`/builder/save`,
  checkAuth,
  builderSave)

admin.get(`/settings`,
  checkAuth,
  settings)
admin.post(`/settings/save`,
  checkAuth,
  settingsSave)

admin.get('/blocks-data',
  checkAuth,
  (req, res) => {
  res.json({ blocks: engine.blocks });
});

admin.get('/block-data/:blockType',
  checkAuth,
  async (req, res) => {
  const block = await engine.blocks.find(a => a.name === req.params.blockType);

  const newBlock = new block();
  // engine.addBlock(newBlock)
  const serialized = newBlock.serialize();
  return res.json(serialized);
});

admin.get('/login',checkLogged, loginPage);

admin.post('/login', checkLogged, authenticate)


function checkAuth(req,res,next){
  if(req.session.user) next();
  else res.redirect("/admin/login");
}

function checkLogged(req,res,next){
  if(req.session.user){
    res.redirect("/admin")
  }else{
    next();
  }
}

module.exports = admin;